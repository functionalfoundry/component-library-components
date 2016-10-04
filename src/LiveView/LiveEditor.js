import React from 'react'
import Draft from 'draft-js'
import CodeUtils from 'draft-js-code'
import PrismDecorator from 'draft-js-prism'
import {
  View,
} from '@workflo/components'
import {
  Fonts,
  Spacing,
  Colors,
} from '@workflo/styles'

import { ReactDecorator } from './Decorators'

const {
    Editor,
    EditorState,
    convertFromRaw
} = Draft

export default class LiveView extends React.Component {

  constructor (props) {
    super(props)
    var contentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: props.code || ""
        }
      ]
    })
    this.state = {
      editorState: EditorState.createWithContent(contentState, ReactDecorator)
    }
    this.onChange = this.onChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.keyBindingFn = this.keyBindingFn.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.handleTab = this.handleTab.bind(this)
  }

  onChange (editorState) {
    this.setState({
      editorState: editorState
    })
  }

  handleKeyCommand (command) {
    const { editorState } = this.state
    let newState

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command)
    }

    if (!newState) {
      newState = Draft.RichUtils.handleKeyCommand(editorState, command)
    }

    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  keyBindingFn (e) {
    const editorState = this.state.editorState
    let command

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      command = CodeUtils.getKeyBinding(e)
    }
    if (command) {
      return command
    }

    return Draft.getDefaultKeyBinding(e)
  }

  handleReturn (e) {
    const editorState = this.state.editorState

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this.onChange(
      CodeUtils.handleReturn(e, editorState)
    )
    return true
  }

  handleTab (e) {
    const editorState = this.state.editorState

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this.onChange(
      CodeUtils.handleTab(e, editorState)
    )
  }

  render () {
    return (
      <View
        style={styles.editor}
      >
        <Draft.Editor
          customStyleMap={styleMap}
          editorState={this.state.editorState}
          onChange={this.onChange}
          keyBindingFn={this.keyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
          handleReturn={this.handleReturn}
          onTab={this.handleTab}
          readOnly={true}
        />
      </View>
    )
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Open Sans", "Menlo", "Consolas", monospace',
    fontSize: 16,
    color: 'red',
    padding: 2,
  },
}

const styles = {
  editor: {
    ...Fonts.base,
    padding: Spacing.small,
    backgroundColor: 'white',
    color: Colors.steel6,
    lineHeight: '1.6em',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}
