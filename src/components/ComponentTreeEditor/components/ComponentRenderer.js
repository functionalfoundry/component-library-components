/** @flow */
import React, { PureComponent } from 'react'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'

import type { Component, ComponentTree } from '../../../modules/ComponentTree'
import type { CompletionDataT } from '../../../types/Completion'
import type { InteractionStateT } from '../types'

import AddNodeButton from './AddNodeButton'
import PropRenderer from './PropRenderer'
import Line from './Line'
import EditableNodeAttribute from './EditableNodeAttribute'

type Props = {
  completionData: CompletionDataT,
  componentNode: Component,
  componentTree: ComponentTree,
  indentLevel: number,
  interactionState: InteractionStateT,
  isHovered: boolean,
  isRootComponent: boolean,
  onBlur: Function,
  onChangeNode: Function,
  onChangeComponentName: Function,
  onChangePropName: Function,
  onChangePropValue: Function,
  onSelectComponent: Function,
  onFocus: Function,
  onFocusNext: Function,
  onFocusPrevious: Function,
  onInsertNode: Function,
  onMouseEnter: Function,
  onMouseLeave: Function,
  theme: Object,
}

const getStartTagClosingCharacters = childComponents => `${childComponents.count() > 0 ? '' : '/'}>`

const renderStartTagEnding = ({
  componentNode,
  interactionState,
  isHovered,
  isRootComponent,
  onInsertNode,
  onFocusNext,
  onFocusPrevious,
  path,
}: any) => {
  const childComponents = componentNode.get('children')
  return (
    <span>
      {getStartTagClosingCharacters(childComponents)}
      <AddNodeButton
        interactionState={interactionState}
        isRootComponent={isRootComponent}
        isVisible={isHovered}
        nodeId={componentNode.get('id')}
        onFocusNext={onFocusNext}
        onFocusPrevious={onFocusPrevious}
        onInsertNode={onInsertNode}
        path={path.push('add-button')}
      />
    </span>
  )
}

const ComponentRenderer = ({
  completionData,
  componentNode,
  componentTree,
  indentLevel = 0,
  interactionState,
  isHovered,
  isRootComponent,
  onBlur,
  onChangeComponentName,
  onChangePropName,
  onChangePropValue,
  onChangeNode,
  onSelectComponent,
  onFocus,
  onFocusNext,
  onFocusPrevious,
  onInsertNode,
  onMouseEnter,
  onMouseLeave,
  theme,
}: Props) => {
  const componentName = componentNode.get('name')
  const componentPath = componentNode.get('path')
  const componentProps = componentNode.get('props')
  const childComponents = componentNode.get('children')
  return (
    <div>
      <Line
        indentLevel={indentLevel}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {'<'}
        <span {...theme.componentName}>
          <EditableNodeAttribute
            onChangeNode={({ path, value }) => {
              onChangeNode({ path, value })
              onChangeComponentName(componentNode.get('id'), value)
            }}
            onFocus={path => {
              onFocus(path)
              onSelectComponent(componentNode.get('id'))
            }}
            onFocusNext={onFocusNext}
            onFocusPrevious={onFocusPrevious}
            onBlur={onBlur}
            options={completionData.components}
            nodeId={componentNode.get('id')}
            interactionState={interactionState}
            path={componentPath.push('name')}
            value={componentName}
          />
        </span>
        {componentProps.count() === 0 &&
          renderStartTagEnding({
            componentNode,
            interactionState,
            isHovered,
            isRootComponent,
            onFocusNext,
            onFocusPrevious,
            onInsertNode,
            path: componentPath,
          })}
        <span>&nbsp;</span>
      </Line>
      {componentProps
        .map((propNode, index) => {
          return (
            <PropRenderer
              completionData={completionData}
              componentTree={componentTree}
              componentNode={componentNode}
              key={index}
              indentLevel={indentLevel + 1}
              interactionState={interactionState}
              onBlur={onBlur}
              onChangeNode={onChangeNode}
              onChangePropName={onChangePropName}
              onChangePropValue={onChangePropValue}
              onFocus={onFocus}
              onFocusNext={onFocusNext}
              onFocusPrevious={onFocusPrevious}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              propNode={propNode}
            />
          )
        })
        .toArray()}
      {componentProps.count() > 0 &&
        <Line
          indentLevel={indentLevel}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {renderStartTagEnding({
            componentNode,
            interactionState,
            isHovered,
            isRootComponent,
            onFocusNext,
            onFocusPrevious,
            onInsertNode,
            path: componentPath,
          })}
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
            onChangeComponentName={onChangeComponentName}
            onChangePropName={onChangePropName}
            onChangePropValue={onChangePropValue}
            onSelectComponent={onSelectComponent}
            onInsertNode={onInsertNode}
            onFocus={onFocus}
            onFocusNext={onFocusNext}
            onFocusPrevious={onFocusPrevious}
          />
        ))
        .toArray()}
      {childComponents.count() > 0 &&
        <Line indentLevel={indentLevel}>
          {'</'}<span {...theme.componentName}>{componentName}</span>{'>'}
        </Line>}
    </div>
  )
}

const defaultTheme = {
  componentName: {
    color: Colors.primary400,
  },
}

class ComponentRendererContainer extends PureComponent {
  props: any
  state: any
  constructor(props: any) {
    super(props)
    this.state = {
      isHovered: false,
    }
  }
  handleMouseEnter = () => this.setState({ isHovered: true })
  handleMouseLeave = () => this.setState({ isHovered: false })
  render() {
    return (
      <ComponentRenderer
        {...this.props}
        isHovered={this.state.isHovered}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    )
  }
}

const ThemedComponentRenderer = Theme('ComponentRenderer', defaultTheme)(
  ComponentRendererContainer
)

export default ThemedComponentRenderer
