/** @flow */
import React, { PureComponent } from 'react'
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
import EditableNodeAttribute from './EditableNodeAttribute'

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
  onChangeNode: Function,
  onFocus: Function,
  onFocusNext: Function,
  onFocusPrevious: Function,
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
  onChangeNode,
  onFocus,
  onFocusNext,
  onFocusPrevious,
  propNode,
  theme,
  ...restProps
}: Props) => {
  const propValue = propNode.get('value')
  const propName = propNode.get('name')
  const propPath = propNode.get('path')
  const componentName = componentNode.get('name')
  const propValueOptions = getPropValueOptions({
    completionData,
    propNode,
    componentNode,
  })
  return propValue || propName
    ? <Line {...restProps} indentLevel={indentLevel}>
        <span {...theme.propName}>
          <EditableNodeAttribute
            interactionState={interactionState}
            onBlur={onBlur}
            onChangeNode={onChangeNode}
            onFocus={onFocus}
            onFocusNext={onFocusNext}
            onFocusPrevious={onFocusPrevious}
            options={Object.keys(completionData.props[componentName] || {})}
            nodeId={propNode.get('id')}
            path={propPath.push('name')}
            value={propNode.get('name')}
          />
        </span>
        {'='}
        <EditableNodeAttribute
          formatValue={displayPropValue}
          interactionState={interactionState}
          onBlur={onBlur}
          onChangeNode={onChangeNode}
          onFocus={onFocus}
          onFocusNext={onFocusNext}
          onFocusPrevious={onFocusPrevious}
          options={propValueOptions.map(option => option.value)}
          nodeId={propValue.get('id')}
          path={propPath.push('value').push('value')}
          value={propValue.get('value')}
        />
        <span>&nbsp;</span>
      </Line>
    : null
}

const defaultTheme = {
  propName: {
    color: Colors.green300,
  },
}

class PurePropRenderer extends PureComponent {
  render() {
    return <PropRenderer {...this.props} />
  }
}

export default Theme('PropRenderer', defaultTheme)(PurePropRenderer)
