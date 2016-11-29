import React from 'react'
import Theme from 'js-theme'
import {
  Button,
  Icon,
  Text, // Probably shouldn't be using Heading for this. Text?
  View,
} from '@workflo/components'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'

export type ActionT = {
  label: string,
  icon: string,
  onClick: Function,
}

type Props = {
  theme: Object,
  primaryAction: ActionT,
  secondaryActions: Array<ActionT>,
  quickActions: Array<ActionT>,
}

const defaultProps = {
  // primaryAction: {},
}

const SubHeader = ({
  primaryAction,
  secondaryActions,
  quickActions,
  theme,
}: Props) => (
  <View
    {...theme.header}
  >
    <QuickActions
      quickActions={quickActions}
      theme={theme}
    />
    <SecondaryActions secondaryActions={secondaryActions} />
    <PrimaryAction
      primaryAction={primaryAction}
    />
  </View>
)

SubHeader.defaultProps = defaultProps

const ActionsPropsT = {
  isEditorDirty: Boolean,
}

const QuickActions = ({
  quickActions = [],
  theme,
}: ActionsPropsT) => {
  if (quickActions.length < 1) return null
  return (
    <div
      {...theme.actions}
    >
      {quickActions.map((action, index) => (
        <div
          onClick={action.onClick}
          style={{ cursor: 'pointer' }}
        >
          <Icon
            key={index}
            name={action.icon}
            fill={Colors.grey100}
            size='base'
          />
        </div>
      ))}
    </div>
  )
}

const ActionButton = ({
  label,
  onClick,
  icon,
  kind = 'secondary',
}) => {
  if (!arguments[0]) return null
  return (
    <div style={{ display: 'flex', alignSelf: 'stretch' }}>
      <Button
        label={label}
        onClick={onClick}
        kind={kind}
        theme={{
          button: primaryStyle,
        }}
      />
    </div>
  )
}

const PrimaryAction = ({ primaryAction }) => (
  <ActionButton
    {...primaryAction}
    kind='regular'
  />
)

const SecondaryAction = ({ action }) => (
  <ActionButton
    {...action}
    kind='secondary'
  />
)

const SecondaryActions = ({
  secondaryActions = [],
}) => {
  if (secondaryActions.length < 1) return null
  return (
    <div style={{ display: 'flex', alignSelf: 'stretch' }}>
      {secondaryActions.map((action) => <SecondaryAction action={action} />)}
    </div>
  )
}

const primaryStyle = {
  ...Fonts.small,
  borderRadius: 0,
  height: 'auto',
  letterSpacing: 2,
}

const defaultTheme = {
  header: {
    // backgroundColor: '#1C1C1C', // grey850
    // color: Colors.grey200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: '0 0 50px',
    // padding: Spacing.small,
  },
  profileView: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileLabel: {
    ...Fonts.title,
    ...Fonts.base,
    color: Colors.grey300,
    paddingRight: Spacing.small/2,
    flex: '0 1',
  },
  profilePhoto: {
    flex: '0 1',
    width: 'auto',
    minWidth: 'auto',
  },
  profileName: {
    ...Fonts.title,
    ...Fonts.base,
    paddingLeft: Spacing.small/2,
    color: Colors.primary,
    flex: '1 1',
  },
  actions: {
    ...Fonts.title,
    ...Fonts.base,
    color: Colors.grey300,
    display: 'flex',
    padding: Spacing.small,
    justifyContent: 'flex-end',
  },
}

export default Theme('SubHeader', defaultTheme)(SubHeader)
