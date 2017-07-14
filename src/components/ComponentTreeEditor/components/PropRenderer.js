/** @flow */
import React from 'react'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'

import type { CompletionDataT, CompletionOptionT } from '../../../types/Completion'
import type { Component, ComponentTree, Prop } from '../../../modules/ComponentTree'
import getPropValueTypeBoundaries from '../utils/getPropValueTypeBoundaries'
import stripQuotes from '../utils/stripQuotes'
import getPropValueOptions from '../utils/getPropValueOptions'
import type { InteractionStateT } from '../types'

import Line from './Line'
// import PropValueRenderer from './PropValueRenderer'
import EditableField from './EditableField'

const resolveValueType = valueString => {
  let type = 'expression'
  try {
    type = typeof eval(valueString) // eslint-disable-line
  } catch (e) {}
  return type
}

const displayPropValue = ({ value, isFocused }) => {
  const type = resolveValueType(value)
  if (!isFocused || type === 'string') {
    const { open, close } = getPropValueTypeBoundaries(type)
    return `${open}${stripQuotes(value)}${close}`
  } else {
    return value
  }
}

type Props = {
  completionData: CompletionDataT,
  componentNode: Component,
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
  completionData,
  componentTree,
  componentNode,
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
  const propName = propNode.get('name')
  const componentName = componentNode.get('name')
  return propValue && propName
    ? <Line indentLevel={indentLevel}>
        <span {...theme.propName}>
          <EditableField
            interactionState={interactionState}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            options={Object.keys(completionData.props[componentName])}
            nodeId={propNode.get('id')}
            value={propNode.get('name')}
          />
        </span>
        {'='}
        <EditableField
          formatValue={displayPropValue}
          interactionState={interactionState}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          optionRenderer={(option: CompletionOptionT) => option.value}
          options={getPropValueOptions({
            completionData,
            propNode,
            componentNode,
          })}
          nodeId={propValue.get('id')}
          value={propValue.get('value')}
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
