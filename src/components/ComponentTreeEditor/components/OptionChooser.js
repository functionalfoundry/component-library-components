import React from 'react'
import Theme from 'js-theme'
import fuzzaldrin from 'fuzzaldrin-plus'

import List, { ListItem } from '@workflo/components/lib/List'
import { Colors } from '@workflo/styles'

const CURRENT_VALUE = Symbol('Current Value')

export type Props = {
  /** Used to access an option value from an element in the option array */
  accessOption: Function,
  /** A function to getRef that wont be blown away by HOCs */
  getRef: Function,
  /** A list of options to be rendered */
  options: Array<any>,
  onKeyboardSelect: Function,
  onSelect: Function,
  optionRenderer?: Function,
  /**
   * When set to true, OptionChooser will not steal focus from other elements.
   */
  preventFocus?: boolean,
  theme: Object,
  /** The value/expression to fuzzy filter the options by */
  value: string,
}

class PropValueChooser extends React.Component {
  props: Props
  static defaultProps = {
    accessOption: x => x,
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    if (value !== this.state.value && typeof value === 'string') {
      this.setState({ value })
    }
  }

  componentDidMount() {
    const { getRef } = this.props
    if (getRef) {
      getRef(this)
    }
  }

  getOptions = () => {
    const { options } = this.props
    const { value } = this.state
    if (value.length) {
      const filteredOptions = fuzzaldrin.filter(options, value)
      /**
       * This helps us identify later if the option being handled is the
       * current value or one of the passed in options.
       */
      return [{ type: CURRENT_VALUE, value }].concat(filteredOptions)
    }
    return options
  }

  handleMouseDown = e => {
    const { preventFocus } = this.props
    if (preventFocus) {
      e.preventDefault()
    }
  }

  handleClick = index => {
    this.props.onSelect &&
      this.props.onSelect(this.getOptions()[index], { type: 'click' })
  }

  handleSelect = index => {
    this.props.onSelect &&
      this.props.onSelect(this.getOptions()[index], { type: 'enter' })
  }

  renderOption = ({ index, option }) => {
    const { accessOption, theme } = this.props
    const { value } = this.state
    if (option.type === CURRENT_VALUE) {
      return (
        <span {...theme.currentValue}>
          {option.value}
        </span>
      )
    }
    const matchIndexes = fuzzaldrin.match(accessOption(option), value)
    return (
      <span>
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
    )
  }

  setValue = value => this.setState({ value })

  render() {
    const { theme } = this.props
    return (
      <List
        {...theme.list}
        isKeyboardFocused
        onMouseDown={this.handleMouseDown}
        onSelect={this.handleSelect}
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

const listItemTheme = ({ isKeyboardFocused }) => ({
  listItem: {
    ':hover': {
      backgroundColor: Colors.grey800,
    },
    ':active': {
      backgroundColor: Colors.grey700,
    },
    backgroundColor: isKeyboardFocused ? Colors.grey800 : Colors.grey900,
    cursor: 'pointer',
  },
})

const defaultTheme = {
  list: {
    backgroundColor: Colors.grey900,
    color: 'white',
  },
  currentValue: {
    fontWeight: 600,
  },
  highlightedChar: {
    fontWeight: 600,
  },
  normalChar: {},
}

export default Theme('PropValueChooser', defaultTheme)(PropValueChooser)
