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

type ComponentTreeLayoutElementT = {
  text: string,
  start: number,
  end: number,
  data: Map<string, any>,
  tags: Set<?string>,
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

const generateTreeLayout = (tree: ComponentTree) => {
  const getCurrentPosition = (ctx: LayoutContext) => (
    ctx.layout.elements.isEmpty() ? 0 : ctx.layout.elements.last().end
  )

  const processComponent = (
    component: Component,
    ctx: LayoutContext,
    tags: Set<?string>
  ) => {
    // Add whitespace element for the indentation before the component
    if (ctx.indent.length > 0) {
      ctx = ctx.updateIn(['layout', 'elements'], elements => (
        elements.push(ComponentTreeLayoutElement({
          text: ctx.indent,
          start: getCurrentPosition(ctx),
          end: getCurrentPosition(ctx) + ctx.indent.length,
          node: component,
          tags: Set([
            'whitespace',
            'whitespace-indentation',
            'whitespace-before-component',
          ]).union(tags),
        }))
      ))
    }

    // Add opening <
    ctx = ctx.updateIn(['layout', 'elements'], elements => (
      elements.push(ComponentTreeLayoutElement({
        text: '<',
        start: getCurrentPosition(ctx),
        end: getCurrentPosition(ctx) + '<'.length,
        node: component,
        tags: Set([
          'component',
          'component-start',
          'component-open-tag',
          'component-open-tag-start',
        ]).union(tags),
      }))
    ))

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
      ctx = ctx.updateIn(['layout', 'elements'], elements => (
        elements.push(ComponentTreeLayoutElement({
          text: '\n',
          start: getCurrentPosition(ctx),
          end: getCurrentPosition(ctx) + '\n'.length,
          node: component,
          tags: Set([
            'component',
            'component-open-tag',
            'component-before-props',
            'whitespace',
            'whitespace-before-props',
          ]).union(tags),
        }))
      ))

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

    console.log('component.text', component.text)
    console.log('  component.children', component.children)

    // Add the > (or />, if there are no children)
    if (!component.text && component.children.isEmpty()) {
      if (component.props.isEmpty()) {
        ctx = ctx.updateIn(['layout', 'elements'], elements => (
          elements.push(ComponentTreeLayoutElement({
            text: '/>',
            start: getCurrentPosition(ctx),
            end: getCurrentPosition(ctx) + '/>'.length,
            node: component,
            tags: Set([
              'component',
              'component-open-tag',
              'component-open-tag-end',
              'component-end',
            ]).union(tags),
          }))
        ))
      } else {
        // Add indentation before closing />
        ctx = ctx.updateIn(['layout', 'elements'], elements => (
          elements.push(ComponentTreeLayoutElement({
            text: ctx.indent,
            start: getCurrentPosition(ctx),
            end: getCurrentPosition(ctx) + ctx.indent.length,
            node: component,
            tags: Set([
              'component',
              'component-open-tag',
              'whitespace',
              'whitespace-before-open-tag-end',
              'whitespace-before-component-end',
              'whitespace-indentation',
            ]).union(tags),
          }))
        ))

        // Add closing />
        ctx = ctx.updateIn(['layout', 'elements'], elements => (
          elements.push(ComponentTreeLayoutElement({
            text: '/>',
            start: getCurrentPosition(ctx),
            end: getCurrentPosition(ctx) + '/>'.length,
            node: component,
            tags: Set([
              'component',
              'component-open-tag',
              'component-open-tag-end',
              'component-end',
            ]).union(tags),
          }))
        ))
      }
    } else {
      if (component.props.isEmpty()) {
        ctx = ctx.updateIn(['layout', 'elements'], elements => (
          elements.push(ComponentTreeLayoutElement({
            text: '>',
            start: getCurrentPosition(ctx),
            end: getCurrentPosition(ctx) + '>'.length,
            node: component,
            tags: Set([
              'component',
              'component-open-tag',
              'component-open-tag-end',
            ]).union(tags),
          }))
        ))
      } else {
        // Add indentation before closing >
        ctx = ctx.updateIn(['layout', 'elements'], elements => (
          elements.push(ComponentTreeLayoutElement({
            text: ctx.indent,
            start: getCurrentPosition(ctx),
            end: getCurrentPosition(ctx) + ctx.indent.length,
            node: component,
            tags: Set([
              'component',
              'component-open-tag',
              'whitespace',
              'whitespace-before-open-tag-end',
              'whitespace-indentation',
            ]).union(tags)
          }))
        ))

        // Add closing >
        ctx = ctx.updateIn(['layout', 'elements'], elements => (
          elements.push(ComponentTreeLayoutElement({
            text: '>',
            start: getCurrentPosition(ctx),
            end: getCurrentPosition(ctx) + '>'.length,
            node: component,
            tags: Set([
              'component',
              'component-open-tag',
              'component-open-tag-end',
            ]).union(tags),
          }))
        ))
      }
    }

    if (component.text || !component.children.isEmpty()) {
      // Add newline before children
      ctx = ctx.updateIn(['layout', 'elements'], elements => (
        elements.push(ComponentTreeLayoutElement({
          text: '\n',
          start: getCurrentPosition(ctx),
          end: getCurrentPosition(ctx) + '\n'.length,
          node: component,
          tags: Set([
            'component',
            'component-before-children',
            'whitespace',
            'whitespace-before-children',
          ]).union(tags),
        }))
      ))

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
        ctx = ctx.updateIn(['layout', 'elements'], elements => (
          elements.push(ComponentTreeLayoutElement({
            text: ctx.indent,
            start: getCurrentPosition(ctx),
            end: getCurrentPosition(ctx) + ctx.indent.length,
            node: component,
            tags: Set([
              'component',
              'whitespace',
              'whitespace-before-close-tag',
              'whitespace-before-component-end',
              'whitespace-indentation',
            ]).union(tags)
          }))
        ))
      }

      // Add </ of the closing tag
      ctx = ctx.updateIn(['layout', 'elements'], elements => (
        elements.push(ComponentTreeLayoutElement({
          text: '</',
          start: getCurrentPosition(ctx),
          end: getCurrentPosition(ctx) + '</'.length,
          node: component,
          tags: Set([
            'component',
            'component-close-tag',
            'component-close-tag-start',
          ]).union(tags)
        }))
      ))

      // Add component name
      if (component.name) {
        ctx = processComponentName(component.name, ctx, Set([
          'component',
          'component-close-tag',
          'component-close-tag-name',
        ]))
      }

      // Add > of the closing tag
      ctx = ctx.updateIn(['layout', 'elements'], elements => (
        elements.push(ComponentTreeLayoutElement({
          text: '>',
          start: getCurrentPosition(ctx),
          end: getCurrentPosition(ctx) + '>'.length,
          node: component,
          tags: Set([
            'component',
            'component-close-tag',
            'component-close-tag-end',
            'component-end',
          ]).union(tags)
        }))
      ))
    }

    // Add newline after the component
    ctx = ctx.updateIn(['layout', 'elements'], elements => (
      elements.push(ComponentTreeLayoutElement({
        text: '\n',
        start: getCurrentPosition(ctx),
        end: getCurrentPosition(ctx) + '\n'.length,
        node: component,
        tags: Set([
          'whitepsace',
          'whitespace-after-component',
        ]).union(tags)
      }))
    ))

    return ctx
  }

  const processComponentName = (
    name: ComponentName,
    ctx: LayoutContext,
    tags: Set<?string>
  ) => {
    ctx = ctx.updateIn(['layout', 'elements'], elements => (
      elements.push(ComponentTreeLayoutElement({
        text: name.name,
        start: getCurrentPosition(ctx),
        end: getCurrentPosition(ctx) + name.name.length,
        node: name,
        tags: Set([
          'component',
          'component-name',
        ]).union(tags),
      }))
    ))
    return ctx
  }

  const processProp = (
    prop: Prop,
    ctx: LayoutContext,
    tags: Set<?string>,
    data: Map<string, any>
  ) => {
    // Add whitespace before prop
    if (ctx.indent.length > 0) {
      ctx = ctx.updateIn(['layout', 'elements'], elements => (
        elements.push(ComponentTreeLayoutElement({
          text: ctx.indent,
          start: getCurrentPosition(ctx),
          end: getCurrentPosition(ctx) + ctx.indent.length,
          node: prop,
          data: data,
          tags: Set([
            'whitespace',
            'whitespace-indentation',
            'whitespace-before-prop',
          ]).union(tags),
        }))
      ))
    }

    // Add prop name
    if (prop.name) {
      ctx = processPropName(prop.name, ctx, tags, data.merge({
        prop: prop
      }))
    }

    // Add = between prop name and prop value
    ctx = ctx.updateIn(['layout', 'elements'], elements => (
      elements.push(ComponentTreeLayoutElement({
        text: '=',
        start: getCurrentPosition(ctx),
        end: getCurrentPosition(ctx) + '='.length,
        node: prop,
        tags: Set([
          'prop',
          'prop-equals',
        ]).union(tags),
      }))
    ))

    // Add prop value
    if (prop.value) {
      ctx = processPropValue(prop.value, ctx, tags, data.merge({
        prop: prop,
      }))
    }

    // Add newline after prop
    ctx = ctx.updateIn(['layout', 'elements'], elements => (
      elements.push(ComponentTreeLayoutElement({
        text: '\n',
        start: getCurrentPosition(ctx),
        end: getCurrentPosition(ctx) + '\n'.length,
        node: prop,
        tags: Set([
          'whitespace',
          'whitespace-after-prop',
        ]).union(tags),
      }))
    ))

    return ctx
  }

  const processPropName = (
    propName: PropName,
    ctx: LayoutContext,
    tags: Set<?string>
  ) => (
    ctx.updateIn(['layout', 'elements'], elements => (
      elements.push(ComponentTreeLayoutElement({
        text: propName.name,
        start: getCurrentPosition(ctx),
        end: getCurrentPosition(ctx) + propName.name.length,
        node: propName,
        tags: Set([
          'prop',
          'prop-name',
        ]).union(tags),
      }))
    ))
  )

  const processPropValue = (
    propValue: PropValue,
    ctx: LayoutContext,
    tags: Set<?string>
  ) => (
    ctx.updateIn(['layout', 'elements'], elements => (
      elements.push(ComponentTreeLayoutElement({
        text: propValue.value.toString(),
        start: getCurrentPosition(ctx),
        end: getCurrentPosition(ctx) + propValue.value.toString().length,
        node: propValue,
        tags: Set([
          'prop',
          'prop-value',
        ]).union(tags),
      }))
    ))
  )

  const processText = (
    text: Text,
    ctx: LayoutContext,
    tags: Set<?string>
  ) => {
    // Add indentation before text
    if (ctx.indent.length > 0) {
      ctx = ctx.updateIn(['layout', 'elements'], elements => (
        elements.push(ComponentTreeLayoutElement({
          text: ctx.indent,
          start: getCurrentPosition(ctx),
          end: getCurrentPosition(ctx) + ctx.indent.length,
          node: text,
          tags: Set([
            'whitespace',
            'whitespace-before-child',
            'whitespace-before-text',
            'whitespace-indentation',
          ]).union(tags),
        }))
      ))
    }

    // Add text
    ctx = ctx.updateIn(['layout', 'elements'], elements => (
      elements.push(ComponentTreeLayoutElement({
        text: text.text,
        start: getCurrentPosition(ctx),
        end: getCurrentPosition(ctx) + text.text.length,
        node: text,
        tags: Set([
          'child',
          'text',
        ]).union(tags),
      }))
    ))

    // Add newline after text
    ctx = ctx.updateIn(['layout', 'elements'], elements => (
      elements.push(ComponentTreeLayoutElement({
        text: '\n',
        start: getCurrentPosition(ctx),
        end: getCurrentPosition(ctx) + '\n'.length,
        node: text,
        tags: Set([
          'whitespace',
          'whitespace-after-child',
          'whitespace-after-text',
        ]).union(tags),
      }))
    ))

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
