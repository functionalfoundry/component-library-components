/** @flow */
import React from 'react'

import { Fonts } from '@workflo/styles'
import { EditableText, AlignedPointer } from '@workflo/components'

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
  /**
   * Indicates whether the editableField focused. Is merged in with local isFocused state
   * for faster local updates when the focus is triggered from the "inside".
   */
  isFocused: boolean,
  onBlur: Function,
  onChange: Function,
  /**
   * Fired when the EditableField is focused from within (not through props),
   * either through mouse (clicking) or keyboard (tabbing) interactions.
   */
  onFocus: Function,
  /**
   * Fired when user interacts with the EditableField in such a way that should
   * cause focus to move to the next EditableField in the UI.
   */
  onFocusNext: Function,
  /**
   * Fired when user interacts with the EditableField in such a way that should
   * cause focus to move to the previous EditableField in the UI.
   */
  onFocusPrevious: Function,
  options?: Array<any>,
  optionRenderer: Function,
  nodeId: string,
  value: string,
}

type ContainerStateT = {
  containerRef: any,
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
      containerRef: null,
      isFocused: false,
    }
  }

  shouldComponentUpdate(nextProps: ContainerPropsT, nextState: ContainerStateT) {
    /** Do not update while the component is being edited */
    if (nextState.isFocused && this.state.isFocused) {
      return false
    }
    return true
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.isFocused !== this.props.isFocused) {
  //     this.setState({ isFocused: nextProps.isFocused })
  //   }
  // }

  componentDidUpdate(prevProps: ContainerPropsT) {
    if (!prevProps.isFocused && this.props.isFocused && !this.state.isFocused) {
      this.focus()
    }
  }

  focus() {
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
        onFocus && onFocus(nodeId)
        this.editableText.refs.wrappedInstance.focusAndSelect()
      }
    )
  }

  handleSelect = (index: number, params: Object) => {
    const { onChange, onFocusNext, options } = this.props
    if (options) {
      this.setState({ isFocused: false })
      onChange && onChange(options[index])
    }
    if (params.type === 'enter' && onFocusNext) {
      onFocusNext()
    }
    this.editableText.refs.wrappedInstance.blur()
  }

  handleStartEdit = () => {
    this.focus()
  }

  handleStopEdit = () => {
    const { onBlur, nodeId } = this.props
    this.setState({
      isFocused: false,
    })
    onBlur && onBlur(nodeId)
  }

  saveRefToContainer = (ref: any) => this.setState({ containerRef: ref })

  saveRefToEditableText = (ref: any) => (this.editableText = ref)

  render() {
    const { formatValue, onChange, options, optionRenderer, value } = this.props
    const { isFocused } = this.state
    return (
      <span ref={this.saveRefToContainer}>
        <EditableField
          editableTextRef={this.saveRefToEditableText}
          onChange={onChange}
          onStartEdit={this.handleStartEdit}
          onStopEdit={this.handleStopEdit}
          options={options}
          value={formatValue({ isFocused, value })}
        />
        {options &&
          options.length > 0 &&
          <AlignedPointer
            forceOpen={this.state.isFocused}
            gravity="Bottom"
            openTriggers={[]}
            portal={({ close }) => {
              return (
                <OptionChooser
                  onSelect={this.handleSelect}
                  options={options}
                  optionRenderer={optionRenderer}
                  preventFocus
                />
              )
            }}
            position="Bottom"
            targetCloseTriggers={[]}
            targetRef={this.state.containerRef}
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