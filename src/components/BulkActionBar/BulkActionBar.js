import React from 'react'
import {
  View,
  Icon,
  Text,
} from '@workflo/components'
import {
  Colors,
  Spacing,
} from '@workflo/styles'

type PropsT = {
  onClearSelection: Function,
}

const defaultProps = {
  onClearSelection: () => {},
  numberSelected: 0,
}

export default class BulkActionBar extends React.Component {
  props: PropsT
  static defaultProps = defaultProps

  constructor () {
    super()
    this.state = {
      isHovering: false,
    }
  }

  handleClick = () => {

  }

  render () {
    const {
      children,
      onClearSelection,
      numberSelected,
    } = this.props
    const { isHovering } = this.state
    return (
      <View
        theme={{
          view: {
            flexDirection: 'row',
            alignItems: 'center',
          },
        }}
      >
        <Icon
          name='close'
          size='small'
          onClick={onClearSelection}
          stroke={Colors.primary}
          theme={{
            icon: {
              display: 'inline-block',
              cursor: 'pointer',
              padding: 8,
              ':hover': {
                // Duplicated with QuickAction
                backgroundColor: 'rgba(100, 100, 100, .2)',
              },
              ':active': {
                backgroundColor: 'rgba(100, 100, 100, .3)',
              },
            },
          }}
        />
        <Text
          size='small'
          theme={{
            text: {
              // Currently duplicated with QuickAction
              color: Colors.grey200,
              marginLeft: 15,
              marginTop: 2,
              marginRight: 8,
              userSelect: 'none',
            },
          }}
        >
          {`${numberSelected} SELECTED`}
        </Text>
        <div
          style={{
            width: 1,
            height: 28,
            backgroundColor: Colors.grey200,
            marginLeft: Spacing.small,
            marginRight: Spacing.small,
          }}
        />
        {children.map((child, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              marginRight: Spacing.small,
            }}
          >
            {child}
          </div>
        ))}
      </View>
    )
  }
}
