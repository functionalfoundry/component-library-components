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
  icon: string,
  label: string,
}

export default class BulkActionButton extends React.Component {
  constructor () {
    super()
    this.state = {
      isHovering: false,
    }
  }

  handleClick = () => {

  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
  }

  render () {
    const { icon, label } = this.props
    const { isHovering } = this.state
    return (
      <View
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        theme={{
          view: {
            flexDirection: 'row',
            alignItems: 'center',
            cursor: 'pointer',
            ':active': {
              backgroundColor: 'rgba(100, 100, 100, .2)',
            },
          },
        }}
      >
        <Icon
          name={icon}
          size='large'
          stroke={Colors.primary}
          fill={Colors.primary}
        />
        <Text
          size='small'
          theme={{
            text: {
              color: !isHovering ? Colors.grey200 : Colors.primary,
              marginLeft: Spacing.tiny,
              textTransform: 'uppercase',
              userSelect: 'none',
            },
          }}
        >
          {label}
        </Text>
      </View>
    )
  }
}
