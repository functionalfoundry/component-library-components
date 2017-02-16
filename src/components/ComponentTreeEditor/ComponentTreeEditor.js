/* @flow */

import React from 'react'
import Theme from 'js-theme'
import { Editor, Raw, State } from 'slate'

import ComponentTree from '../../utils/CompositeComponents/ComponentTree'
//import ComponentTreeEditorPlugin from '../../utils/CompositeComponents/ComponentTreeEditorPlugin'
//import ComponentTreeSyntaxPlugin from '../../utils/CompositeComponents/ComponentTreeSyntaxPlugin'
import {
  ComponentTreeLayout,
  generateTreeLayout,
  generateTreeLayoutMarkup
} from '../../utils/CompositeComponents/ComponentTreeLayout'

/**
 * Props
 */

type PropsT = {
  tree: ComponentTree,
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
  tree: ComponentTree,
  layout: ComponentTreeLayout
) => ([
//  ComponentTreeEditorPlugin({ tree }),
//  ComponentTreeSyntaxPlugin({ tree }),
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

    const layout = generateTreeLayout(props.tree)
    const editorState = getComponentTreeEditorState(props.tree, layout)
    const plugins = getComponentTreeEditorPlugins(props.tree, layout)

    this.state = {
      tree: props.tree,
      layout: layout,
      plugins: plugins,
      editorState: editorState,
    }
  }

  render () {
    return (
      <Editor
        state={this.state.editorState}
        plugins={this.state.plugins}
        style={{
          fontFamily: 'Monaco',
        }}
        onChange={this.handleChange}
      />
    )
  }

  handleChange = (editorState: State) => (
    this.setState({ editorState })
  )
}

/**
 * Theming
 */

const defaultTheme = {
}

const ThemedComponentTreeEditor =
  Theme('ComponentTreeEditor', defaultTheme)(ComponentTreeEditor)
export default ThemedComponentTreeEditor
