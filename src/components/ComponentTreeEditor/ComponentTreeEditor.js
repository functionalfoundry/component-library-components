/* @flow */

import React from 'react'
import Theme from 'js-theme'
import { Editor, Raw, State } from 'slate'

import type { NodeIdentifierT } from '../../utils/CompositeComponents/ComponentTree'
import {
  Component,
  ComponentTree,
} from '../../utils/CompositeComponents/ComponentTree'
import ComponentTreeEditorPlugin from '../../utils/CompositeComponents/ComponentTreeEditorPlugin'
import ComponentTreeSyntaxPlugin from '../../utils/CompositeComponents/ComponentTreeSyntaxPlugin'
import {
  ComponentTreeLayout,
  generateTreeLayout,
  generateTreeLayoutMarkup
} from '../../utils/CompositeComponents/ComponentTreeLayout'
import type { CompletionDataT } from '../../utils/CompositeComponents/Completion'

/**
 * Props
 */

type PropsT = {
  tree: ComponentTree,
  completionData: CompletionDataT,
  onChange?: Function,
  onRemoveProp?: Function,
  onRemoveComponent?: Function,
  onInsertComponent?: Function,
  onChangePropValue?: Function,
  onChangeComponentName?: Function,
}

const defaultProps = {
}

/**
 * State
 */

type StateT = {
  tree: ComponentTree,
  layout: ComponentTreeLayout,
  plugins: Array<Object>,
  editorState: State,
}

const getComponentTreeEditorState = (
  tree: ComponentTree,
  layout: ComponentTreeLayout
) => (
  Raw.deserialize({
    nodes: [
      {
        kind: 'block',
        type: 'code',
        nodes: [
          {
            kind: 'text',
            text: generateTreeLayoutMarkup(layout),
          }
        ]
      }
    ]
  }, {
    terse: true,
  })
)

const getComponentTreeEditorPlugins = (
  editor: ComponentTreeEditor,
  tree: ComponentTree,
  layout: ComponentTreeLayout,
  completionData: CompletionDataT,
) => ([
  ComponentTreeEditorPlugin({
    tree,
    layout,
    completionData,
    onChange: editor.handleTreeChange,
    onRemoveProp: editor.handleRemoveProp,
    onRemoveComponent: editor.handleRemoveComponent,
    onInsertComponent: editor.handleInsertComponent,
    onChangePropValue: editor.handleChangePropValue,
    onChangeComponentName: editor.handleChangeComponentName,
  }),
  ComponentTreeSyntaxPlugin({
    tree,
    layout
  }),
])

/**
 * ComponentTree component
 */

class ComponentTreeEditor extends React.Component {
  props: PropsT
  state: StateT

  static defaultProps = defaultProps

  constructor (props) {
    super(props)
    this.state = this.getStateFromTreeAndProps(props.tree, props)
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this.getStateFromTreeAndProps(nextProps.tree, nextProps))
  }

  render () {
    return (
      <Editor
        state={this.state.editorState}
        plugins={this.state.plugins}
        onChange={this.handleChange}
        readOnly
      />
    )
  }

  getStateFromTreeAndProps = (tree: ComponentTree, props: PropsT) => {
    const layout = generateTreeLayout(tree)
    const editorState = getComponentTreeEditorState(tree, layout)
    const plugins = getComponentTreeEditorPlugins(
      this, tree, layout, props.completionData
    )
    return {
      tree: tree,
      layout: layout,
      plugins: plugins,
      editorState: editorState,
    }
  }

  handleChange = (editorState: State) => (
    this.setState({ editorState })
  )

  handleTreeChange = (tree: ComponentTree) => {
    this.setState(this.getStateFromTreeAndProps(tree, this.props))
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
    const { onInsertComponent } = this.props
    onInsertComponent && onInsertComponent(
      parentNodeId, index, component.toJS()
    )
  }

  handleChangePropValue = (nodeId: NodeIdentifierT, value: any) => {
    this.props.onChangePropValue && this.props.onChangePropValue(nodeId, value)
  }

  handleChangeComponentName = (nodeId: NodeIdentifierT, name: any) => {
    const { onChangeComponentName } = this.props
    onChangeComponentName && onChangeComponentName(nodeId, name)
  }
}

/**
 * Theming
 */

const defaultTheme = {
}

const ThemedComponentTreeEditor =
  Theme('ComponentTreeEditor', defaultTheme)(ComponentTreeEditor)
export default ThemedComponentTreeEditor
