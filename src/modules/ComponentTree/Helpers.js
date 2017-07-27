/* @flow */

import { List, Record } from 'immutable'

import type { ComponentTreePathT, NodeIdentifierT, Path } from './types'
import {
  Component,
  ComponentTree,
  type ComponentTreeNodeT,
  Prop,
  PropValue,
} from './ComponentTree'
import { ADD_CHILD, ADD_SIBLING, ADD_PROP } from './constants'

/**
 * Tree traversal
 */

type TraverseResultT = {
  tree: ?ComponentTree,
  data: ?any,
}

const TraverseResult = Record({
  tree: null,
  data: null,
})

const TraverseContext = Record({
  tree: null,
  node: null,
  path: List(),
  data: null,
  visitor: null,
})

/**
 * Given a ComponentTree, some initial data and a visitor function that
 * is called at least once for every node in the tree, traverses the tree
 * and returns a TraverseResult.
 *
 * The visitor signature is
 * ```
 * (ctx: TraverseContext) => TraverseContext
 * ```
 *
 * Any changes made to the `tree`, `data` or `node` held by the
 * TraverseContext are propagated to the root and impact the
 * traverse result. This means any traversal may mutate a tree
 * and its nodes in flexible ways.
 */
const traverse = (tree: ComponentTree, data: any, visitor: Function): TraverseResultT => {
  /**
   * Traverses a child node and merges the result into parent context.
   */
  const traverseChildNode = (
    ctx: TraverseContext,
    relativePath: Array<string>,
    node: ComponentTreeNodeT,
    traverseFunction: Function
  ): TraverseContext => {
    const childCtx = traverseFunction(
      ctx.set('node', node).update('path', path => path.push(...relativePath))
    )
    return ctx
      .set('tree', childCtx.tree)
      .set('data', childCtx.data)
      .setIn(['node', ...relativePath], childCtx.node)
  }

  /**
   * Traverses a component node, its name, its props and its children
   * and merges the result into the parent context.
   */
  const traverseComponent = (ctx: TraverseContext): TraverseContext => {
    ctx = ctx.visitor(ctx, 'pre')

    // Traverse the component props
    if (!ctx.node.props.isEmpty()) {
      ctx = ctx.node.props.reduce(
        (ctx, prop, index) =>
          traverseChildNode(ctx, ['props', index], prop, traverseProp),
        ctx
      )
    }

    // Traverse the component's children
    if (!ctx.node.children.isEmpty()) {
      ctx = ctx.node.children.reduce(
        (ctx, child, index) =>
          traverseChildNode(ctx, ['children', index], child, traverseComponent),
        ctx
      )
    }

    ctx = ctx.visitor(ctx, 'post')
    return ctx
  }

  /**
   * Traverses a prop node and merges the result into the parent context.
   */
  const traverseProp = (ctx: TraverseContext): TraverseContext => {
    ctx = ctx.visitor(ctx, 'pre')
    if (ctx.node.value) {
      ctx = traverseChildNode(ctx, ['value'], ctx.node.value, traversePropValue)
    }
    ctx = ctx.visitor(ctx, 'post')
    return ctx
  }

  /**
   * Traverses a prop value node and merges the result into the
   * parent context.
   */
  const traversePropValue = (ctx: TraverseContext): TraverseContext => ctx.visitor(ctx)

  // Create an initial traverse context
  let ctx = TraverseContext({
    tree: tree,
    node: tree.root,
    path: List(['root']),
    data: data,
    visitor: visitor,
  })

  // Traverse the root component (if there is one) and merge the result
  // into the parent context
  if (tree.root) {
    const rootCtx = traverseComponent(ctx)
    ctx = ctx
      .set('tree', rootCtx.tree)
      .set('data', rootCtx.data)
      .setIn(['tree', 'root'], rootCtx.node)
  }

  // Return the resulting tree and data
  return TraverseResult({
    tree: ctx.tree,
    data: ctx.data,
  })
}

/**
 * Node lookup
 */

/**
 * Finds the closest ancestor of a given node (specified by a path), which passes
 * a provided predicate. If no predicate is provided, will return the closest ancestor.
 */

const findClosestAncestor = (
  tree: ComponentTree,
  path: Path,
  predicate: Function = () => true
): ?Object => {
  const parentPath = path.pop()
  if (parentPath.count() === 0) {
    return null
  }
  const parentNode = tree.getIn(parentPath)
  if (!parentNode) {
    throw new Error(
      'findClosestAncestor(): path not found in tree - ' + JSON.stringify(path)
    )
  }
  /** If node is not found returns null */
  if (predicate(parentNode)) {
    return parentNode
  } else {
    return findClosestAncestor(tree, parentPath, predicate)
  }
}

