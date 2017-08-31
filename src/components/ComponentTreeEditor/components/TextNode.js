import React from 'react'
import type { InteractionStateT } from '../types'
import { TextNode as TextNodeT } from '../../../modules/ComponentTree'
import EditableNodeAttribute from './EditableNodeAttribute'
import Line from './Line'

const displayTextValue = ({ value, isFocused }) => (isFocused ? value : `{'${value}'}`)

type Props = {
  indentLevel: number,
  interactionState: InteractionStateT,
  onBlur: Function,
  onChangeNode: Function,
  onFocus: Function,
  onFocusNext: Function,
  onFocusPrevious: Function,
  textNode: TextNodeT,
}

class TextNode extends React.Component {
  props: Props
  render() {
    const {
      indentLevel,
      interactionState,
      onBlur,
      onChangeNode,
      onFocus,
      onFocusNext,
      onFocusPrevious,
      textNode,
    } = this.props
    return (
      <Line indentLevel={indentLevel}>
        <EditableNodeAttribute
          formatValue={displayTextValue}
          interactionState={interactionState}
          nodeId={textNode.id}
          onBlur={onBlur}
          onChangeNode={onChangeNode}
          onFocus={onFocus}
          onFocusNext={onFocusNext}
          onFocusPrevious={onFocusPrevious}
          path={textNode.path.push('value')}
          value={textNode.value}
        />
        <span>&nbsp;</span>
      </Line>
    )
  }
}

export default TextNode
