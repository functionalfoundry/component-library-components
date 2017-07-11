/* @flow */
import React from 'react'
import Theme from 'js-theme'

import { Fonts } from '@workflo/styles'

import type { CompletionDataT } from '../../types/Completion'
import type { InteractionStateT } from './types'
import type {
  Component,
  ComponentTree,
  NodeIdentifierT,
} from '../../modules/ComponentTree'
import ComponentRenderer from './components/ComponentRenderer'

/**
 * Props
 */

type PropsT = {
  tree: ComponentTree,
  layout: ComponentTreeLayout.ComponentTreeLayout,
  markup: string,
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
  tree: ComponentTree,
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
      tree: props.tree,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tree !== this.props.tree) {
      this.setState({ tree: nextProps.tree })
    }
  }

  render() {
    const { theme } = this.props
    const { tree } = this.state
    const rootNode = tree.get('root')

    return (
      rootNode &&
      <div {...theme.componentTreeEditor}>
        <ComponentRenderer componentNode={rootNode} />
      </div>
    )
  }

  // handleChange = (editorState: State) => this.setState({ editorState })
  //
  // handleTreeChange = (tree: ComponentTree) => {
  //   this.props.onChange && this.props.onChange(tree)
  // }
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
  // handleChangePropValue = (nodeId: NodeIdentifierT, value: any) => {
  //   const { onChangePropValue } = this.props
  //   onChangePropValue && onChangePropValue(nodeId, value)
  // }
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
  },
}

const ThemedComponentTreeEditor = Theme('ComponentTreeEditor', defaultTheme)(
  ComponentTreeEditor
)
export default ThemedComponentTreeEditor
