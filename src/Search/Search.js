import React from 'react'
import ReactDOM from 'react-dom'
import {
  Heading,
  Icon,
  View,
  TextField,
} from '@workflo/components'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'

type Props = {
  show: Boolean,
  focus: Boolean,
  text: String,
  onSearch: Function,
}

class Search extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.state = {
      isFocused: props.focus,
    }
    this.handleClickSearch = this.handleClickSearch.bind(this)
    this.handleWindowClick = this.handleWindowClick.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentWillMount () {
    if (this.state.isFocused && window) {
      setTimeout(() => {
        this.windowListener = window.addEventListener('click', this.handleWindowClick)
        this.refs.textField.focus()
      })
    }
  }

  componentWillUnmount () {
    if (window) {
      window.removeEventListener('click', this.handleWindowClick)
    }
  }

  handleClickSearch () {
    this.setState({
      isFocused: true,
    })
    if (window) {
      setTimeout(() => {
        this.windowListener = window.addEventListener('click', this.handleWindowClick)
        this.refs.textField.focus()
      })
    }
  }

  handleClickOutside () {
    this.setState({
      isFocused: false,
    })
    if (window) {
      window.removeEventListener('click', this.handleWindowClick)
    }
  }

  handleWindowClick (event) {
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
    } = this.props
    const {
      isFocused,
    } = this.state

    return (
      <View
        style={styles.container}
        ref='search'
      >
        {show && !isFocused &&
          <View
            style={styles.wrapper}
            onClick={this.handleClickSearch}
          >
            {text}
            <Icon
              name='search'
              style={styles.searchIcon}
            />
          </View>}
        {show && isFocused &&
          <TextField
            ref='textField'
            value={text}
            placeholder='Search'
            onChange={onSearch}
            theme={{
              input: styles.textField,
            }}
          />}
      </View>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: '1',
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  textField: {
    ...Fonts.base,
    flex: '1 0 200px',
    backgroundColor: Colors.steel3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: Spacing.tiny,
    borderRight: `1px solid ${Colors.steel5}`,
    borderLeft: `1px solid ${Colors.steel5}`,
    borderBottom: 0,
    color: Colors.aluminum5,
  },
  closeIcon: {
    marginRight: Spacing.small,
  },
  searchIcon: {
    cursor: 'pointer',
    marginLeft: Spacing.tiny,
    marginTop: Spacing.tiny,
  },
  wrapper: {
    ...Fonts.base,
    display: 'flex',
    flex: '1',
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: Colors.aluminum5,
  }
}

export default Search
