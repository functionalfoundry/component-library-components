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
  completionData: CompletionDataT,
  nodeIdGenerator: Function,
  onChange?: Function,
  onRemoveProp?: Function,
  onRemoveComponent?: Function,
  onInsertComponent?: Function,
  onChangePropValue?: Function,
  onChangeComponentName?: Function,
  onSelectComponent?: Function,
  onChangeMarkup?: Function,
}

const defaultProps = {}

/**
 * State
 */

type StateT = {
  tree: ComponentTree,
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
    onChangePropValue: editor.handleChangePropValue,
    onChangeComponentName: editor.handleChangeComponentName,
    onSelectComponent: editor.handleSelectComponent,
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
    this.state = this.getStateFromTreeAndProps(props.tree, props, InteractionState())
  }

  componentWillReceiveProps(nextProps) {
    this.setState(state => {
      return this.getStateFromTreeAndProps(
        nextProps.tree,
        nextProps,
        state.interactionState
      )
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
    tree: ComponentTree,
    props: PropsT,
    interactionState: InteractionState
  ) => {
    const layout = generateTreeLayout(tree)
    const treeMarkup = generateTreeLayoutMarkup(layout)
    const editorState = getComponentTreeEditorState(tree, treeMarkup)
    const plugins = getComponentTreeEditorPlugins(
      this,
      tree,
      layout,
      props.completionData,
      interactionState
    )
    if (props.onChangeMarkup) {
      props.onChangeMarkup(treeMarkup)
    }
    return {
      tree,
      treeMarkup,
      layout,
      plugins,
      editorState,
      interactionState,
    }
  }

  updateInteractionState = (interactionState: InteractionState) => {
    this.setState((state, props) => {
      return this.getStateFromTreeAndProps(props.tree, props, interactionState)
    })
  }

  handleChange = (editorState: State) => this.setState({ editorState })

  handleTreeChange = (tree: ComponentTree) => {
    this.setState((state, props) => {
      return this.getStateFromTreeAndProps(tree, props, state.interactionState)
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
      this.state.interactionState.set('editingComponentId', component.get('id'))
    )
    const { onInsertComponent } = this.props
    onInsertComponent &&
      onInsertComponent(parentNodeId, index, component, component.toJS())
  }

  handleChangePropValue = (nodeId: NodeIdentifierT, value: any) => {
    this.props.onChangePropValue && this.props.onChangePropValue(nodeId, value)
  }

  handleChangeComponentName = (nodeId: NodeIdentifierT, name: any) => {
    this.updateInteractionState(
      this.state.interactionState.set('editingComponentId', null)
    )
    const { onChangeComponentName } = this.props
    onChangeComponentName && onChangeComponentName(nodeId, name)
  }

  handleSelectComponent = (nodeId: NodeIdentifierT) => {
    this.props.onSelectComponent && this.props.onSelectComponent(nodeId)
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
