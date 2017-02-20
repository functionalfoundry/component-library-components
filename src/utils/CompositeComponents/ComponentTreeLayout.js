/** @flow */

import { List, Map, Record, Set } from 'immutable'
import {
  Component,
  ComponentName,
  ComponentTree,
  Prop,
  PropName,
  PropValue,
  Text,
} from './ComponentTree'
import type { ComponentTreeNodeT } from './ComponentTree'

type ComponentTreeLayoutTagsT = Set<?string>
type ComponentTreeLayoutDataT = Map<string, any>

type ComponentTreeLayoutElementT = {
  text: string,
  start: number,
  end: number,
  data: ComponentTreeLayoutDataT,
  tags: ComponentTreeLayoutTagsT,
  node: ?ComponentTreeNodeT,
}

type ComponentTreeLayoutT = {
  elements: List<?ComponentTreeLayoutElementT>,
}

/**
 * ComponentTreeLayout implementation
 */

 const ComponentTreeLayoutElement = Record({
   text: '',
   start: 0,
   end: 0,
   data: Map(),
   tags: Set(),
   node: null,
 })

 export { ComponentTreeLayoutElement }

const ComponentTreeLayout = Record({
  elements: List(),
})

export { ComponentTreeLayout }

/**
 * Layout generation
 */

 type LayoutContextT = {
   layout: ComponentTreeLayout,
   indent: string,
   position: number,
 }

 const LayoutContext = Record({
   layout: null,
   indent: '',
   position: 0,
 })

 type LayoutPartialElementT = {
   text: string,
   node?: ComponentTreeNodeT,
   tags?: ComponentTreeLayoutTagsT,
   data?: ComponentTreeLayoutDataT,
 }

