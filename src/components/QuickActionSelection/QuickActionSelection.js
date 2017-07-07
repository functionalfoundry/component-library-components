import React from 'react'
import { Colors, Spacing } from '@workflo/styles'
import { Icon, Text, View } from '@workflo/components'
import QuickAction from '../QuickAction'

type PropsT = {
  numberSelected: number,
  onClearSelection: Function,
}

const QuickActionSelection = ({ numberSelected, onClearSelection }: PropsT) => {
  return (
    <QuickAction
      key="selection"
      label={`${numberSelected} selected`}
      input={{
        type: 'SuperCustom',
      }}
      shade="Light"
    >
      <View
        theme={{
          view: {
            flexDirection: 'row',
            alignItems: 'center',
            boxSizing: 'border-box',
            padding: '4px',
          },
        }}
      >
        <Icon
          name="close"
          size="small"
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
          size="small"
          theme={{
            text: {
              color: Colors.grey200,
              marginLeft: 12,
              marginTop: 2,
              marginRight: 8,
              userSelect: 'none',
              boxSizing: 'border-box',
            },
          }}
        >
          {`${numberSelected} SELECTED`}
        </Text>
        <div
          style={{
            width: 1,
            height: 28,
            backgroundColor: Colors.grey700,
            marginLeft: Spacing.small,
            marginRight: Spacing.small,
          }}
        />
      </View>
    </QuickAction>
  )
}

export default QuickActionSelection
