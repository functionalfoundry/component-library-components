/** @flow */
import React from 'react'
import Theme from 'js-theme'

import { Colors, Fonts } from '@workflo/styles'

import type { CompletionDataT } from '../../types/Completion'
import type { ComponentTree, NodeIdentifierT } from '../../modules/ComponentTree'
import ComponentRenderer from './components/ComponentRenderer'
import type { InteractionStateT } from './types'

/**
 * Props
 */

type PropsT = {
  tree: ComponentTree,
  completionData: CompletionDataT,
  nodeIdGenerator: Function,
  onChange?: Function,
  onRemoveProp?: Function,
  onRemoveComponent?: Function,
  onInsertComponent?: Function,
  onChangePropName?: Function,
  onChangePropValue?: Function,
  onChangeComponentName?: Function,
  onSelectComponent?: Function,
  theme: Object,
}

const defaultProps = {}

/**
 * State
 */

type StateT = {
  componentTree: ComponentTree,
  interactionState: InteractionStateT,
}

/**
 * ComponentTree component
 */

class ComponentTreeEditor extends React.Component {
  props: PropsT
  state: StateT

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.state = {
      componentTree: props.tree,
      interactionState: {
        focusedNodeId: null,
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tree !== this.props.tree) {
      this.setState({ componentTree: nextProps.tree })
    }
  }

  render() {
    const { completionData, theme } = this.props
    const { componentTree, interactionState } = this.state
    const rootNode = componentTree.get('root')

    return (
      rootNode &&
      <div {...theme.componentTreeEditor}>
        <ComponentRenderer
          onChange={this.handleChange}
          onChangePropValue={this.handleChangePropValue}
          onFocus={this.handleFocus}
          completionData={completionData}
          componentNode={rootNode}
          componentTree={componentTree}
          interactionState={interactionState}
        />
      </div>
    )
  }

  handleChange = (componentTree: ComponentTree) => {
    this.setState({ componentTree })
    this.props.onChange && this.props.onChange(componentTree)
  }

  handleChangePropValue = (nodeId: NodeIdentifierT, value: any) => {
    const { onChangePropValue } = this.props
    onChangePropValue && onChangePropValue(nodeId, value)
  }

  handleFocus = id => {
    this.setState({
      interactionState: {
        focusedNodeId: id,
      },
    })
  }
  //
  // handleRemoveProp = (nodeId: NodeIdentifierT) => {
  //   this.props.onRemoveProp && this.props.onRemoveProp(nodeId)
  // }
  //
  // handleRemoveComponent = (nodeId: NodeIdentifierT) => {
  //   this.props.onRemoveComponent && this.props.onRemoveComponent(nodeId)
  // }
  //
  // handleInsertComponent = (
  //   parentNodeId: NodeIdentifierT,
  //   index: number,
  //   component: Component
  // ) => {
  //   component = component.set('id', this.props.nodeIdGenerator())
  //   const { onInsertComponent } = this.props
  //   onInsertComponent &&
  //     onInsertComponent(parentNodeId, index, component, component.toJS())
  // }
  //
  // handleChangePropName = (
  //   componentId: NodeIdentifierT,
  //   nodeId: NodeIdentifierT,
  //   name: any
  // ) => {
  //   const { onChangePropName } = this.props
  //   onChangePropName && onChangePropName(componentId, nodeId, name)
  // }
  //
  //
  // handleChangeComponentName = (nodeId: NodeIdentifierT, name: any) => {
  //   const { onChangeComponentName } = this.props
  //   onChangeComponentName && onChangeComponentName(nodeId, name)
  // }
  //
  // handleSelectComponent = (nodeId: NodeIdentifierT) => {
  //   this.props.onSelectComponent && this.props.onSelectComponent(nodeId)
  // }
  //
  // handleSelectNode = (nodeId: NodeIdentifierT) => {}
}

/**
 * Theming
 */

const defaultTheme = {
  componentTreeEditor: {
    ...Fonts.code,
    color: Colors.grey300,
    backgroundColor: Colors.grey900,
  },
}

const ThemedComponentTreeEditor = Theme('ComponentTreeEditor', defaultTheme)(
  ComponentTreeEditor
)
export default ThemedComponentTreeEditor
