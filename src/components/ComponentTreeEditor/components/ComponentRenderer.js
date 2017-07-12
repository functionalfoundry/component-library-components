import React from 'react'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'

import getCompletionOptions from '../utils/getCompletionOptions'

import PropRenderer from './PropRenderer'
import Line from './Line'

type Props = {
  completionData: Object,
  componentNode: Object,
  indentLevel: number,
  theme: Object,
}

const getStartTagClosingCharacters = childComponents => `${childComponents.count() > 0 ? '' : '/'}>`

const ComponentRenderer = ({
  completionData,
  componentNode,
  indentLevel = 0,
  theme,
}: Props) => {
  const componentName = componentNode.get('name')
  const componentProps = componentNode.get('props')
  const childComponents = componentNode.get('children')
  return (
    <div>
      <Line indentLevel={indentLevel}>
        {'<'}
        <span {...theme.componentName}>{componentName}</span>
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
            key={index}
            indentLevel={indentLevel + 1}
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
            indentLevel={indentLevel + 1}
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
