/** @flow */
import React from 'react'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'

import type { Component, ComponentTree } from '../../../modules/ComponentTree'
import type { CompletionDataT } from '../../../types/Completion'
import getCompletionOptions from '../utils/getCompletionOptions'
import type { InteractionStateT } from '../types'

import PropRenderer from './PropRenderer'
import Line from './Line'
import EditableField from './EditableField'

type Props = {
  completionData: CompletionDataT,
  componentNode: Component,
  componentTree: ComponentTree,
  indentLevel: number,
  interactionState: InteractionStateT,
  onBlur: Function,
  onChange: Function,
  onChangePropValue: Function,
  onFocus: Function,
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
  onChange,
  onChangePropValue,
  onFocus,
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
          <EditableField
            onFocus={onFocus}
            onBlur={onBlur}
            nodeId={componentNode.get('id')}
            interactionState={interactionState}
            value={componentName}
          />
        </span>
        {componentProps.count() === 0
          ? getStartTagClosingCharacters(childComponents)
          : ''}
      </Line>
      {componentProps
        .map((propNode, index) => (
          <PropRenderer
            completionOptions={getCompletionOptions({
              completionData,
              propNode,
              componentNode,
            })}
            componentTree={componentTree}
            key={index}
            indentLevel={indentLevel + 1}
            interactionState={interactionState}
            onBlur={onBlur}
            onChange={onChange}
            onChangePropValue={onChangePropValue}
            onFocus={onFocus}
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
            componentNode={childComponent}
            componentTree={componentTree}
            indentLevel={indentLevel + 1}
            interactionState={interactionState}
            onChange={onChange}
            onChangePropValue={onChangePropValue}
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

const ThemedComponentRenderer = Theme('ComponentRenderer', defaultTheme)(
  ComponentRenderer
)

export default ThemedComponentRenderer
