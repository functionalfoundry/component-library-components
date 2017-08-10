import React from 'react'
import Theme from 'js-theme'

import List, { ListItem } from '@workflo/components/lib/List'
import { Colors } from '@workflo/styles'

const filterOptions = ({ options, value }) => options

export type Props = {
  /** Used to access an option value from an element in the option array */
  accessValue: Function,
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
    accessValue: x => x,
  }

  constructor(props: Props) {
    const { value } = props
    super(props)
    this.state = {
      value,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    if (value !== this.state.value) {
      this.setState({ value })
    }
  }

  componentDidMount() {
    const { getRef } = this.props
    getRef(this)
  }

  getOptions = () => {
    const { options } = this.props
    const { value } = this.state
    const filteredOptions = filterOptions({ options, value })
    return [value].concat(filteredOptions)
  }

  getOptionValue = index => {
    const { accessValue } = this.props
    return accessValue(this.getOptions()[index])
  }

  handleMouseDown = e => {
    const { preventFocus } = this.props
    if (preventFocus) {
      e.preventDefault()
    }
  }

  handleClick = index => {
    this.props.onSelect &&
      this.props.onSelect(this.getOptionValue(index), { type: 'click' })
  }

  handleSelect = index => {
    this.props.onSelect &&
      this.props.onSelect(this.getOptionValue(index), { type: 'enter' })
  }

  renderOption = ({ option, index }) => {
    const { optionRenderer } = this.props
    if (index === 0) {
      return option
    }
    return optionRenderer ? optionRenderer(option, index) : option
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
}

export default Theme('PropValueChooser', defaultTheme)(PropValueChooser)
