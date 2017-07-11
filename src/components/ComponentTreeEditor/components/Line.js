import React from 'react'
import Theme from 'js-theme'

const getIndentSpacing = indentLevel => {
  let spacing = ''
  for (let i = 0; i < indentLevel; i++) {
    /** Add two spaces for each level of indentation */
    spacing += '  '
  }
  return spacing
}

type Props = {
  children: any,
  indentLevel: number,
  theme: Object,
}
const Line = ({ children, indentLevel = 0, theme }: Props) => (
  <div {...theme.line}><span>{getIndentSpacing(indentLevel)}</span>{children}</div>
)

const defaultTheme = {
  line: {
    whiteSpace: 'pre',
  },
}

export default Theme('Line', defaultTheme)(Line)
