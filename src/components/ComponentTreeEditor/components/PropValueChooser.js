import React from 'react'
import Theme from 'js-theme'

import List, { ListItem } from '@workflo/components/lib/List'
import { Colors } from '@workflo/styles'

import type { CompletionOptionT } from '../../../types/Completion'

export type Props = {
  completionOptions: Array<CompletionOptionT>,
  onChange: Function,
  theme: Object,
}

class PropValueChooser extends React.Component {
  props: Props

  handleSelect = (event, value) => {
    this.props.onChange && this.props.onChange(value)
  }

  render() {
    const { completionOptions, theme } = this.props
    return (
      <List {...theme.list}>
        {completionOptions.map(option => (
          <ListItem
            key={option.name}
            onClick={event => this.handleSelect(event, option.value)}
            theme={listItemTheme}
          >
            {option.value}
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
