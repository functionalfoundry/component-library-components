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
   * Function used to access an option value from an element in in the
   * options array.
   */
  accessOption?: Function,
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
  optionChooser: any

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

  componentWillReceiveProps(nextProps: ContainerPropsT) {
    /** Only update isFocused to false immediately, otherwise wait for update */
    if (nextProps.isFocused !== this.props.isFocused && !nextProps.isFocused) {
      this.setState({ isFocused: nextProps.isFocused })
    }
  }

  componentDidUpdate(prevProps: ContainerPropsT) {
    /** Focus after the update so we have a chance to format value first */
    if (!prevProps.isFocused && this.props.isFocused && !this.state.isFocused) {
      this.focus()
    }
  }

  componentDidMount() {
    if (this.props.isFocused) {
      this.focus()
    }
  }

  focus() {
    const { onFocus } = this.props
    this.setState(
      prevState => ({
        isFocused: true,
      }),
      /**
         * We do this in the callback so we only interact w/ EditableText after
         * it has been passed the lastest formatted value by formatValue.
         */
      () => {
        /** Prevents extra renders life cycles */
        if (!this.props.isFocused) {
          onFocus && onFocus()
        }
        if (
          this.editableText &&
          this.editableText.refs &&
          this.editableText.refs.wrappedInstance
        ) {
          this.editableText.refs.wrappedInstance.focusAndSelect()
        }
        /**
         * Prevents duplicate option from being shown in OptionChooser when
         * initially in focus.
         */
        this.optionChooser.setValue('')
      }
    )
  }

  handleChange = (value: string) => {
    const { onChange } = this.props
    if (this.optionChooser && this.optionChooser.setValue) {
      this.optionChooser.setValue(value)
    }
    if (onChange) {
      onChange(value)
    }
  }

  handleKeyDown = (event: SyntheticKeyboardEvent) => {
    const { onFocusNext, onFocusPrevious, value } = this.props
    if (event.keyCode === 46 || event.keyCode === 8) {
      /** This allows the user to repeatedly hit delete to clear fields */
      if (value === '' || value === null) {
        onFocusPrevious()
      }
    }

    if (event.keyCode === 9 && !event.shiftKey) {
      onFocusNext()
      event.preventDefault()
    }

    if (event.keyCode === 9 && event.shiftKey) {
      onFocusPrevious()
      event.preventDefault()
    }
  }

  handleSelect = (value: string, params: Object) => {
    const { onChange, onFocusNext, options } = this.props
    if (options) {
      this.setState({ isFocused: false })
      onChange && onChange(value)
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
    const { onBlur } = this.props
    this.setState({
      isFocused: false,
    })
    onBlur && onBlur()
  }

  saveRefToContainer = (ref: any) => this.setState({ containerRef: ref })

  saveRefToEditableText = (ref: any) => (this.editableText = ref)

  storeOptionChooser = (ref: any) => (this.optionChooser = ref)

  render() {
    const { accessOption, formatValue, options, optionRenderer, value } = this.props
    const { isFocused } = this.state
    return (
      <span ref={this.saveRefToContainer} onKeyDown={this.handleKeyDown}>
        <EditableField
          editableTextRef={this.saveRefToEditableText}
          onChange={this.handleChange}
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
            padding={0}
            openTriggers={[]}
            portal={({ close }) => {
              return (
                <OptionChooser
                  accessOption={accessOption}
                  getRef={this.storeOptionChooser}
                  onSelect={this.handleSelect}
                  options={options}
                  optionRenderer={optionRenderer}
                  preventFocus
                  value={formatValue({ isFocused: true, value })}
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
}: Props) =>
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

export default EditableFieldContainer