/**
 * Returns path of node with the given ID
 */
const findNodeById = (tree: ComponentTree, id: NodeIdentifierT): ComponentTreePathT => {
  const result = traverse(tree, null, (ctx: TraverseContext) => {
    if (ctx.node.id == id) {
      return ctx.set('data', ctx.path)
    } else {
      return ctx
    }
  })
  return result.data
}

/**
 * Returns node with the given id
 */
const getNodeById = (tree: ComponentTree, id: NodeIdentifierT): ComponentTreePathT => {
  const path = findNodeById(tree, id)
  return tree.getIn(path)
}

const getParent = (tree: ComponentTree, id: NodeIdentifierT): Object => {
  const path = findNodeById(tree, id)
  return tree.getIn(path.pop(), null)
}

/**
 * Returns the next sibling if it exists, or returns null otherwise.
 */
const getNextSibling = (tree: ComponentTree, id: NodeIdentifierT): Object => {
  const nodePath = findNodeById(tree, id)
  const nodeIndex = nodePath.last()
  const siblingPath = nodePath.pop().push(nodeIndex + 1)
  return tree.getIn(siblingPath, null)
}

/**
 * Node removal
 */

const removeNodeByPath = (tree: ComponentTree, path: Path): ComponentTree =>
  tree.deleteIn(path)

const removeNodeById = (tree: ComponentTree, nodeId: NodeIdentifierT): ComponentTree => {
  const path = findNodeById(tree, nodeId)
  return removeNodeByPath(tree, path)
}

/**
 * Batch node updates
 */
const updateNodesAtPath = (
  tree: ComponentTree,
  path: ComponentTreePathT,
  updater: Function
): ComponentTree => tree.updateIn(path, updater)

/**
 * Node Insertion
 */

const getInsertionPath = (
  tree: ComponentTree,
  path: Path,
  type: ADD_PROP | ADD_CHILD | ADD_SIBLING
) => {
  const componentNode = findClosestAncestor(
    tree,
    path,
    node => node.nodeType === 'component'
  )
  if (!componentNode) {
    throw new Error('getInsertionPath(): Invalid path/tree combination supplied')
  }
  const componentPath = componentNode.path
  /** Inserts props at the end */
  if (type === ADD_PROP) {
    const propCount = componentNode.props.count()
    return componentPath.push('props').push(propCount)
  }
  /** Inserts new components at the end */
  if (type === ADD_CHILD) {
    const childCount = componentNode.children.count()
    return componentPath.push('children').push(childCount)
  }
  if (type === ADD_SIBLING) {
    if (componentPath.pop().pop().count() === 0) {
      throw new Error('getInsertionPath(): Cant insert sibling from root node')
    }
    const componentIndex = componentPath.last()
    return componentPath.pop().push(componentIndex + 1)
  }
  throw new Error('getInsertionPath(): Invalid type supplied')
}

/**
 * Inserts node at a given path, either overriding the value already there, or shifting it
 * in the case where the parent is a List.
 */
const insertNodeAtPath = (tree, path, node) => {
  const parentTargetPath = path.pop()
  const parentTargetNode = tree.getIn(parentTargetPath)
  if (List.isList(parentTargetNode)) {
    return tree.setIn(parentTargetPath, parentTargetNode.insert(path.last(), node))
  }
  return tree.setIn(path, node)
}

/**
 * Component insertion
 */

const insertComponent = (
  tree: ComponentTree,
  parentId: NodeIdentifierT,
  index: number,
  component: Component
): ComponentTree => {
  const parentPath = findNodeById(tree, parentId)
  if (parentPath) {
    return updateNodesAtPath(tree, parentPath.push('children'), children =>
      children.insert(index, component)
    )
  } else {
    throw new Error(
      'Failed to insert component into component tree: ' +
        'Parent component with ID "' +
        parentId +
        '" not found'
    )
  }
}

/**
 * Component removal
 */

const removeComponent = (
  tree: ComponentTree,
  componentId: NodeIdentifierT
): ComponentTree => {
  const path = findNodeById(tree, componentId)
  return path ? tree.deleteIn(path) : tree
}

/**
 * Component name modification
 */

const setComponentName = (
  tree: ComponentTree,
  componentId: NodeIdentifierT,
  name: ?string
): ComponentTree => {
  const componentPath = findNodeById(tree, componentId)
  if (componentPath) {
    return tree.setIn(componentPath.push('name'), name)
  } else {
    throw new Error(
      'Failed to set component name in component tree: ' +
        'Component with ID "' +
        componentId +
        '" not found'
    )
  }
}

