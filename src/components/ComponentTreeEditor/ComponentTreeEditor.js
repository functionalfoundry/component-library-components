/* @flow */

import React from 'react'
import Theme from 'js-theme'
import { Editor, Raw, State } from 'slate'

import ComponentTree from '../../utils/CompositeComponents/ComponentTree'
import ComponentTreeUtils from '../../utils/CompositeComponents/ComponentTreeUtils'
import ComponentTreeSyntaxPlugin from '../../utils/CompositeComponents/ComponentTreeSyntaxPlugin'

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
  plugins: Array<Object>,
  markup: string,
  editorState: State,
}

const getEditorStateFromMarkup = (markup: string) => (
  Raw.deserialize({
    nodes: [
      {
        kind: 'block',
        type: 'code',
        nodes: [
          {
            kind: 'text',
            text: markup,
          }
        ]
      }
    ]
  }, {
    terse: true,
  })
)

const getPluginsForTree = (tree: ComponentTree) => ([
  ComponentTreeSyntaxPlugin({ tree }),
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

    const { tree, markup } = ComponentTreeUtils.layout(props.tree)
    const editorState = getEditorStateFromMarkup(markup)

    this.state = {
      tree: tree,
      markup: markup,
      plugins: getPluginsForTree(tree),
      editorState: editorState,
    }
  }

  render () {
    console.log(this.state)
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
