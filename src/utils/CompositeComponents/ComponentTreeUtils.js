/* @flow */

import {
  List,
  Record,
} from 'immutable'

import {
  Component,
  ComponentName,
  ComponentTree,
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
  context = visitor(context, 'start')
  if (context.stop) {
    return context
  }

  if (context.node.children && !context.node.children.isEmpty()) {
    let subContext = {
      context: context,
      children: List(),
      phase: 'startProps',
    }

    subContext = context.node.children.reduce((context, child) => {
      if (context.context.stop) {
        context.children = context.children.push(child)
        return context
      } else {
        if (context.phase == 'startProps' && child.type == 'prop') {
          context.context = visitor(context.context, 'startProps')
          context.phase = 'props'
        } else if (context.phase == 'props' && child.type == 'component') {
          context.context = visitor(context.context, 'endProps')
          context.context = visitor(context.context, 'startComponents')
          context.phase = 'components'
        } else if (context.phase == 'components' && child.type !== 'component') {
          context.context = visitor(context.context, 'endComponents')
          context.phase = 'endComponents'
        }
        const output = traverseNode(context.context.set('node', child), visitor)
        context.context = output
        context.children = context.children.push(output.node)
        return context
      }
    }, subContext)

    context = context.withMutations(ctx => {
      ctx.setIn(['node', 'children'], subContext.children)
      ctx.set('stop', subContext.stop)
      ctx.set('data', subContext.context.data)
    })
  }

  if (context.stop) {
    return context
  }

  context = visitor(context, 'end')

  return context
}

const traverse: TraverseContext = (tree: ComponentTree, data: any, visitor: Function) => {
  let context = TraverseContext({
    tree: tree,
    data: data,
  })

  if (tree && tree.root) {
    context = traverseNode(context.set('node', tree.root), visitor)
    context.setIn(['tree', 'root'], context.node)
  }

  return context
}

/**
 * Visitor for traversals
 */

const makeVisitor = (handlers: object) => (context: TraverseContext, phase: string) => {
  const handlerNames = {
    'component': 'component',
    'component-name-open': 'componentNameOpen',
    'component-name-close': 'componentNameClose',
    'prop': 'prop',
    'prop-name': 'propName',
    'prop-value': 'propValue',
    'text': 'text',
  }
  const handlerName = handlerNames[context.node.type]
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

const layout: LayoutT = (tree: ComponentTree) => {
  let data = Layout({
    tree: tree,
    markup: '',
  })

  const traversal = traverse(tree, data, makeVisitor({
    component: {
      start: context => context.updateIn(['data', 'markup'], markup => (
        markup + '<'
      )),
      end: context => context.updateIn(['data', 'markup'], markup => (
        markup + '>'
      )),
      endProps: context => context.updateIn(['data', 'markup'], markup => (
        markup + '>'
      ))
    },

    componentNameOpen: {
      start: context => context.updateIn(['data', 'markup'], markup => (
        markup + context.node.element.name
      ))
    },

    prop: {
      start: context => context.updateIn(['data', 'markup'], markup => (
        markup + '\n'
      )),
    },

    propName: {
      start: context => context.updateIn(['data', 'markup'], markup => (
        markup + context.node.element.name
      )),
      end: context => context.updateIn(['data', 'markup'], markup => (
        markup + '='
      ))
    },

    propValue: {
      start: context => context.updateIn(['data', 'markup'], markup => (
        markup + context.node.element.value
      )),
    },

    //componentNameOpen: (context, phase) => (
    //  phase == 'start' && context.updateIn(['data', 'markup'], markup => (
    //    markup + context.node.element.name + '\n'
    //  ))
    //),
  }))

  console.log('TRAVERSAL RESULT', traversal)

  return traversal.data
}

const printTree = (tree: ComponentTree) => {
  const traversal = traverse(tree, null, makeVisitor({
    component: {
      all: (context, phase) =>
        console.warn(phase, 'component', context.node.element.name.name),
    },
    componentNameOpen: {
      all: (context, phase) =>
        console.warn(phase, 'componentNameOpen', context.node.element.name),
    },
    componentNameClose: {
      all: (context, phase) =>
        console.warn(phase, 'componentNameClose', context.node.element.name),
    },
    prop: {
      all: (context, phase) =>
        console.warn(phase, 'prop', context.node.element.name.name),
    },
    propName: {
      all: (context, phase) =>
        console.warn(phase, 'propName', context.node.element.name),
    },
    propValue: {
      all: (context, phase) =>
        console.warn(phase, 'propValue', context.node.element.value),
    },
    text: {
      all: (context, phase) =>
        console.warn(phase, 'text', context.node.element.text)
    },
  }))
}

const ComponentTreeUtils = {
  createTree,
  traverse,
  layout,
  printTree,
}

export default ComponentTreeUtils
