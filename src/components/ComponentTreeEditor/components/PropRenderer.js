/** @flow */
import React, { PureComponent } from 'react'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'

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
  if (!isFocused || type === 'string') {
    const { open, close } = getPropValueTypeBoundaries(type)
    return `${open}${stripQuotes(value)}${close}`
  } else {
    return value
  }
}

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
                  formatValue={displayPropValue}
                  interactionState={interactionState}
                  onBlur={onBlur}
                  onChangeNode={onChangeValueNode}
                  onFocus={onFocus}
                  onFocusNext={onFocusNext}
                  onFocusPrevious={onFocusPrevious}
                  options={propValueOptions.map(option => option.value)}
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
