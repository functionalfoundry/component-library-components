/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'

import {
  Icon,
  View,
  TextInput,
} from '@workflo/components'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'

type PropsT = {
  show: boolean,
  text: string,
  onSearch: Function,
  theme: Object,
}

type StateT = {
  isFocused: boolean,
}

class Search extends React.Component {
  props: PropsT
  state: StateT
  windowListener: any

  constructor (props: PropsT) {
    super(props)
    this.state = {
      isFocused: false,
    }
  }

  componentWillUnmount () {
    if (window) {
      window.removeEventListener('click', this.handleWindowClick)
    }
  }

  handleClickSearch = () => {
    this.setState({
      isFocused: true,
    }, () => {
      if (window) {
        setTimeout(() => {
          this.windowListener = window.addEventListener('click', this.handleWindowClick)
          this.refs.textInput.getWrappedInstance().focus()
        })
      }
    })
  }

  handleClickOutside = () => {
    this.setState({
      isFocused: false,
    })
    if (window) {
      window.removeEventListener('click', this.handleWindowClick)
    }
  }

  handleWindowClick = (event) => {
    const node = ReactDOM.findDOMNode(this.refs.search)
    if (!node.contains(event.target)) {
      this.handleClickOutside()
    }
  }

  render () {
    const {
      show,
      onSearch,
      text,
      theme,
    } = this.props
    const {
      isFocused,
    } = this.state

    return (
      <View
        {...theme.container}
        ref='search'
      >
        {show && !isFocused &&
          <View
            {...theme.wrapper}
            onClick={this.handleClickSearch}
          >
            {text}
            <Icon
              {...theme.searchIcon}
              name='search'
              size='base'
            />
          </View>}
        {show && isFocused &&
          <TextInput
            {...theme.input}
            ref='textInput'
            value={text}
            placeholder='Search'
            onChange={onSearch}
          />}
      </View>
    )
  }
}

const defaultTheme = {
  container: {
    ...Fonts.base,
    justifyContent: 'flex-end',
    cursor: 'pointer',
    height: 45,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.grey800,
    padding: Spacing.tiny,
    borderRight: `1px solid ${Colors.grey700}`,
    borderLeft: `1px solid ${Colors.grey700}`,
    borderBottom: 0,
    color: Colors.grey200,
  },
  closeIcon: {
    marginRight: Spacing.small,
  },
  searchIcon: {
    cursor: 'pointer',
    marginLeft: Spacing.tiny,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: Colors.grey200,
  }
}

export default Theme('Search', defaultTheme)(Search)
