import React from 'react'
import Theme from 'js-theme'

const getIndentSpacing = indentLevel => {
  let spacing = ''
  for (let i = 0; i < indentLevel; i++) {
    /** Add two spaces for each level of indentation (which will also be copied) */
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

const defaultTheme = ({ indentLevel }) => ({
  line: {
    whiteSpace: 'pre',
    /** Makes wrapped lines indented two characters */
    textIndent: `-${(indentLevel + 1) * 2}ch`,
    paddingLeft: `${(indentLevel + 1) * 2}ch`,
  },
})

export default Theme('Line', defaultTheme)(Line)
