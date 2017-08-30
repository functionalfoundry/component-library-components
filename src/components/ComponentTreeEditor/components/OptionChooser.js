import React from 'react'
import Theme from 'js-theme'
import fuzzaldrin from 'fuzzaldrin-plus'

import List, { ListItem } from '@workflo/components/lib/List'
import { Colors } from '@workflo/styles'

const CURRENT_VALUE = Symbol('Current Value')

export type Props = {
  /** Used to access an option value from an element in the option array */
  accessOption: Function,
  /**
   * If set to false the user may select the currently input value, otherwise
   * they are limited to the options passed in as the option prop. In freeform
   * mode, 'onSelect' callback will always be invoked with a value, whereas otherwise
   * they will be invoked with an object representing the option.
   */
  disableFreeform: boolean,
  /**
   * If set to false, then the freeform value, will only be shown if it does not
   * match one of the options.
   */
  disableFreeformDuplicate: boolean,
  /** If set to true, the list of options will not be filtered based on the value prop */
  disableFilter: boolean,
  /** If set to true, options will not be rendered with fuzzy highlighting. */
  disableFuzzyHighlighting: boolean,
  /** A function for rendering the freeform value passed in through the 'value' prop */
  freeformRenderer?: Function,
  /** A function to getRef that wont be blown away by HOCs */
  getRef: Function,
  /** A list of options to be rendered */
  options: Array<any>,
  onSelect: Function,
  optionRenderer?: Function,
  /**
   * When set to true, OptionChooser will not steal focus from other elements.
   */
  preventFocus?: boolean,
  theme: Object,
  /** The value/expression to fuzzy filter the options by */
  value?: string,
}

class OptionChooser extends React.PureComponent {
  props: Props
  static defaultProps = {
    accessOption: x => x,
    disableFreeform: false,
  }

  constructor(props: Props) {
    const { accessOption, options, value } = props
    super(props)
    const optionsWithValue = options.map(option => ({
      optionValue: accessOption(option),
      option,
    }))
    const matchIndex = optionsWithValue.map(option => option.optionValue).indexOf(value)
    this.state = {
      focusedIndex: Math.max(matchIndex, 0),
      value: '',
    }
  }

  componentDidMount() {
    const { getRef } = this.props
    if (getRef) {
      getRef(this)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value, disableFreeform } = nextProps
    if (this.props.value !== value && !disableFreeform) {
      this.setState({
        focusedIndex: 0,
      })
    }
  }

  getOptions = () => {
    const {
      accessOption,
      disableFreeform,
      disableFreeformDuplicate,
      disableFilter,
      options,
    } = this.props
    const { value } = this.props
    const optionsWithValue = options.map(option => ({
      optionValue: accessOption(option),
      option,
    }))
    const matchIndex = optionsWithValue.map(option => option.optionValue).indexOf(value)

    const freeFormValue =
      disableFreeform ||
      !value ||
      !value.length ||
      (matchIndex >= 0 && disableFreeformDuplicate)
        ? []
        : [{ type: CURRENT_VALUE, value }]

    if (!disableFilter && value) {
      const filteredOptions = fuzzaldrin
        .filter(optionsWithValue, value, { key: 'optionValue' })
        .map(option => option.option)
      /**
       * This helps us identify later if the option being handled is the
       * current value or one of the passed in options.
       */
      return freeFormValue.concat(filteredOptions)
    }
    return freeFormValue.concat(options)
  }

  handleMouseDown = e => {
    const { preventFocus } = this.props
    if (preventFocus) {
      e.preventDefault()
    }
  }

  handleClick = index => {
    const { accessOption, disableFreeform, onSelect } = this.props
    const options = this.getOptions()
    const meta = { type: 'click' }
    if (!disableFreeform) {
      const value =
        options[index].type === CURRENT_VALUE
          ? options[index].value
          : accessOption(options[index])
      return onSelect && onSelect(value, meta)
    }
    onSelect && onSelect(options[index], meta)
  }

  handleFocus = focusedIndex => {
    this.setState({ focusedIndex })
  }

  handleSelect = index => {
    const { accessOption, disableFreeform, onSelect } = this.props
    const options = this.getOptions()
    const meta = { type: 'enter' }
    if (!disableFreeform) {
      const value =
        options[index].type === CURRENT_VALUE
          ? options[index].value
          : accessOption(options[index])
      return onSelect && onSelect(value, meta)
    }
    onSelect && onSelect(options[index], meta)
  }

  renderOption = ({ index, option }: { index: number, option: Object }) => {
    const {
      accessOption,
      disableFuzzyHighlighting,
      freeformRenderer,
      optionRenderer,
      theme,
      value,
    } = this.props
    if (option.type === CURRENT_VALUE) {
      return (
        <span {...theme.currentValue}>
          {freeformRenderer ? freeformRenderer(option.value) : option.value}
        </span>
      )
    }
    const matchIndexes = fuzzaldrin.match(accessOption(option), value)
    const optionElement = !disableFuzzyHighlighting
      ? <span>
          {accessOption(option).split('').map((char, index) =>
            <span
              key={index}
              {...(matchIndexes.indexOf(index) === -1
                ? theme.normalChar
                : theme.highlightedChar)}
            >
              {char}
            </span>
          )}
        </span>
      : <span>
          {accessOption(option)}
        </span>
    return optionRenderer ? optionRenderer({ option, optionElement }) : optionElement
  }

  render() {
    return (
      <List
        enableKeyboardNavigation
        enableMouseNavigation
        focusedIndex={this.state.focusedIndex}
        onMouseDown={this.handleMouseDown}
        onSelect={this.handleSelect}
        onFocus={this.handleFocus}
        theme={listTheme}
      >
        {this.getOptions().map((option, index) =>
          <ListItem
            key={index}
            onClick={() => this.handleClick(index)}
            theme={listItemTheme}
          >
            {this.renderOption({ option, index })}
          </ListItem>
        )}
      </List>
    )
  }
}

const listItemTheme = ({ isSelected, isFocused }) => ({
  listItem: {
    backgroundColor: isFocused ? Colors.grey800 : Colors.grey900,
    cursor: 'pointer',
  },
})

const listTheme = {
  list: {
    backgroundColor: Colors.grey900,
    color: 'white',
    maxHeight: 200,
  },
}

const defaultTheme = ({ disableFuzzyHighlighting }) => ({
  currentValue: {
    fontWeight: disableFuzzyHighlighting ? 300 : 600,
  },
  highlightedChar: {
    fontWeight: 600,
  },
  normalChar: {
    color: Colors.grey200,
  },
})

export default Theme('OptionChooser', defaultTheme)(OptionChooser)
