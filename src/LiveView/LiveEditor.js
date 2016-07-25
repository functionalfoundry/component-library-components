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

const {
    Editor,
    EditorState,
    convertFromRaw
} = Draft

export default class LiveView extends React.Component {

  constructor (props) {
    super(props)
    const decorator = new PrismDecorator({ defaultSyntax: 'javascript' })
    var contentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: `<ListingCard
  listing={listing}
  size='medium'
/>`
        }
      ]
    })
    this.state = {
      editorState: EditorState.createWithContent(contentState, decorator)
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
        />
      </View>
    )
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    color: 'black',
    padding: 2,
  },
}

const styles = {
  editor: {
    ...Fonts.content,
    ...Fonts.base,
    padding: Spacing.small,
    backgroundColor: 'white',
    color: Colors.steel3,
  },
}
