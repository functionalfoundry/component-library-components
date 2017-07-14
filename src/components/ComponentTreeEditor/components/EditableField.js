/** @flow */
import React from 'react'

import { Fonts } from '@workflo/styles'
import { EditableText, AlignedPointer } from '@workflo/components'

import type { InteractionStateT } from '../types'
import OptionChooser from './OptionChooser'

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
  /**
   * An optional function to be applied to value before rendering. It is passed `value`
   * and `isFocused` as named parameters.
   */
  formatValue: Function,
  interactionState: InteractionStateT,
  onBlur: Function,
  onChange: Function,
  onFocus: Function,
  options?: Array<any>,
  optionRenderer: Function,
  nodeId: string,
  value: string,
}

type ContainerStateT = {
  isFocused: boolean,
}

type ContainerDefaultPropsT = {
  formatValue: Function,
}

class EditableFieldContainer extends React.Component {
  props: ContainerPropsT
  state: ContainerStateT
  container: any
  editableText: any
  isFocused: boolean = false

  static defaultProps: ContainerDefaultPropsT = {
    formatValue: ({ value }) => value,
  }

  constructor(props: ContainerPropsT) {
    super(props)
    this.state = {
      isFocused: false,
    }
  }

  componentDidUpdate(prevProps: ContainerPropsT) {
    if (
      prevProps.interactionState.focusedNodeId !==
        this.props.interactionState.focusedNodeId &&
      this.props.interactionState.focusedNodeId === this.props.nodeId &&
      !this.state.isFocused
    ) {
      this.focus()
    }
  }

  focus() {
    this.editableText.refs.wrappedInstance.focusAndSelect()
  }

  handleStartEdit = () => {
    const { onFocus, nodeId } = this.props
    this.setState(
      prevState => ({
        isFocused: true,
      }),
      /**
         * We do this in the callback so we only interact w/ EditableText after
         * it has been passed the lastest formatted value by formatValue.
         */
      () => {
        this.focus()
        onFocus && onFocus(nodeId)
      }
    )
  }

  handleStopEdit = () => {
    const { onBlur, nodeId } = this.props
    this.setState({
      isFocused: false,
    })
    onBlur && onBlur(nodeId)
  }

  saveRefToContainer = (ref: any) => (this.container = ref)

  saveRefToEditableText = (ref: any) => (this.editableText = ref)

  render() {
    const { formatValue, onChange, options, optionRenderer, value } = this.props
    const { isFocused } = this.state
    return (
      <span ref={this.saveRefToContainer}>
        <EditableField
          editableTextRef={this.saveRefToEditableText}
          onStartEdit={this.handleStartEdit}
          onStopEdit={this.handleStopEdit}
          onChange={onChange}
          options={options}
          value={formatValue({ isFocused, value })}
        />
        {options &&
          <AlignedPointer
            closeTriggers={['Blur']}
            gravity="Bottom"
            openTriggers={['Focus']}
            portal={({ close }) => {
              return (
                <OptionChooser
                  onSelect={index => {
                    close()
                  }}
                  options={options}
                  optionRenderer={optionRenderer}
                />
              )
            }}
            position="Bottom"
            targetRef={this.container}
            verticalOffset={2}
          />}
      </span>
    )
  }
}

type Props = {
  editableTextRef: Function,
  onChange: Function,
  onStartEdit: Function,
  onStopEdit: Function,
  value: string,
}

const EditableField = ({
  editableTextRef,
  onChange,
  onStartEdit,
  onStopEdit,
  value,
}: Props) => (
  <span>
    <EditableText
      inline
      onChange={onChange}
      onStartEdit={onStartEdit}
      onStopEdit={onStopEdit}
      ref={editableTextRef}
      theme={editableTextTheme}
      value={value}
    />
  </span>
)

export default EditableFieldContainer
