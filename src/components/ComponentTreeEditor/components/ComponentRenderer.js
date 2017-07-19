/** @flow */
import React, { PureComponent } from 'react'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'

import type { Component, ComponentTree } from '../../../modules/ComponentTree'
import type { CompletionDataT } from '../../../types/Completion'
import type { InteractionStateT } from '../types'

import PropRenderer from './PropRenderer'
import Line from './Line'
import EditableNodeAttribute from './EditableNodeAttribute'

type Props = {
  completionData: CompletionDataT,
  componentNode: Component,
  componentTree: ComponentTree,
  indentLevel: number,
  interactionState: InteractionStateT,
  onBlur: Function,
  onChangeNode: Function,
  onChangePropValue: Function,
  onFocus: Function,
  onFocusNext: Function,
  theme: Object,
}

const getStartTagClosingCharacters = childComponents => `${childComponents.count() > 0 ? '' : '/'}>`

const ComponentRenderer = ({
  completionData,
  componentNode,
  componentTree,
  indentLevel = 0,
  interactionState,
  onBlur,
  onChangeNode,
  onChangePropValue,
  onFocus,
  onFocusNext,
  theme,
}: Props) => {
  const componentName = componentNode.get('name')
  const componentProps = componentNode.get('props')
  const childComponents = componentNode.get('children')
  return (
    <div>
      <Line indentLevel={indentLevel}>
        {'<'}
        <span {...theme.componentName}>
          <EditableNodeAttribute
            onChangeNode={onChangeNode}
            onFocus={onFocus}
            onFocusNext={onFocusNext}
            onBlur={onBlur}
            options={completionData.components}
            nodeId={componentNode.get('id')}
            interactionState={interactionState}
            path="name"
            value={componentName}
          />
        </span>
        {componentProps.count() === 0
          ? getStartTagClosingCharacters(childComponents)
          : ''}
        <span>&nbsp;</span>
      </Line>
      {componentProps
        .map((propNode, index) => (
          <PropRenderer
            completionData={completionData}
            componentTree={componentTree}
            componentNode={componentNode}
            key={index}
            indentLevel={indentLevel + 1}
            interactionState={interactionState}
            onBlur={onBlur}
            onChangeNode={onChangeNode}
            onChangePropValue={onChangePropValue}
            onFocus={onFocus}
            onFocusNext={onFocusNext}
            propNode={propNode}
          />
        ))
        .toArray()}
      {componentProps.count() > 0 &&
        <Line indentLevel={indentLevel}>
          {getStartTagClosingCharacters(childComponents)}
        </Line>}
      {childComponents
        .map((childComponent, index) => (
          <ThemedComponentRenderer
            key={index}
            completionData={completionData}
            componentNode={childComponent}
            componentTree={componentTree}
            indentLevel={indentLevel + 1}
            interactionState={interactionState}
            onChangeNode={onChangeNode}
            onChangePropValue={onChangePropValue}
            onFocus={onFocus}
            onFocusNext={onFocusNext}
          />
        ))
        .toArray()}
      {childComponents.count() > 0 &&
        <Line>{'<'}<span {...theme.componentName}>{componentName}</span>{'/>'}</Line>}
    </div>
  )
}

const defaultTheme = {
  componentName: {
    color: Colors.primary400,
  },
}

class PureComponentRenderer extends PureComponent {
  render() {
    return <ComponentRenderer {...this.props} />
  }
}

const ThemedComponentRenderer = Theme('ComponentRenderer', defaultTheme)(
  PureComponentRenderer
)

export default ThemedComponentRenderer
