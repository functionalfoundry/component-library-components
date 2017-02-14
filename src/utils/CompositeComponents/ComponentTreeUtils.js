/* @flow */

import {
  List,
  Record,
  Set,
} from 'immutable'

import {
  Component,
  ComponentName,
  ComponentTree,
  MarkupLocation,
  Node,
  NodePath,
  NodePathSegment,
  Prop,
  PropName,
  PropValue,
} from './ComponentTree'

/**
 * Tree creation
 */

const ensurePath: NodePath = (path: ?NodePath) => (
  path || NodePath()
)

const createPropNode = (prop: Prop, path?: NodePath) => {
  const children = List().withMutations(list => {
    if (prop.name) {
      list.push(Node({
        type: 'prop-name',
        element: prop.name,
        parent: path || null,
      }))
    }

    if (prop.value) {
      list.push(Node({
        type: 'prop-value',
        element: prop.value,
        parent: path || null,
      }))
    }
  })

  return Node({
    type: 'prop',
    parent: path && path.butLast() || null,
    element: prop,
    children: children,
  })
}

const createComponentNode = (component: Component, path?: NodePath) => {
  let children = List()

  if (component.name) {
    const name = component.name && Node({
      type: 'component-name',
      element: component.name,
      parent: path || null,
    })
    children = children.push(name)
  }

  if (component.props) {
    children = children.concat(component.props.map((prop, index) => {
      const propPath = ensurePath(path).push(NodePathSegment({
        type: 'prop',
        index: index,
      }))
      return createPropNode(prop, propPath)
    }))
  }

  if (component.children) {
    children = children.concat(component.children.map((child, index) => {
      const childPath = ensurePath(path).push(NodePathSegment({
        type: 'component',
        index: index,
      }))
      return createComponentNode(child, childPath)
    }))
  }

  if (component.text) {
    const text = Node({
      type: 'text',
      element: component.text,
      parent: path || null,
    })
    children = children.push(text)
  }

  return Node({
    type: 'component',
    parent: path && path.butLast() || null,
    element: component,
    children: children,
  })
}

const createTree: ComponentTree = (root: Component) => (
  ComponentTree({
    cursor: null,
    root: createComponentNode(root),
  })
)

/**
 * Traversing
 */

type TraverseContextT = {
  tree: ?ComponentTree,
  node: ?Node,
  data: ?any,
  stop: ?boolean,
}

const TraverseContext = Record({
  tree: null,
  node: null,
  data: null,
  stop: false,
})

type TraverseAccumulatorT = {
  context: TraverseContext,
  children: List<?NodeT>,
}

const TraverseAccumulator = Record({
  context: null,
  children: List(),
})

const traverseChild: TraverseContext = (
  acc: TraverseAccumulatorT,
  child: NodeT,
  traverseFunction: Function,
  visitor: Function,
  phase: ?string
) => {
  const parent = acc.context.node
  acc = acc.setIn(['context', 'node'], child)
  acc = acc.update('context', context => {
    if (traverseFunction) {
      return traverseFunction(context, visitor)
    } else {
      return visitor(context, phase || 'visit')
    }
  })
  acc = acc.update('children', children => (
    children.push(acc.context.node)
  ))
  acc = acc.setIn(['context', 'node'], parent)
  return acc
}

const traverseChildren: TraverseContext = (
  acc: TraverseAccumulatorT,
  children: List<?NodeT>,
  traverseFunction: Function,
  visitor: Function,
  phase: ?string
) => {
  return children.reduce((acc, child) => (
    traverseChild(acc, child, traverseFunction, visitor, phase)
  ), acc)
}

const mergeTraverseAccumulator = (context, acc) => (
  context.withMutations(context => {
    context.setIn(['node', 'children'], acc.children)
    context.set('stop', acc.context.stop)
    context.set('data', acc.context.data)
  })
)

const traversePropNode: TraverseContext = (
  context: TraverseContext,
  visitor: Function
) => {
  context = visitor(context, 'start')
  context = visitor(context, 'visit')

  let acc = TraverseAccumulator({
    context: context,
    children: List(),
  })

  // Visit the prop name
  const name = context.node.children.find(child => child.type == 'prop-name')
  acc = traverseChild(acc, name, visitor, 'visit')

  // Visit the prop value
  const value = context.node.children.find(child => child.type == 'prop-value')
  acc = traverseChild(acc, value, visitor, 'visit')

  context = mergeTraverseAccumulator(context, acc)

  context = visitor(context, 'end')
  return context
}

