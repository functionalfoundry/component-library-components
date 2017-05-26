/* @flow */
import React from 'react'
import Slate from 'slate'
import Theme from 'js-theme'
import { Colors } from '@workflo/styles'

const acorn = require('acorn/dist/acorn_loose')

/**
 * Themeing
 */

const defaultTheme = {
  identifier: {
    color: '#009e71',
  },
  keyword: {
    color: '#00719e',
  },
}

type DecoratorPropsT = {
  theme: Object,
  children: React.Children,
  mark: Slate.Mark,
}

/**
 * Mark implementations
 */

const Identifier = ({ children, theme }) => (
  <span {...theme.identifier}>
    {children}
  </span>
)

const ThemedIdentifier = Theme('Identifier', defaultTheme)(Identifier)

const Keyword = ({ children, theme }) => (
  <span {...theme.keyword}>
    {children}
  </span>
)

const ThemedKeyword = Theme('Keyword', defaultTheme)(Keyword)

const Newline = ({ children }) => {
  return (
    <span>
      {children.split('').filter(c => c === '\n').map(() => <br />)}
    </span>
  )
}

/**
 * Decorators
 */

const decorateIdentifiers = (characters, ast, options) => {
  const declarations = ast.body
    .filter(node => node.type === 'VariableDeclaration')
    .map(node => ({
      start: node.declarations[0].id.start,
      end: node.declarations[0].id.end,
    }))

  return characters.map((char, index) =>
    declarations.reduce((char, declaration) => {
      if (index < declaration.start || index >= declaration.end) {
        return char
      } else {
        const mark = Slate.Mark.create({
          type: 'identifier',
        })
        return char.merge({
          marks: char.marks.add(mark),
        })
      }
    }, char)
  )
}

const decorateKeywords = (characters, ast, options) => {
  const declarations = ast.body
    .filter(node => node.type === 'VariableDeclaration')
    .map(node => ({
      start: node.start,
      end: node.start + (node.kind ? node.kind.length : 0),
    }))

  return characters.map((char, index) =>
    declarations.reduce((char, declaration) => {
      if (index < declaration.start || index >= declaration.end) {
        return char
      } else {
        const mark = Slate.Mark.create({
          type: 'keyword',
        })
        return char.merge({
          marks: char.marks.add(mark),
        })
      }
    }, char)
  )
}

const decorateNewlines = (characters, ast, options) => {
  return characters.map((char, index) => {
    if (char.text !== '\n') {
      return char
    } else {
      const mark = Slate.Mark.create({
        type: 'newline',
      })
      return char.merge({
        marks: char.marks.add(mark),
      })
    }
  })
}

const combineDecorators = (decorators: Array<Function>, options) => {
  return (text: Slate.Text, block: Slate.Block) => {
    try {
      const ast = acorn.parse_dammit(text.text)
      return decorators.reduce((characters, decorator) => {
        return decorator(characters, ast, options)
      }, text.characters)
    } catch (error) {
      return text.characters
    }
  }
}

/**
 * CodeEditorPlugin
 */

type PluginOptions = {
  shouldAnimate: boolean,
}

const JSEditorPlugin = (options: PluginOptions) => {
  return {
    schema: {
      nodes: {
        code: {
          decorate: combineDecorators(
            [
              decorateIdentifiers,
              decorateKeywords,
              ...(options.shouldAnimate ? [decorateNewlines] : []),
            ],
            options
          ),
        },
      },
      marks: {
        identifier: ThemedIdentifier,
        keyword: ThemedKeyword,
        newline: Newline,
      },
    },
  }
}

export default JSEditorPlugin
