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
  Location,
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
      type: 'component-name-open',
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

  if (!component.isSelfClosing
      || component.children && !component.children.isEmpty())
  {
    const name = component.name && Node({
      type: 'component-name-close',
      element: component.name,
      parent: path || null,
    })
    children = children.push(name)
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

const traverseNode: TraverseContext = (context: TraverseContext, visitor: Function) => {
  context = visitor(context, 'before')
  if (context.stop) {
    return context
  }

  context = visitor(context, 'at')
  if (context.stop) {
    return context
  }

  if (context.node.children && !context.node.children.isEmpty()) {
    let acc = {
      context: context,
      children: List(),
    }

    const traverseChild = (acc, child) => {
      if (acc.context.stop) {
        acc.children = acc.children.push(child)
        return acc
      } else {
        let output = traverseNode(acc.context.set('node', child), visitor)
        acc.context = output.set('node', context.get('node'))
        acc.children = acc.children.push(output.node)
        return acc
      }
    }

    const mergeAccumulator = (context, acc) => (
      context.withMutations(context => {
        context.setIn(['node', 'children'], acc.children)
        context.set('stop', acc.context.stop)
        context.set('data', acc.context.data)
      })
    )

    const traverseChildGroup = (acc, groupName, group) => {
      if (!group.isEmpty()) {
        acc.context = visitor(acc.context, `before${groupName}`)
        acc = group.reduce(traverseChild, acc)
        acc.context = visitor(acc.context, `after${groupName}`)
        return acc
      } else {
        return acc
      }
    }

    acc = context.node.children
      .filter(child => child.type == 'component-name-open')
      .reduce(traverseChild, acc)

    acc = traverseChildGroup(acc, 'Props', context.node.children.filter(
      child => child.type == 'prop'
    ))

    acc = context.node.children
      .filter(child => child.type == 'prop-name')
      .reduce(traverseChild, acc)

    acc = context.node.children
      .filter(child => child.type == 'prop-value')
      .reduce(traverseChild, acc)

    acc = traverseChildGroup(acc, 'Components', context.node.children.filter(
      child => child.type == 'component' || child.type == 'text'
    ))

    acc = context.node.children
      .filter(child => child.type == 'component-name-close')
      .reduce(traverseChild, acc)

    context = mergeAccumulator(context, acc)
  }

  if (context.stop) {
    return context
  }

  context = visitor(context, 'after')

  return context
}

const traverse: TraverseContext = (tree: ComponentTree, data: any, visitor: Function) => {
  let context = TraverseContext({
    tree: tree,
    data: data,
  })

  if (tree && tree.root) {
    context = traverseNode(context.set('node', tree.root), visitor)
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
    'component-name-open': 'componentNameOpen',
    'component-name-close': 'componentNameClose',
    'prop': 'prop',
    'prop-name': 'propName',
    'prop-value': 'propValue',
    'text': 'text',
  }
  return handlerNames[type]
}

const makeVisitor = (handlers: object) => (context: TraverseContext, phase: string) => {
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
      before: context => (
        context
          .setIn(['node', 'location'], Location({
            start: context.data.markup.length
          }))
      ),

      after: context => (
        context
          .setIn(['node', 'location', 'end'], context.data.markup.length - 1)
          .updateIn(['data', 'markup'], s => s + '\n')
      ),

      beforeProps: context => (
        context
          .updateIn(['data', 'markup'], s => s + '\n')
          .updateIn(['data', 'indent'], s => s + INDENT)
      ),

      afterProps: context => context.update('data', data => {
        const indent = data.indent.slice(0, -INDENT.length)
        return data
          .update('indent', s => indent)
          .update('markup', s => s + indent + '>\n')
      }),

      beforeComponents: context => context.update('data', data => (
        data.update('indent', s => s + INDENT)
      )),

      afterComponents: context => context.update('data', data => (
        data
          .update('markup', s => s)
          .update('indent', s => s.slice(0, -INDENT.length))
      )),
    },

    componentNameOpen: {
      before: context => (
        context.updateIn(['data', 'markup'], s => s + context.data.indent + '<')
      ),

      at: context => (
        context
          .updateIn(['data', 'markup'], s => s + context.node.element.name)
          .setIn(['node', 'location'], Location({
            start: context.data.markup.length,
            end: context.data.markup.length + context.node.element.name.length - 1,
          }))
      ),
    },

    componentNameClose: {
      before: context => (
        context.updateIn(['data', 'markup'], s =>
          s + context.data.indent + '</'
        )
      ),

      at: context => (
        context
          .updateIn(['data', 'markup'], s => s + context.node.element.name)
          .setIn(['node', 'location'], Location({
            start: context.data.markup.length,
            end: context.data.markup.length + context.node.element.name.length - 1,
          }))
      ),

      after: context => (
        context.updateIn(['data', 'markup'], s => s + '>')
      ),
    },

    prop: {
      before: context => (
        context
          .updateIn(['data', 'markup'], s => s + context.data.indent)
      ),

      at: context => (
        context
          .setIn(['node', 'location'], Location({
            start: context.data.markup.length,
          }))
      ),

      after: context => (
        context
          .setIn(['node', 'location', 'end'], context.data.markup.length - 1)
          .updateIn(['data', 'markup'], s => s + '\n')
      ),
    },

    propName: {
      at: context => (
        context
          .updateIn(['data', 'markup'], s => s + context.node.element.name))
          .setIn(['node', 'location'], Location({
            start: context.data.markup.length,
            end: context.data.markup.length + context.node.element.name.length - 1,
          })
      ),
    },

    propValue: {
      before: context => (
        context.updateIn(['data', 'markup'], s => s + '=')
      ),

      at: context => (
        context
          .updateIn(['data', 'markup'], s =>
            s + context.node.element.value.toString()
          )
          .setIn(['node', 'location'], Location({
            start: context.data.markup.length,
            end: context.data.markup.length +
                 context.node.element.value.toString().length - 1,
          }))
      ),
    },

    text: {
      before: context => (
        context.updateIn(['data', 'markup'], s => s + context.data.indent)
      ),

      at: context => (
        context
          .updateIn(['data', 'markup'], s => s + context.node.element.text)
          .setIn(['node', 'location'], Location({
            start: context.data.markup.length,
            end: context.data.markup.length + context.node.element.text.length,
          }))
      ),

      after: context => (
        context.updateIn(['data', 'markup'], s => s + '\n')
      )
    },
  }))

  return Layout({
    tree: traversal.tree,
    markup: traversal.data.markup,
  })
}

const printTree = (tree: ComponentTree) => {
  const traversal = traverse(tree, null, makeVisitor({
    component: {
      all: (context, phase) =>
        console.log(phase, 'component', context.node.element.name.name),
    },
    componentNameOpen: {
      all: (context, phase) =>
        console.log(phase, 'componentNameOpen', context.node.element.name),
    },
    componentNameClose: {
      all: (context, phase) =>
        console.log(phase, 'componentNameClose', context.node.element.name),
    },
    prop: {
      all: (context, phase) =>
        console.log(phase, 'prop', context.node.element.name.name),
    },
    propName: {
      all: (context, phase) =>
        console.log(phase, 'propName', context.node.element.name),
    },
    propValue: {
      all: (context, phase) =>
        console.log(phase, 'propValue', context.node.element.value),
    },
    text: {
      all: (context, phase) =>
        console.log(phase, 'text', context.node.element.text)
    },
  }))
}

const getNodesForType = (tree: ComponentTree, type: string) => {
  const handlerName = getTraversalHandlerNameForNodeType(type)
  const handlers = {}
  handlers[handlerName] = {
    at: context => {
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
  printTree,
  getNodesForType,
}

export default ComponentTreeUtils