const traverseSubcomponentNode: TraverseContext = (
   context: TraverseContext,
   visitor: Function,
   phase: ?string
) => {
  if (context.node.type == 'text') {
    return visitor(context, phase || 'visit')
  } else {
    return traverseComponentNode(context, visitor)
  }
}

const traverseComponentNode: TraverseContext = (
  context: TraverseContext,
  visitor: Function
) => {
  context = visitor(context, 'start')
  context = visitor(context, 'visit')

  let acc = TraverseAccumulator({
    context: context,
    children: List(),
  })

  // Visit the component name
  const name = context.node.children.find(child => child.type == 'component-name')
  acc = traverseChild(acc, name, visitor, 'open')
  acc = traverseChild(acc, acc.children.last(), visitor, 'visit')
  acc = acc.update('children', children => {
    const name = acc.children.last()
    return children.pop().set(0, name)
  })

  // Visit the props
  const props = context.node.children.filter(child => child.type == 'prop')
  if (!props.isEmpty()) {
    acc = acc.update('context', context => visitor(context, 'startProps'))
    acc = traverseChildren(acc, props, traversePropNode, visitor)
    acc = acc.update('context', context => visitor(context, 'endProps'))
  }

  // Visit the subcomponents
  const subcomponents = context.node.children.filter(
    child => child.type == 'component' || child.type == 'text'
  )
  if (!subcomponents.isEmpty()) {
    acc = acc.update('context', context => visitor(context, 'startChildren'))
    acc = traverseChildren(acc, subcomponents, traverseSubcomponentNode, visitor)
    acc = acc.update('context', context => visitor(context, 'endChildren'))
  }

  // Visit the component name again (if we have subcomponents)
  if (!subcomponents.isEmpty()) {
    acc = traverseChild(acc, acc.children.first(), visitor, 'close')
    acc = traverseChild(acc, acc.children.last(), visitor, 'visit')
    acc = acc.update('children', children => {
      const name = children.last()
      return children.pop().set(0, name)
    })
  }

  context = mergeTraverseAccumulator(context, acc)
  context = visitor(context, 'end')

  return context
}

const traverse: TraverseContext = (
  tree: ComponentTree,
  data: any,
  visitor: Function
) => {
  let context = TraverseContext({
    tree: tree,
    data: data,
  })

  if (tree && tree.root) {
    context = traverseComponentNode(context.set('node', tree.root), visitor)
    context = context.setIn(['tree', 'root'], context.node)
  }

  return context
}

/**
 * Visitor for traversals
 */

const getTraversalHandlerNameForNodeType = (type: string) => {
  const handlerNames = {
    'component': 'component',
    'component-name': 'componentName',
    'prop': 'prop',
    'prop-name': 'propName',
    'prop-value': 'propValue',
    'text': 'text',
  }
  return handlerNames[type]
}

const makeVisitor = (handlers: object) => (
  context: TraverseContext,
  phase: string
) => {
  const handlerName = getTraversalHandlerNameForNodeType(context.node.type)
  const handler = handlers[handlerName]

  if (handler && handler[phase]) {
    return handler[phase](context, phase) || context
  } else if (handler && handler['all']) {
    return handler['all'](context, phase) || context
  } else {
    return context
  }
}

/**
 * Layouting / markup generation
 */

type LayoutT = {
  tree: ComponentTree,
  markup: string,
}

const Layout = Record({
  tree: null,
  markup: null,
})

type LayoutContextT = {
  tree: ComponentTree,
  markup: string,
  indent: string,
}

const LayoutContext = Record({
  tree: null,
  markup: null,
  indent: '',
})

