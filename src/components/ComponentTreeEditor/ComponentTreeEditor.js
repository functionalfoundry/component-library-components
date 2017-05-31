/* @flow */

import React from 'react'
import Theme from 'js-theme'
import { Editor, Raw, State } from 'slate'

import type {
  Component,
  ComponentTree,
  NodeIdentifierT,
} from '../../utils/CompositeComponents/ComponentTree'
import {
  type InteractionStateT,
  ComponentTreeEditorPlugin,
  InteractionState,
} from '../../utils/CompositeComponents/ComponentTreeEditorPlugin'
import ComponentTreeSyntaxPlugin
  from '../../utils/CompositeComponents/ComponentTreeSyntaxPlugin'
import {
  ComponentTreeLayout,
  generateTreeLayout,
  generateTreeLayoutMarkup,
} from '../../utils/CompositeComponents/ComponentTreeLayout'
import type { CompletionDataT } from '../../utils/CompositeComponents/Completion'

/**
 * Props
 */

type PropsT = {
  tree: ComponentTree,
  layout: ComponentTreeLayout,
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
}

const defaultProps = {}

/**
 * State
 */

type StateT = {
  tree: ComponentTree,
  markup: string,
  layout: ComponentTreeLayout,
  plugins: Array<Object>,
  editorState: State,
  interactionState: InteractionState,
}

const getComponentTreeEditorState = (tree: ComponentTree, treeMarkup: string) =>
  Raw.deserialize(
    {
      nodes: [
        {
          kind: 'block',
          type: 'code',
          nodes: [
            {
              kind: 'text',
              text: treeMarkup,
            },
          ],
        },
      ],
    },
    {
      terse: true,
    }
  )

const getComponentTreeEditorPlugins = (
  editor: ComponentTreeEditor,
  tree: ComponentTree,
  layout: ComponentTreeLayout,
  completionData: CompletionDataT,
  interactionState: InteractionStateT
) => [
  ComponentTreeEditorPlugin({
    tree,
    completionData,
    interactionState,
    onChange: editor.handleTreeChange,
    onRemoveProp: editor.handleRemoveProp,
    onRemoveComponent: editor.handleRemoveComponent,
    onInsertComponent: editor.handleInsertComponent,
    onChangePropName: editor.handleChangePropName,
    onChangePropValue: editor.handleChangePropValue,
    onChangeComponentName: editor.handleChangeComponentName,
    onSelectComponent: editor.handleSelectComponent,
    onSelectNode: editor.handleSelectNode,
  }),
  ComponentTreeSyntaxPlugin({
    tree,
    layout,
  }),
]

/**
 * ComponentTree component
 */

class ComponentTreeEditor extends React.Component {
  props: PropsT
  state: StateT

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.state = this.getStateFromTreeAndProps(props, InteractionState())
  }

  componentWillReceiveProps(nextProps) {
    this.setState(state => {
      return this.getStateFromTreeAndProps(nextProps, state.interactionState)
    })
  }

  render() {
    return (
      <Editor
        state={this.state.editorState}
        plugins={this.state.plugins}
        onChange={this.handleChange}
        readOnly
      />
    )
  }

  getStateFromTreeAndProps = (
    { tree, markup, layout, completionData }: PropsT,
    interactionState: InteractionState
  ) => {
    const editorState = getComponentTreeEditorState(tree, markup)
    const plugins = getComponentTreeEditorPlugins(
      this,
      tree,
      layout,
      completionData,
      interactionState
    )
    return {
      tree,
      markup,
      layout,
      plugins,
      editorState,
      interactionState,
    }
  }

  updateInteractionState = (interactionState: InteractionState) => {
    this.setState((state, props) => {
      return this.getStateFromTreeAndProps(props, interactionState)
    })
  }

  handleChange = (editorState: State) => this.setState({ editorState })

  handleTreeChange = (tree: ComponentTree) => {
    this.setState((state, props) => {
      const layout = generateTreeLayout(tree)
      const markup = generateTreeLayoutMarkup(layout)

      return this.getStateFromTreeAndProps(
        Object.assign({}, props, { tree: tree, markup: markup, layout: layout }),
        state.interactionState
      )
    })
    this.props.onChange && this.props.onChange(tree)
  }

  handleRemoveProp = (nodeId: NodeIdentifierT) => {
    this.props.onRemoveProp && this.props.onRemoveProp(nodeId)
  }

  handleRemoveComponent = (nodeId: NodeIdentifierT) => {
    this.props.onRemoveComponent && this.props.onRemoveComponent(nodeId)
  }

  handleInsertComponent = (
    parentNodeId: NodeIdentifierT,
    index: number,
    component: Component
  ) => {
    component = component.set('id', this.props.nodeIdGenerator())
    this.updateInteractionState(
      this.state.interactionState.set('editingNodeId', component.get('id'))
    )
    const { onInsertComponent } = this.props
    onInsertComponent &&
      onInsertComponent(parentNodeId, index, component, component.toJS())
  }

  handleChangePropName = (
    componentId: NodeIdentifierT,
    nodeId: NodeIdentifierT,
    name: any
  ) => {
    const { onChangePropName } = this.props
    this.updateInteractionState(this.state.interactionState.delete('editingNodeId'))
    onChangePropName && onChangePropName(componentId, nodeId, name)
  }

  handleChangePropValue = (nodeId: NodeIdentifierT, value: any) => {
    const { onChangePropValue } = this.props
    onChangePropValue && onChangePropValue(nodeId, value)
  }

  handleChangeComponentName = (nodeId: NodeIdentifierT, name: any) => {
    const { onChangeComponentName } = this.props
    this.updateInteractionState(this.state.interactionState.delete('editingNodeId'))
    onChangeComponentName && onChangeComponentName(nodeId, name)
  }

  handleSelectComponent = (nodeId: NodeIdentifierT) => {
    this.updateInteractionState(this.state.interactionState.set('editingNodeId', nodeId))
    this.props.onSelectComponent && this.props.onSelectComponent(nodeId)
  }

  handleSelectNode = (nodeId: NodeIdentifierT) => {
    this.updateInteractionState(this.state.interactionState.set('editingNodeId', nodeId))
  }
}

/**
 * Theming
 */

const defaultTheme = {}

const ThemedComponentTreeEditor = Theme('ComponentTreeEditor', defaultTheme)(
  ComponentTreeEditor
)
export default ThemedComponentTreeEditor