const generateTreeLayout = (tree: ComponentTree) => {
  const getCurrentPosition = (ctx: LayoutContext) => (
    ctx.layout.elements.isEmpty() ? 0 : ctx.layout.elements.last().end
  )

  const addElement = (
    ctx: LayoutContext,
    partialElement: LayoutPartialElementT,
  ) => (
    ctx.updateIn(['layout', 'elements'], elements => (
      elements.push(ComponentTreeLayoutElement({
        text: partialElement.text,
        start: getCurrentPosition(ctx),
        end: getCurrentPosition(ctx) + partialElement.text.length,
        node: partialElement.node,
        tags: partialElement.tags || Set(),
        data: partialElement.data || Map(),
      }))
    ))
  )

  const processComponent = (
    component: Component,
    ctx: LayoutContext,
    tags: ComponentTreeLayoutTagsT
  ) => {
    // Add whitespace element for the indentation before the component
    if (ctx.indent.length > 0) {
      ctx = addElement(ctx, {
        text: ctx.indent,
        node: component,
        tags: Set([
          'whitespace',
          'whitespace-indentation',
          'whitespace-before-component',
        ]).union(tags),
      })
    }

    // Add opening <
    ctx = addElement(ctx, {
      text: '<',
      node: component,
      tags: Set([
        'component',
        'component-start',
        'component-open-tag',
        'component-open-tag-start',
      ]).union(tags),
    })

    // Add component name
    if (component.name) {
      ctx = processComponentName(component.name, ctx, Set([
        'component',
        'component-open-tag',
        'component-open-tag-name',
      ]).union(tags))
    }

    if (!component.props.isEmpty()) {
      // Add newline before props
      ctx = addElement(ctx, {
        text: '\n',
        node: component,
        tags: Set([
          'component',
          'component-open-tag',
          'component-before-props',
          'whitespace',
          'whitespace-before-props',
        ]).union(tags),
      })

      // Add props
      ctx = ctx.update('indent', s => s + '  ')
      ctx = component.props.reduce((ctx, prop) => (
        processProp(prop, ctx, Set([
          'component',
          'component-open-tag',
          'component-props',
        ]).union(tags), Map({
          component: component,
        }))
      ), ctx)
      ctx = ctx.update('indent', s => s.slice(0, -2))
    }

    // Add the > (or />, if there are no children)
    if (!component.text && component.children.isEmpty()) {
      if (component.props.isEmpty()) {
        ctx = addElement(ctx, {
          text: '/>',
          node: component,
          tags: Set([
            'component',
            'component-open-tag',
            'component-open-tag-end',
            'component-end',
          ]).union(tags),
        })
      } else {
        // Add indentation before closing />
        ctx = addElement(ctx, {
          text: ctx.indent,
          node: component,
          tags: Set([
            'component',
            'component-open-tag',
            'whitespace',
            'whitespace-before-open-tag-end',
            'whitespace-before-component-end',
            'whitespace-indentation',
          ]).union(tags),
        })

        // Add closing />
        ctx = addElement(ctx, {
          text: '/>',
          node: component,
          tags: Set([
            'component',
            'component-open-tag',
            'component-open-tag-end',
            'component-end',
          ]).union(tags),
        })
      }
    } else {
      if (component.props.isEmpty()) {
        ctx = addElement(ctx, {
          text: '>',
          node: component,
          tags: Set([
            'component',
            'component-open-tag',
            'component-open-tag-end',
          ]).union(tags),
        })
      } else {
        // Add indentation before closing >
        ctx = addElement(ctx, {
          text: ctx.indent,
          node: component,
          tags: Set([
            'component',
            'component-open-tag',
            'whitespace',
            'whitespace-before-open-tag-end',
            'whitespace-indentation',
          ]).union(tags)
        })

        // Add closing >
        ctx = addElement(ctx, {
          text: '>',
          node: component,
          tags: Set([
            'component',
            'component-open-tag',
            'component-open-tag-end',
          ]).union(tags),
        })
      }
    }

    if (component.text || !component.children.isEmpty()) {
      // Add newline before children
      ctx = addElement(ctx, {
        text: '\n',
        node: component,
        tags: Set([
          'component',
          'component-before-children',
          'whitespace',
          'whitespace-before-children',
        ]).union(tags),
      })

      ctx = ctx.update('indent', s => s + '  ')

      if (!component.children.isEmpty()) {
        // Add children
        ctx = component.children.reduce((ctx, child) => (
          processComponent(child, ctx, Set([
            'component',
            'component-children',
          ]).union(tags))
        ), ctx)
      } else {
        // Add text
        ctx = processText(component.text, ctx, Set([
          'component',
          'component-children',
        ]).union(tags))
      }

      ctx = ctx.update('indent', s => s.slice(0, -2))

      // Add indentation before the closing tag
      if (ctx.indent.length > 0) {
        ctx = addElement(ctx, {
          text: ctx.indent,
          node: component,
          tags: Set([
            'component',
            'whitespace',
            'whitespace-before-close-tag',
            'whitespace-before-component-end',
            'whitespace-indentation',
          ]).union(tags)
        })
      }

      // Add </ of the closing tag
      ctx = addElement(ctx, {
        text: '</',
        node: component,
        tags: Set([
          'component',
          'component-close-tag',
          'component-close-tag-start',
        ]).union(tags)
      })

      // Add component name
      if (component.name) {
        ctx = processComponentName(component.name, ctx, Set([
          'component',
          'component-close-tag',
          'component-close-tag-name',
        ]))
      }

      // Add > of the closing tag
      ctx = addElement(ctx, {
        text: '>',
        node: component,
        tags: Set([
          'component',
          'component-close-tag',
          'component-close-tag-end',
          'component-end',
        ]).union(tags)
      })
    }

    // Add newline after the component
    ctx = addElement(ctx, {
      text: '\n',
      node: component,
      tags: Set([
        'whitespace',
        'whitespace-after-component',
      ]).union(tags)
    })

    return ctx
  }

  const processComponentName = (
    name: ComponentName,
    ctx: LayoutContext,
    tags: ComponentTreeLayoutTagsT
  ) => (
    addElement(ctx, {
      text: name.name,
      node: name,
      tags: Set([
        'component',
        'component-name',
      ]).union(tags),
    })
  )

  const processProp = (
    prop: Prop,
    ctx: LayoutContext,
    tags: ComponentTreeLayoutTagsT,
    data: ComponentTreeLayoutDataT
  ) => {
    // Add whitespace before prop
    if (ctx.indent.length > 0) {
      ctx = addElement(ctx, {
        text: ctx.indent,
        node: prop,
        data: data,
        tags: Set([
          'whitespace',
          'whitespace-indentation',
          'whitespace-before-prop',
        ]).union(tags),
      })
    }

    // Add prop name
    if (prop.name) {
      ctx = processPropName(prop.name, ctx, tags, data.merge({
        prop: prop
      }))
    }

    // Add = between prop name and prop value
    ctx = addElement(ctx, {
      text: '=',
      node: prop,
      tags: Set([
        'prop',
        'prop-equals',
      ]).union(tags),
    })

    // Add prop value
    if (prop.value) {
      ctx = processPropValue(prop.value, ctx, tags, data.merge({
        prop: prop,
      }))
    }

    // Add newline after prop
    ctx = addElement(ctx, {
      text: '\n',
      node: prop,
      tags: Set([
        'whitespace',
        'whitespace-after-prop',
      ]).union(tags),
    })

    return ctx
  }

  const processPropName = (
    propName: PropName,
    ctx: LayoutContext,
    tags: ComponentTreeLayoutTagsT
  ) => (
    addElement(ctx, {
      text: propName.name,
      node: propName,
      tags: Set([
        'prop',
        'prop-name',
      ]).union(tags),
    })
  )

  const processPropValue = (
    propValue: PropValue,
    ctx: LayoutContext,
    tags: ComponentLayoutTagsT
  ) => (
    addElement(ctx, {
      text: propValue.value.toString(),
      node: propValue,
      tags: Set([
        'prop',
        'prop-value',
      ]).union(tags),
    })
  )

  const processText = (
    text: Text,
    ctx: LayoutContext,
    tags: ComponentTreeLayoutTagsT
  ) => {
    // Add indentation before text
    if (ctx.indent.length > 0) {
      ctx = addElement(ctx, {
        text: ctx.indent,
        node: text,
        tags: Set([
          'whitespace',
          'whitespace-before-child',
          'whitespace-before-text',
          'whitespace-indentation',
        ]).union(tags),
      })
    }

    // Add text
    ctx = addElement(ctx, {
      text: text.text,
      node: text,
      tags: Set([
        'child',
        'text',
      ]).union(tags),
    })

    // Add newline after text
    ctx = addElement(ctx, {
      text: '\n',
      node: text,
      tags: Set([
        'whitespace',
        'whitespace-after-child',
        'whitespace-after-text',
      ]).union(tags),
    })

    return ctx
  }

  let ctx = LayoutContext({
    layout: ComponentTreeLayout(),
  })
  if (tree.root) {
    ctx = processComponent(tree.root, ctx, Set())
  }
  return ctx.layout
}

export { generateTreeLayout }

/**
 * Markup generation
 */

const generateTreeLayoutMarkup = (layout: ComponentTreeLayout) => (
  layout.elements.reduce((markup, element) => markup + element.text, '')
)

export { generateTreeLayoutMarkup }
