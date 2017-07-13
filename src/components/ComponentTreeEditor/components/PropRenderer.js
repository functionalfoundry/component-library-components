/** @flow */
import React from 'react'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'

import type { CompletionOptionT } from '../../../types/Completion'
import type { ComponentTree, Prop } from '../../../modules/ComponentTree'

import Line from './Line'
import PropValueRenderer from './PropValueRenderer'

type Props = {
  completionOptions: Array<CompletionOptionT>,
  componentTree: ComponentTree,
  onChange: Function,
  onChangePropValue: Function,
  propNode: Prop,
  indentLevel: number,
  theme: Object,
}

const PropRenderer = ({
  completionOptions,
  componentTree,
  indentLevel,
  onChange,
  onChangePropValue,
  propNode,
  theme,
}: Props) => {
  return propNode.get('value') && propNode.get('name')
    ? <Line indentLevel={indentLevel}>
        <span {...theme.propName}>{propNode.get('name')}</span>
        {'='}
        <PropValueRenderer
          completionOptions={completionOptions}
          componentTree={componentTree}
          onChange={onChange}
          onChangePropValue={onChangePropValue}
          propValueNode={propNode.get('value')}
          propNode={propNode}
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
