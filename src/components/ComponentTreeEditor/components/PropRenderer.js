/** @flow */
import React from 'react'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'

import type { CompletionOptionT } from '../../../types/Completion'
import type { ComponentTree, Prop } from '../../../modules/ComponentTree'
import type { InteractionStateT } from '../types'

import Line from './Line'
// import PropValueRenderer from './PropValueRenderer'
import EditableField from './EditableField'

type Props = {
  completionOptions: Array<CompletionOptionT>,
  componentTree: ComponentTree,
  onBlur: Function,
  onChange: Function,
  onChangePropValue: Function,
  onFocus: Function,
  propNode: Prop,
  indentLevel: number,
  interactionState: InteractionStateT,
  theme: Object,
}

const PropRenderer = ({
  completionOptions,
  componentTree,
  indentLevel,
  interactionState,
  onBlur,
  onChange,
  onChangePropValue,
  onFocus,
  propNode,
  theme,
}: Props) => {
  const propValue = propNode.get('value')
  return propValue && propNode.get('name')
    ? <Line indentLevel={indentLevel}>
        <span {...theme.propName}>
          <EditableField
            interactionState={interactionState}
            onBlur={onBlur}
            onFocus={onFocus}
            nodeId={propNode.get('id')}
            value={propNode.get('name')}
          />
        </span>
        {'='}
        <EditableField
          interactionState={interactionState}
          onBlur={onBlur}
          onFocus={onFocus}
          nodeId={propValue.get('id')}
          value={propValue.get('value')}
        />
        {/* <PropValueRenderer
          completionOptions={completionOptions}
          componentTree={componentTree}
          onChange={onChange}
          onChangePropValue={onChangePropValue}
          propValueNode={propNode.get('value')}
          propNode={propNode}
        /> */}
      </Line>
    : null
}

const defaultTheme = {
  propName: {
    color: Colors.green300,
  },
}

export default Theme('PropRenderer', defaultTheme)(PropRenderer)
