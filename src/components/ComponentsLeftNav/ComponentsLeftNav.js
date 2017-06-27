import React from 'react'
import { TextInput } from '@workflo/components'
import List, { ListItem } from '@workflo/components/lib/List'
import { Colors, Spacing } from '@workflo/styles'
import Animations from '@workflo/styles/lib/Animations'
type Props = {
  /** Filter state to display in left nav */
  filterValue: string,
  /** Items to display in left nav */
  items: Array<{
    id: string,
    label: string,
  }>,
  /** Callback invoked when user changes filter state */
  onChangeFilter: Function,
  /** Callback invoked when user selects a component from list */
  onSelect: Function,
  /** Id of the item to show selection state for */
  selectedId: string,
}

const theme = {
  list: {
    backgroundColor: '#34393C',
    color: 'white',
  },
  listItem: {
    ':hover': {
      backgroundColor: Colors.grey700,
    },
    cursor: 'pointer',
    transition: `background-color ${Animations.Timing.t2.animationDuration}s ${Animations.Eases.entrance.animationTimingFunction}`, // eslint-disable-line
  },
  selectedListItem: {
    backgroundColor: Colors.grey400,
  },
}

const darkHoverAndActive = ({ isKeyboardFocused, isSelected }) => {
  const base = {
    cursor: 'pointer',
    color: 'white',
    ':hover': {
      backgroundColor: Colors.grey600,
    },
  }
  if (isKeyboardFocused) {
    return {
      ...base,
      backgroundColor: Colors.grey600,
    }
  }
  return base
}

class ComponentsLeftNav extends React.Component {
  props: Props
  static defaultProps = {
    filterValue: '',
    items: [],
  }

  static getSelectedIndex = ({ items, selectedId }) => {
    const selectedIndex = items.map(item => item.id).indexOf(selectedId)
    return selectedIndex === -1 ? null : selectedIndex
  }

  handleSelect = itemId => {
    const { onSelect } = this.props
    if (onSelect) {
      onSelect(itemId)
    }
  }

  render() {
    const { filterValue, items, onChangeFilter, selectedId } = this.props
    return (
      <div style={{ backgroundColor: '#34393C', height: '100%', width: '100%' }}>
        <div
          style={{ paddingLeft: Spacing.tiny, paddingTop: Spacing.tiny, width: '100%' }}
        >
          <TextInput
            disableUnderline
            placeholder="Filter"
            onChange={onChangeFilter}
            theme={{
              inputContain: {
                backgroundColor: '#23292b',
                // borderStyle: 'solid',
                // borderWidth: 0.5,
                // borderColor: Colors.grey700,
                padding: 3,
              },
              textInput: {
                color: 'white',
                paddingLeft: Spacing.tiny,
                paddingBottom: 5,
                '::placeholder': {
                  color: Colors.grey300,
                },
              },
              inputLabel: {
                color: Colors.grey200,
                paddingLeft: Spacing.tiny,
              },
            }}
            value={filterValue}
          />
        </div>
        <List
          onSelect={this.handleSelect}
          selectedIndex={ComponentsLeftNav.getSelectedIndex({ items, selectedId })}
          theme={theme}
        >
          {items.map(item => (
            <ListItem
              key={item.id}
              onClick={() => {
                this.handleSelect(item.id)
              }}
              theme={props => ({
                listItem: darkHoverAndActive(props),
              })}
            >
              {item.label}
            </ListItem>
          ))}

        </List>
      </div>
    )
  }
}

export default ComponentsLeftNav
