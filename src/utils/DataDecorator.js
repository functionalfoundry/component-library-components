import React from 'react'
import Theme from 'js-theme'
// import Babel from '@workflo/babel-standalone'
const acorn = require('acorn/dist/acorn_loose')
import SimpleDecorator from '@workflo/components/lib/TextEditor/SimpleDecorator'
import MultiDecorator from '@workflo/components/lib/TextEditor/MultiDecorator'
import Radio from '@workflo/components/lib/Radio'
import RadioGroup from '@workflo/components/lib/Radio/RadioGroup'
import Popover from '@workflo/components/lib/Popover'
import View from '@workflo/components/lib/View'
import { Colors } from '@workflo/styles'

const keywordStrategy = (contentBlock, callback) => {
  const code = contentBlock.getText()

  try {
    const ast = acorn.parse_dammit(code)
    const declarations = ast.body
      .filter(node => node.type === 'VariableDeclaration')
      .map(node => ({
        start: node.start,
        end: node.start + (node.kind ? node.kind.length : 0),
      }))
    declarations.forEach(declaration => {
      callback(declaration.start, declaration.end)
    })
  } catch (err) {
    console.error(err.message)
  }
}

const identifierStrategy = (contentBlock, callback) => {
  const code = contentBlock.getText()
  try {
    const ast = acorn.parse_dammit(code)
    const declarations = ast.body
      .filter(node => node.type === 'VariableDeclaration')
      .map(node => ({
        start: node.declarations[0].id.start,
        end: node.declarations[0].id.end,
      }))
    declarations.forEach(declaration => {
      callback(declaration.start, declaration.end)
    })
  } catch (e) {
    // console.error('Caught exception: ', e)
  }
}

const KeywordSpan = ({ theme, children }) => (
  <span {...theme.keywordSpan}>
    {children}
  </span>
)

const IdentifierSpan = ({ theme, children }) => (
  <span {...theme.identifierSpan}>
    {children}
  </span>
)

const defaultTheme = {
  value: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: Colors.grey200,
    },
  },
  keywordSpan: {
    color: '#00719e',
  },
  identifierSpan: {
    color: '#009e71',
  },
}

const ThemedKeywordSpan = Theme('KeywordSpan', defaultTheme)(KeywordSpan)
const ThemedIdentifierSpan = Theme('IdentifierSpan', defaultTheme)(IdentifierSpan)

const DataDecorator = new MultiDecorator([
  new SimpleDecorator(keywordStrategy, ThemedKeywordSpan),
  new SimpleDecorator(identifierStrategy, ThemedIdentifierSpan),
])

export default DataDecorator
