/** @flow */
import React, { PureComponent } from 'react'
import Theme from 'js-theme'

import { Colors, Fonts } from '@workflo/styles'

import type { CompletionDataT } from '../../../types/Completion'
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
  const { open, close } = getPropValueTypeBoundaries(type)
  if (type === 'string') {
    return `${open}${stripQuotes(eval(value))}${close}` // eslint-disable-line
  } else if (!isFocused && type !== 'string') {
    return `${open}${value}${close}`
  } else {
    return value
  }
}

const renderPropValueOption = ({ option, optionElement }: any) =>
  <div
    style={{
      ...Fonts.code,
      alignItems: 'baseline',
      display: 'flex',
      flexDirection: 'row',
      width: 350,
    }}
  >
    <div style={{ ...Fonts.base, fontSize: 18, width: '40%' }}>
      {optionElement}
    </div>
    <div style={{ color: Colors.grey600, width: '30%' }}>
      {option.type}
    </div>
    <div
      style={{
        ...Fonts.small,
        color: Colors.grey600,
        fontStyle: 'italic',
        width: '30%',
      }}
    >
      {option.source}
    </div>
  </div>

/** Helper for rendering the current value in the OptionChooser  */
const freeformValueMaxLength = 24
const renderPropValueFreeform = value => {
  const maybeShortenedValue =
    value.length > freeformValueMaxLength
      ? '...' + value.slice(value.length - freeformValueMaxLength)
      : value
  return (
    <div
      style={{
        ...Fonts.code,
        alignItems: 'baseline',
        display: 'flex',
        flexDirection: 'row',
        width: 350,
      }}
    >
      <div
        style={{
          ...Fonts.base,
          fontSize: 18,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width: '70%',
        }}
      >
        {maybeShortenedValue}
      </div>
      <div
        style={{
          ...Fonts.small,
          color: Colors.grey600,
          fontStyle: 'italic',
          width: '30%',
        }}
      >
        {'expression'}
      </div>
    </div>
  )
}

const accessPropValueOption = option => option.value

const isPropFocused = ({ propNode, interactionState }) =>
  interactionState.focusedNodePath &&
  interactionState.focusedNodePath.isSuperset(propNode.get('path'))

type Props = {
  completionData: CompletionDataT,
  componentNode: Component,
  componentTree: ComponentTree,
  onBlur: Function,
  onChangeNameNode: Function,
  onChangeValueNode: Function,
  onFocus: Function,
  onFocusNext: Function,
  onFocusPrevious: Function,
  propNode: Prop,
  indentLevel: number,
  interactionState: InteractionStateT,
  theme: Object,
}

const defaultProps = {
  indentLevel: 1,
}

const PropRenderer = ({
  completionData,
  componentTree,
  componentNode,
  indentLevel,
  interactionState,
  onBlur,
  onChangeNameNode,
  onChangeValueNode,
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
  return propValue !== null || propName !== null
    ? <Line {...restProps} indentLevel={indentLevel}>
        <span {...theme.propContainer}>
          <span {...theme.propName}>
            <EditableNodeAttribute
              interactionState={interactionState}
              onBlur={onBlur}
              onChangeNode={onChangeNameNode}
              onFocus={onFocus}
              onFocusNext={onFocusNext}
              onFocusPrevious={onFocusPrevious}
              options={Object.keys(completionData.props[componentName] || {})}
              nodeId={propNode.get('id')}
              path={propPath.push('name')}
              value={propNode.get('name')}
            />
          </span>
          {propValue !== null ? '=' : null}
          {propValue !== null
            ? <span {...theme.propValue}>
                <EditableNodeAttribute
                  accessOption={accessPropValueOption}
                  formatValue={displayPropValue}
                  freeformRenderer={renderPropValueFreeform}
                  interactionState={interactionState}
                  onBlur={onBlur}
                  onChangeNode={onChangeValueNode}
                  onFocus={onFocus}
                  onFocusNext={onFocusNext}
                  onFocusPrevious={onFocusPrevious}
                  optionRenderer={renderPropValueOption}
                  options={propValueOptions}
                  nodeId={propValue.get('id')}
                  path={propPath.push('value').push('value')}
                  value={propValue.get('value')}
                />
              </span>
            : null}
        </span>
        <span>&nbsp;</span>
      </Line>
    : null
}

PropRenderer.defaultProps = defaultProps

const defaultTheme = ({ interactionState, propNode }) => ({
  propContainer:
    !isPropFocused({ interactionState, propNode }) &&
    !propNode.getIn(['value', 'status'], { isValid: true }).isValid
      ? {
          textDecoration: 'line-through',
        }
      : {},
  propName: {
    color: Colors.green300,
  },
  propValue: {
    textDecoration:
      isPropFocused({ interactionState, propNode }) &&
      !propNode.getIn(['value', 'status'], { isValid: true }).isValid
        ? `underline wavy ${Colors.danger}`
        : null,
  },
})

class PurePropRenderer extends PureComponent {
  handleChangeNameNode = ({ path, value }) => {
    const { componentNode, propNode, onChangeNode, onChangePropName } = this.props
    onChangeNode({ path, value })
    onChangePropName(componentNode.get('id'), propNode.get('id'), value)
  }

  handleChangeValueNode = ({ path, value }) => {
    const { propNode, onChangeNode, onChangePropValue } = this.props
    onChangeNode({ path, value })
    onChangePropValue(propNode.get('id'), value)
  }

  render() {
    const {
      onChangeNode, // eslint-disable-line no-unused-vars
      onChangePropName, // eslint-disable-line no-unused-vars
      onChangePropValue, // eslint-disable-line no-unused-vars
      ...props
    } = this.props
    return (
      <PropRenderer
        {...props}
        onChangeNameNode={this.handleChangeNameNode}
        onChangeValueNode={this.handleChangeValueNode}
      />
    )
  }
}

export default Theme('PropRenderer', defaultTheme)(PurePropRenderer)