/**
 * Component text modification
 */

const setComponentText = (
  tree: ComponentTree,
  componentId: NodeIdentifierT,
  text: ?string
): ComponentTree => {
  const componentPath = findNodeById(tree, componentId)
  if (componentPath) {
    return tree.setIn(componentPath.push('text'), text)
  } else {
    throw new Error(
      'Failed to set component text in component tree: ' +
        'Component with ID "' +
        componentId +
        '" not found'
    )
  }
}

/**
 * Prop insertion
 */

const insertProp = (
  tree: ComponentTree,
  componentId: NodeIdentifierT,
  prop: Prop
): ComponentTree => {
  const componentPath = findNodeById(tree, componentId)
  if (componentPath) {
    return updateNodesAtPath(tree, componentPath.push('props'), props =>
      props.push(prop).sortBy(prop => prop.name && prop.name.name)
    )
  } else {
    throw new Error(
      'Failed to insert a prop into the component tree: ' +
        'Component with ID "' +
        componentId +
        '" not found'
    )
  }
}

const removeProp = (tree: ComponentTree, propId: NodeIdentifierT): ComponentTree => {
  const propPath = findNodeById(tree, propId)
  return propPath ? tree.deleteIn(propPath) : tree
}

/** Helping for setting an arbitrary attribute on any node in the ComponentTree */
type SetNodeAttributeT = ({
  nodeId: NodeIdentifierT,
  /** A string representing the attribute key, or an array of strings for nested maps */
  path: Array<string> | string,
  tree: ComponentTree,
  value: any,
}) => ComponentTree
const setNodeAttribute: SetNodeAttributeT = ({ nodeId, path, tree, value }) => {
  const basePath = findNodeById(tree, nodeId)
  const attributePath = Array.isArray(path) ? path : [path]
  if (basePath) {
    return tree.setIn(basePath.concat(attributePath), value)
  } else {
    throw new Error(
      'Failed to set a node attribute in the component tree: ' +
        'Node with ID "' +
        nodeId +
        '" not found'
    )
  }
}

const setPropName = (
  tree: ComponentTree,
  propId: NodeIdentifierT,
  name: string
): ComponentTree => {
  const propPath = findNodeById(tree, propId)
  if (propPath) {
    return tree.setIn(propPath.push('name'), name)
  } else {
    throw new Error(
      'Failed to set a prop name in the component tree: ' +
        'Prop with ID "' +
        propId +
        '" not found'
    )
  }
}

const setPropValue = (
  tree: ComponentTree,
  propId: NodeIdentifierT,
  value: PropValue
): ComponentTree => {
  const propPath = findNodeById(tree, propId)
  if (propPath) {
    return tree.setIn(propPath.push('value'), value)
  } else {
    throw new Error(
      'Failed to set a prop value in the component tree: ' +
        'Prop with ID "' +
        propId +
        '" not found'
    )
  }
}

const createTree = (data: Object): ComponentTree => {
  const createComponent = (data: Object, path: List<string>): Component =>
    Component({
      id: data.id,
      name: data.name,
      path,
      props: List(
        (data.props || [])
          .map((prop, index) => createProp(prop, path.push('props').push(index)))
      ),
      children: List(
        (data.children || [])
          .map((component, index) =>
            createComponent(component, path.push('children').push(index))
          )
      ),
      text: data.text,
    })

  const createProp = (data: Object, path: List<string>): Prop =>
    Prop({
      id: data.id,
      name: data.name,
      path,
      value: data.value ? createPropValue(data.value, path.push('value')) : null,
    })

  const createPropValue = (data: Object, path: List<string>): PropValue =>
    PropValue({
      id: data.id,
      path,
      value: data.value,
      type: data.type,
    })

  return ComponentTree({
    root: createComponent(data, List(['root'])),
  })
}

const getRawTreeData = (tree: ComponentTree) => tree.toJS()

export default {
  // Generic tree operations
  traverse,
  findClosestAncestor,
  findNodeById,
  getNodeById,
  getParent,
  getNextSibling,
  removeNodeById,
  removeNodeByPath,
  updateNodesAtPath,
  // Higher-level, semantic tree operations
  getInsertionPath,
  insertNodeAtPath,
  insertComponent,
  removeComponent,
  setComponentName,
  setComponentText,
  insertProp,
  removeProp,
  setNodeAttribute,
  setPropName,
  setPropValue,
  // Tree construction from raw data
  createTree,
  getRawTreeData,
  // data types
  TraverseContext,
}
