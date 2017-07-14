import React from 'react'
import Theme from 'js-theme'

import List, { ListItem } from '@workflo/components/lib/List'
import { Colors } from '@workflo/styles'

export type Props = {
  options: Array<any>,
  onSelect: Function,
  optionRenderer?: Function,
  theme: Object,
}

class PropValueChooser extends React.Component {
  props: Props

  handleSelect = index => {
    this.props.onSelect && this.props.onSelect(index)
  }

  render() {
    const { optionRenderer, options, theme } = this.props
    return (
      <List {...theme.list}>
        {options.map((option, index) => (
          <ListItem
            key={index}
            onClick={() => this.handleSelect(index)}
            theme={listItemTheme}
          >
            {optionRenderer ? optionRenderer(option) : option}
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