const layout: LayoutT = (tree: ComponentTree) => {
  let data = LayoutContext({
    tree: tree,
    markup: '',
    indent: '',
  })

  const INDENT = '  '

  const traversal = traverse(tree, data, makeVisitor({
    component: {
      start: context => (
        context
          .updateIn(['data', 'markup'], s => s + context.data.indent)
          .updateIn(['node', 'markupLocations'], locations => (
            locations.push(MarkupLocation({
              start: context.data.markup.length + context.data.indent.length,
              end: -1,
            }))
          ))
      ),

      end: context => (
        context
          .updateIn(['data', 'markup'], s => s + '\n')
          .setIn(
            ['node', 'markupLocations', -1, 'end'],
            context.data.markup.length
          )
      ),

      startProps: context => (
        context
          .updateIn(['data', 'markup'], s => s + '\n')
          .updateIn(['data', 'indent'], s => s + INDENT)
      ),

      endProps: context => {
        const newIndent = context.data.indent.slice(0, -INDENT.length)
        return context
          .updateIn(['data', 'indent'], s => newIndent)
          .updateIn(['data', 'markup'], s => s + newIndent + '>')
      },

      startChildren: context => (
        context
          .updateIn(['data', 'markup'], s => s + '\n')
          .updateIn(['data', 'indent'], s => s + INDENT)
      ),

      endChildren: context => (
        context
          .updateIn(['data', 'indent'], s => s.slice(0, -INDENT.length))
      ),
    },

    componentName: {
      open: context => (
        context
          .updateIn(['data', 'markup'], s => s + '<')
          .updateIn(['data', 'markup'], s => s + context.node.element.name)
          .updateIn(['node', 'markupLocations'], locations => (
            locations.push(MarkupLocation({
              start: context.data.markup.length + '<'.length,
              end: context.data.markup.length
                   + '<'.length
                   + context.node.element.name.length,
            }))
          ))
      ),

      close: context => (
        context
          .updateIn(['data', 'markup'], s => s + context.data.indent + '</')
          .updateIn(['data', 'markup'], s => s + context.node.element.name)
          .updateIn(['data', 'markup'], s => s + '>')
          .updateIn(['node', 'markupLocations'], locations => (
            locations.push(MarkupLocation({
              start: context.data.markup.length
                     + context.data.indent.length
                     + '</'.length,
              end: context.data.markup.length
                   + context.data.indent.length
                   + '</'.length
                   + context.node.element.name.length,
            }))
          ))
      ),
    },

    prop: {
      start: context => (
        context
          .updateIn(['data', 'markup'], s => s + context.data.indent)
      ),

      visit: context => (
        context
          .updateIn(['node', 'markupLocations'], locations => (
            locations.push(MarkupLocation({
              start: context.data.markup.length,
            }))
          ))
      ),

      end: context => (
        context
          .setIn(
            ['node', 'markupLocations', -1, 'end'],
            context.data.markup.length,
          )
      )
    },

    propName: {
      visit: context => (
        context
          .updateIn(['data', 'markup'], s => s + context.node.element.name)
          .updateIn(['node', 'markupLocations'], locations => (
            locations.push(MarkupLocation({
              start: context.data.markup.length,
              end: context.data.markup.length + context.node.element.name.length,
            }))
          ))
      )
    },

    propValue: {
      visit: context => (
        context
          .updateIn(['data', 'markup'], s => (
            s + '=' + context.node.element.value.toString() + '\n'
          ))
          .updateIn(['node', 'markupLocations'], locations => (
            locations.push(MarkupLocation({
              start: context.data.markup.length + '='.length,
              end: context.data.markup.length
                   + '='.length
                   + context.node.element.value.toString().length,
            }))
          ))
      )
    },

    text: {
      visit: context => (
        context
          .updateIn(['data', 'markup'], s => (
            s + context.data.indent + context.node.element.text + '\n'
          ))
          .updateIn(['node', 'markupLocations'], locations => (
            locations.push(MarkupLocation({
              start: context.data.markup.length + context.data.indent.length,
              end: context.data.markup.length
                   + context.data.indent.length
                   + context.node.element.text.length,
            }))
          ))
      )
    }
  }))

  return Layout({
    tree: traversal.tree,
    markup: traversal.data.markup,
  })
}

const getNodesForType = (tree: ComponentTree, type: string) => {
  const handlerName = getTraversalHandlerNameForNodeType(type)
  const handlers = {}
  handlers[handlerName] = {
    visit: context => {
      return context.update('data', nodes => (
        nodes.add(context.node)
      ))
    }
  }
  return traverse(tree, Set(), makeVisitor(handlers)).data
}

const ComponentTreeUtils = {
  createTree,
  traverse,
  layout,
  getNodesForType,
}

export default ComponentTreeUtils
