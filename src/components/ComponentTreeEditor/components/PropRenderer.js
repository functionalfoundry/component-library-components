import React from 'react'
import Theme from 'js-theme'

import Line from './Line'
import PropValueRenderer from './PropValueRenderer'

type Props = {
  propNode: Object,
  indentLevel: number,
  theme: Object,
}

const PropRenderer = ({ indentLevel, propNode, theme }: Props) => {
  return propNode.get('value') && propNode.get('name')
    ? <Line
        indentLevel={indentLevel}
        theme={{
          line: { display: 'flex' },
        }}
      >
        <span style={{ whiteSpace: 'pre' }}>{propNode.get('name')}{'='}</span>
        <PropValueRenderer propValueNode={propNode.get('value')} />
      </Line>
    : null
}

const defaultTheme = {}

export default Theme('PropRenderer', defaultTheme)(PropRenderer)
