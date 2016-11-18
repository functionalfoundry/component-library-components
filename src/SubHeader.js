import React from 'react'
import Theme from 'js-theme'

import {
  Icon,
  View,
} from '@workflo/components'
import {
  Colors,
  Spacing,
} from '@workflo/styles'

import { ActionT } from '../types/Action'

type PropsT = {
  theme: Object,
  leftElement: React.Element,
  rightElement: React.Element,
  actions: Array<ActionT>,
}

const SubHeader = ({
  theme,
  leftElement,
  rightElement,
  actions,
}: PropsT) => (
  <View
    {...theme.subHeader}
  >
    <View
      {...theme.leftColumn}
    >
      {leftElement}
    </View>
    <View
      {...theme.rightColumn}
    >
      {rightElement}
      {actions &&
        actions.map((action, index) => (
          <Icon
            {...theme.subHeaderIcon}
            key={index}
            name={action.icon}
          />
        ))}
    </View>
  </View>
)

const defaultTheme = {
  subHeader: {
    backgroundColor: Colors.grey800,
    padding: Spacing.small,
    flexDirection: 'row',
  },
  leftColumn: {

  },
  rightColumn: {
    flex: '0 1 auto',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  subHeaderIcon: {
    marginLeft: Spacing.tiny,
  },
}

export default Theme('SubHeader', defaultTheme)(SubHeader)
