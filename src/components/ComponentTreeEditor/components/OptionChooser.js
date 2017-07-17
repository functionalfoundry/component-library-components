import React from 'react'
import Theme from 'js-theme'

import List, { ListItem } from '@workflo/components/lib/List'
import { Colors } from '@workflo/styles'

export type Props = {
  options: Array<any>,
  onSelect: Function,
  optionRenderer?: Function,
  /**
   * When set to true, OptionChooser will not steal focus from other elements.
   */
  preventFocus?: boolean,
  theme: Object,
}

class PropValueChooser extends React.Component {
  props: Props

  handleMouseDown = e => {
    const { preventFocus } = this.props
    if (preventFocus) {
      e.preventDefault()
    }
  }

  handleSelect = index => {
    this.props.onSelect && this.props.onSelect(index)
  }

  render() {
    const { optionRenderer, options, theme } = this.props
    return (
      <List {...theme.list} onMouseDown={this.handleMouseDown}>
        {options.map((option, index) => (
          <ListItem
            key={index}
            onClick={() => this.handleSelect(index)}
            theme={listItemTheme}
          >
            {optionRenderer ? optionRenderer(option, index) : option}
          </ListItem>
        ))}
      </List>
    )
  }
}

const listItemTheme = {
  listItem: {
    ':hover': {
      backgroundColor: Colors.grey800,
    },
    ':active': {
      backgroundColor: Colors.grey700,
    },
    cursor: 'pointer',
  },
}

const defaultTheme = {
  list: {
    backgroundColor: Colors.grey900,
    color: 'white',
  },
}

export default Theme('PropValueChooser', defaultTheme)(PropValueChooser)
