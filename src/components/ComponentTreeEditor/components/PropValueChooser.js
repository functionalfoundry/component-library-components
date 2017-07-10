import React from 'react'
import Theme from 'js-theme'

import List, { ListItem } from '@workflo/components/lib/List'
import { Colors } from '@workflo/styles'

import { Prop, PropValue } from '../../../modules/ComponentTree'
import type { GlobalOptionsDataT, PropCompletionDataT } from '../../types/Completion'

const unifyOptions = (
  completionData: ?PropCompletionDataT,
  options: ?GlobalOptionsDataT
) => {
  const result = []

  if (completionData && completionData.options) {
    completionData.options.map(option =>
      result.push({
        name: option,
        value: option,
        source: null,
      })
    )
  }

  if (options && Object.keys(options)) {
    Object.keys(options).map(key =>
      result.push({
        name: options && options[key] && options[key].name,
        value: options && options[key] && options[key].value,
        source: options && options[key] && options[key].source,
      })
    )
  }

  return result
}

const isOptionAppropriateForProp = (option, prop: Prop, value: PropValue) => {
  if (prop.value.type === 'function') {
    return (
      option.source === 'actions' && option.name !== 'setState' && option.name !== 'state'
    )
  } else {
    return (
      option.source !== 'actions' &&
      option.name !== 'initialState' &&
      option.name !== 'state'
    )
  }
}

export type Props = {
  prop: Prop,
  value: PropValue,
  completionData: ?PropCompletionDataT,
  options: ?GlobalOptionsDataT,
  onChange: Function,
  theme: Object,
}

class PropValueChooser extends React.Component {
  props: Props

  handleSelect = (event, value) => {
    this.props.onChange && this.props.onChange(value)
  }

  render() {
    const { completionData, options, prop, value, theme } = this.props
    return (
      <List {...theme.list}>
        {unifyOptions(completionData, options)
          .filter(option => isOptionAppropriateForProp(option, prop, value))
          .map(option => (
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
