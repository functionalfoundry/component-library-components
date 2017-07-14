/** @flow */
import React from 'react'

import { Colors, Fonts } from '@workflo/styles'
import { EditableText, Popover } from '@workflo/components'

import type { InteractionStateT } from '../types'

const editableTextTheme = {
  text: {
    ...Fonts.code,
    textAlign: 'left',
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
}

type ContainerPropsT = {
  interactionState: InteractionStateT,
  onBlur: Function,
  onFocus: Function,
  nodeId: string,
  value: string,
}

class EditableFieldContainer extends React.Component {
  props: ContainerPropsT
  editableText: any
  isFocused: boolean = false

  componentWillReceiveProps(nextProps: ContainerPropsT) {
    if (
      this.props.interactionState.focusedNodeId !==
        nextProps.interactionState.focusedNodeId &&
      nextProps.interactionState.focusedNodeId === nextProps.nodeId &&
      !this.isFocused
    ) {
      this.focus()
    }
  }

  focus() {
    this.editableText.refs.wrappedInstance.focusAndSelect()
  }

  handleClick = () => {
    const { onFocus, nodeId } = this.props
    if (!this.isFocused) {
      this.isFocused = true
      this.focus()
      onFocus && onFocus(nodeId)
    }
    /**
     * Only highlight the field the first time the user selects the field since the
     * last time they were focused on the field.
     */
    // const shouldFocusAndSelect = !this.state.isFocused
    // this.setState(
    //   prevState => ({
    //     isFocused: true,
    //   }),
    //   () => {
    //     if (shouldFocusAndSelect) {
    //       this.editableText.refs.wrappedInstance.focusAndSelect()
    //     }
    //   }
    // )
  }

  handleStopEdit = () => {
    const { onBlur, nodeId } = this.props
    this.isFocused = false
    onBlur && onBlur(nodeId)
  }

  saveRefToEditableText = (ref: any) => (this.editableText = ref)

  render() {
    const { value } = this.props
    return (
      <EditableField
        editableTextRef={this.saveRefToEditableText}
        onStopEdit={this.handleStopEdit}
        onClick={this.handleClick}
        value={value}
      />
    )
  }
}

type Props = {
  editableTextRef: Function,
  onChange: Function,
  onClick: Function,
  onStopEdit: Function,
  value: string,
}

const EditableField = ({
  editableTextRef,
  onClick,
  onChange,
  onStopEdit,
  value,
}: Props) => (
  <span onClick={onClick}>
    <EditableText
      inline
      onChange={onChange}
      onStopEdit={onStopEdit}
      ref={editableTextRef}
      theme={editableTextTheme}
      value={value}
    />
  </span>
)

export default EditableFieldContainer
