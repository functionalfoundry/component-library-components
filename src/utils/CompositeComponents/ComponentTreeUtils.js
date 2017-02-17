/* @flow */

import { List, Record } from 'immutable'

import type {
  ComponentTreePathT,
  NodeIdentifierT,
} from './ComponentTree'
import {
  Component,
  ComponentName,
  ComponentTree,
  Prop,
  PropName,
  PropValue,
  Text,
} from './ComponentTree'

/**
 * Tree traversal
 */

type TraverseResultT = {
  tree: ?ComponentTree,
  data: ?any,
}

const TraverseResult: TraverseResultT = Record({
  tree: null,
  data: null,
})

type TraverseContextT = {
  tree: ?ComponentTree,
  node: ?ComponentTreeNodeT,
  path: ComponentTreePathT,
  data: ?any,
  visitor: ?Function,
}

const TraverseContext: TraverseContextT = Record({
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
const traverse: TraverseResult = (
  tree: ComponentTree,
  data: any,
  visitor: Function
) => {
  /**
   * Traverses a child node and merges the result into parent context.
   */
  const traverseChildNode: TraverseContext = (
    ctx: TraverseContext,
    relativePath: ComponentTreePathT,
    node: ComponentTreeNodeT,
    traverseFunction: Function,
  ) => {
    const childCtx = traverseFunction(
      ctx
        .set('node', node)
        .update('path', path => path.push(...relativePath))
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
  const traverseComponent: TraverseContext = (ctx: TraverseContext) => {
    ctx = ctx.visitor(ctx, 'pre')

    // Traverse the component name
    if (ctx.node.name) {
      ctx = traverseChildNode(
        ctx, ['name'], ctx.node.name, traverseComponentName
      )
    }

    // Traverse the component props
    if (!ctx.node.props.isEmpty()) {
      ctx = ctx.node.props.reduce((ctx, prop, index) => (
        traverseChildNode(ctx, ['props', index], prop, traverseProp)
      ), ctx)
    }

    // Traverse the component's children
    if (!ctx.node.children.isEmpty()) {
      ctx = ctx.node.children.reduce((ctx, child, index) => (
        traverseChildNode(ctx, ['children', index], child, traverseComponent)
      ), ctx)
    }

    // Traverse the component's text
    if (ctx.node.text) {
      ctx = traverseChildNode(ctx, ['text'], ctx.node.text, traverseText)
    }

    ctx = ctx.visitor(ctx, 'post')
    return ctx
  }

  /**
   * Traverses a component name node and merges the result into
   * the parent context.
   */
  const traverseComponentName: TraverseContext = (ctx: TraverseContext) => (
    ctx.visitor(ctx)
  )

  /**
   * Traverses a prop node and merges the result into the parent context.
   */
  const traverseProp: TraverseContext = (ctx: TraverseContext) => {
    ctx = ctx.visitor(ctx, 'pre')
    if (ctx.node.name) {
      ctx = traverseChildNode(ctx, ['name'], ctx.node.name, traversePropName)
    }
    if (ctx.node.value) {
      ctx = traverseChildNode(ctx, ['value'], ctx.node.value, traversePropValue)
    }
    ctx = ctx.visitor(ctx, 'post')
    return ctx
  }

  /**
   * Traverses a prop name node and merges the result into the
   * parent context.
   */
  const traversePropName: TraverseContext = (ctx: TraverseContext) => (
    ctx.visitor(ctx)
  )

  /**
   * Traverses a prop value node and merges the result into the
   * parent context.
   */
  const traversePropValue = (ctx: TraverseContext) => (
    ctx.visitor(ctx)
  )

  /**
   * Traverses a text node and merges the result into the parent context.
   */
  const traverseText = (ctx: TraverseContext) => (
    ctx.visitor(ctx)
  )

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

const findNodeById: ComponentTreePathT = (
  tree: ComponentTree,
  id: NodeIdentifierT
) => {
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
 * Node removal
 */

const removeNodeById: ComponentTree = (
  tree: ComponentTree,
  nodeId: NodeIdentifierT
) => {
  const path = findNodeById(tree, nodeId)
  if (path) {
    return tree.deleteIn(path)
  } else {
    return tree
  }
}

/**
 * Batch node updates
 */
const updateNodesAtPath: ComponentTree = (
  tree: ComponentTree,
  path: ComponentTreePathT,
  updater: Function
) => (
  tree.updateIn(path, updater)
)

/**
 * Component insertion
 */

const insertComponent: ComponentTree = (
  tree: ComponentTree,
  parentId: NodeIdentifierT,
  index: number,
  component: Component
) => {
  const parentPath = findNodeById(tree, parentId)
  if (parentPath) {
    return updateNodesAtPath(tree, parentPath.push('children'), children =>
      children.insert(index, component)
    )
  } else {
    throw new Error(
      'Failed to insert component into component tree: ' +
      'Parent component with ID "' + parentId + '" not found'
    )
  }
}

/**
 * Component removal
 */

const removeComponent: ComponentTree = (
  tree: ComponentTree,
  componentId: NodeIdentifierT
) => {
  const path = findNodeById(tree, componentId)
  return path ? tree.deleteIn(path) : tree
}

/**
 * Component name modification
 */

const setComponentName: ComponentTree = (
  tree: ComponentTree,
  componentId: NodeIdentifierT,
  name: ComponentName
) => {
  const componentPath = findNodeById(tree, componentId)
  if (componentPath) {
    return tree.setIn(componentPath.push('name'), name)
  } else {
    throw new Error(
      'Failed to set component name in component tree: ' +
      'Component with ID "' + componentId + '" not found'
    )
  }
}

/**
 * Component text modification
 */

const setComponentText: ComponentTree = (
  tree: ComponentTree,
  componentId: NodeIdentifierT,
  text: Text
) => {
  const componentPath = findNodeById(tree, componentId)
  if (componentPath) {
    return tree.setIn(componentPath.push('text'), text)
  } else {
    throw new Error(
      'Failed to set component text in component tree: ' +
      'Component with ID "' + componentId + '" not found'
    )
  }
}

/**
 * Prop insertion
 */

const insertProp: ComponentTree = (
  tree: ComponentTree,
  componentId: NodeIdentifierT,
  prop: Prop
) => {
  const componentPath = findNodeById(tree, componentId)
  if (componentPath) {
    return updateNodesAtPath(
      tree, componentPath.push('props'),
      props => props.push(prop).sortBy(prop => prop.name && prop.name.name)
    )
  } else {
    throw new Error(
      'Failed to insert a prop into the component tree: ' +
      'Component with ID "' + componentId + '" not found'
    )
  }
}

const removeProp: ComponentTree = (
  tree: ComponentTree,
  propId: NodeIdentifierT
) => {
  const propPath = findNodeById(tree, propId)
  return propPath ? tree.deleteIn(propPath) : tree
}

const setPropName: ComponentTree = (
  tree: ComponentTree,
  propId: NodeIdentifierT,
  name: PropName
) => {
  const propPath = findNodeById(tree, propId)
  if (propPath) {
    return tree.setIn(propPath.push('name'), name)
  } else {
    throw new Error(
      'Failed to set a prop name in the component tree: ' +
      'Prop with ID "' + propId + '" not found'
    )
  }
}

const setPropValue: ComponentTree = (
  tree: ComponentTree,
  propId: NodeIdentifierT,
  value: PropValue
) => {
  const propPath = findNodeById(tree, propId)
  if (propPath) {
    return tree.setIn(propPath.push('value'), value)
  } else {
    throw new Error(
      'Failed to set a prop value in the component tree: ' +
      'Prop with ID "' + propId + '" not found'
    )
  }
}

export {
  // Generic tree operations
  traverse,
  findNodeById,
  removeNodeById,
  updateNodesAtPath,

  // Higher-level, semantic tree operations
  insertComponent,
  removeComponent,
  setComponentName,
  setComponentText,
  insertProp,
  removeProp,
  setPropName,
  setPropValue,
}
