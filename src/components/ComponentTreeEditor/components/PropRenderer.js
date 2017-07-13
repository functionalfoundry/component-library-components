/** @flow */
import React from 'react'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'

import type { CompletionOptionT } from '../../../types/Completion'
import type { Prop } from '../../../modules/ComponentTree'

import Line from './Line'
import PropValueRenderer from './PropValueRenderer'

type Props = {
  completionOptions: Array<CompletionOptionT>,
  propNode: Prop,
  indentLevel: number,
  theme: Object,
}

const PropRenderer = ({ completionOptions, indentLevel, propNode, theme }: Props) => {
  return propNode.get('value') && propNode.get('name')
    ? <Line indentLevel={indentLevel}>
        <span {...theme.propName}>{propNode.get('name')}</span>
        {'='}
        <PropValueRenderer
          completionOptions={completionOptions}
          propValueNode={propNode.get('value')}
        />
      </Line>
    : null
}

const defaultTheme = {
  propName: {
    color: Colors.green300,
  },
}

export default Theme('PropRenderer', defaultTheme)(PropRenderer)
