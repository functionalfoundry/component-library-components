import React from 'react'
import { List, TextInput } from '@workflo/components'
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

  handleSelect = index => {
    const { items, onSelect } = this.props
    if (onSelect) {
      onSelect(items[index].id)
    }
  }

  render() {
    const { filterValue, items, onChangeFilter, selectedId } = this.props
    return (
      <div style={{ backgroundColor: '#34393C', height: '100%', width: '100%' }}>
        <div
          style={{ paddingLeft: Spacing.tiny, paddingTop: Spacing.tiny, width: '100%' }}
        >
          <TextInput label="Filter" onChange={onChangeFilter} value={filterValue} />
        </div>
        <List
          data={items.map(item => item.label)}
          onSelect={this.handleSelect}
          selectedIndex={ComponentsLeftNav.getSelectedIndex({ items, selectedId })}
          theme={theme}
        />
      </div>
    )
  }
}

export default ComponentsLeftNav
