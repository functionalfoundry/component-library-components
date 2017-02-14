/* @flow */

import React from 'react'
import Theme from 'js-theme'

const Slate = require('slate')

import { ComponentTree } from './ComponentTree'
import ComponentTreeUtils from './ComponentTreeUtils'

/**
 * Plugin options
 */

type PluginOptionsT = {
  tree: ComponentTree,
}

/**
 * Default syntax highlight components
 */

const defaultTheme = {
  component: {
    backgroundColor: '#333'
  },
  componentName: {
    color: 'orange',
  },
  propName: {
    color: 'turquoise',
  },
  propValue: {
    color: 'purple'
  },
  text: {
    color: 'yellow',
  }
}

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

const makeNodeDecorator = (
  type: string,
  mark: string,
  options: PluginOptionsT
) => {
  const nodes = ComponentTreeUtils.getNodesForType(options.tree, type)
  const indexMatchesNode = (index, node) => (
    node.markupLocations.some(location => (
      index >= location.start &&
      index < location.end
    ))
  )
  return (characters, options) => (
    characters.map((char, index) => (
      nodes.reduce((char, node) => {
        if (indexMatchesNode(index, node)) {
          return char.merge({
            marks: char.marks.add(Slate.Mark.create({
              type: mark,
              data: {
                node: node,
              }
            }))
          })
        } else {
          return char
        }
      }, char)
    ))
  )
}

const combineDecorators = (
  decorators: Array<Function>,
  options: PluginOptionsT
) => {
  return (text: Slate.Text, block: Slate.Block) => {
    try {
      return decorators.reduce((characters, decorator) => {
        return decorator(characters, options)
      }, text.characters)
    } catch (error) {
      console.error(error)
      return text.characters
    }
  }
}

/**
 * ComponentTreeSyntaxPlugin implementation
 */

const ComponentTreeSyntaxPlugin = (options: PluginOptionsT) => ({
  schema: {
    nodes: {
      code: {
        decorate: combineDecorators([
          makeNodeDecorator('component', 'component', options),
          makeNodeDecorator('component-name', 'component-name', options),
          makeNodeDecorator('prop-value', 'prop-value', options),
          makeNodeDecorator('prop-name', 'prop-name', options),
          makeNodeDecorator('text', 'text', options),
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
