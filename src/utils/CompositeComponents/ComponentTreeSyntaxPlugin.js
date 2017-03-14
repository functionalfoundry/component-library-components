/* @flow */

import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'

const Slate = require('slate')

import { ComponentTree } from './ComponentTree'
import { ComponentTreeLayout } from './ComponentTreeLayout'
import { combineDecorators } from './DecoratorUtils'

/**
 * Plugin options
 */

type PluginOptionsT = {
  tree: ComponentTree,
  layout: ComponentTreeLayout,
}

/**
 * Default syntax highlight components
 */

const defaultTheme = {
  codeContainer: {
  },
  code: {
    ...Fonts.code,
  },
  component: {
  },
  componentName: {
    color: '#00719e',
  },
  propName: {
    color: '#009e71',
  },
  propValue: {
    minWidth: '1em',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: Colors.grey200,
    }
  },
  text: {
  }
}

const Code = ({ attributes, children, theme }) => (
  <div
    {...theme.codeContainer}
    {...attributes}
  >
    <code {...theme.code}>
      {children}
    </code>
  </div>
)

const ThemedCode = Theme('Code', defaultTheme)(Code)

const Component = ({ children, theme }) => (
  <span {...theme.component}>
    {children}
  </span>
)

const ThemedComponent = Theme('Component', defaultTheme)(Component)

const ComponentName = ({ children, theme }) => (
  <span {...theme.componentName}>
    {children}
  </span>
)

const ThemedComponentName = Theme('ComponentName', defaultTheme)(ComponentName)

const PropName = ({ children, theme }) => (
  <span {...theme.propName}>
    {children}
  </span>
)

const ThemedPropName = Theme('PropName', defaultTheme)(PropName)

const PropValue = ({ children, theme }) => (
  <span {...theme.propValue}>
    {children}
  </span>
)

const ThemedPropValue = Theme('PropValue', defaultTheme)(PropValue)

const Text = ({ children, theme }) => (
  <span {...theme.text}>
    {children}
  </span>
)

const ThemedText = Theme('Text', defaultTheme)(Text)

/**
 * Decorators
 */

const makeLayoutTagDecorator =
  (tag: string, mark: string) =>
  (characters, options) => {
    const elements = options.layout.elements.filter(
      element => element.tags.includes(tag)
    )
    return characters.map((char, index) => (
      elements.reduce((char, element) => {
        if (index >= element.start && index < element.end) {
          return char.merge({
            marks: char.marks.add(Slate.Mark.create({
              type: mark,
              data: {
                tree: options.tree,
                layout: options.layout,
                element: element,
              }
            }))
          })
        } else {
          return char
        }
      }, char)
    ))
  }

/**
 * ComponentTreeSyntaxPlugin implementation
 */

const ComponentTreeSyntaxPlugin = (options: PluginOptionsT) => ({
  schema: {
    nodes: {
      code: {
        render: ThemedCode,
        decorate: combineDecorators([
          makeLayoutTagDecorator('component', 'component'),
          makeLayoutTagDecorator('component-name', 'component-name'),
          makeLayoutTagDecorator('component-start', 'component-start'),
          makeLayoutTagDecorator('component-end', 'component-end'),
          makeLayoutTagDecorator('component-open-tag-end',
                                 'component-open-tag-end'),
          makeLayoutTagDecorator('component-close-tag-end',
                                 'component-close-tag-end'),
          makeLayoutTagDecorator('prop-name', 'prop-name'),
          makeLayoutTagDecorator('prop-equals', 'prop-equals'),
          makeLayoutTagDecorator('prop-value', 'prop-value'),
          makeLayoutTagDecorator('text', 'text'),
        ], options),
      }
    },
    marks: {
      'component': ThemedComponent,
      'component-name': ThemedComponentName,
      'prop-name': ThemedPropName,
      'prop-value': ThemedPropValue,
      'text': ThemedText,
    }
  }
})

export default ComponentTreeSyntaxPlugin
