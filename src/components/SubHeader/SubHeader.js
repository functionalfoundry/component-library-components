import React from 'react'
import Theme from 'js-theme'
import {
  Button,
  Icon,
  Text, // Probably shouldn't be using Heading for this. Text?
  View,
} from '@workflo/components'
import { Colors, Fonts, Spacing } from '@workflo/styles'

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

const SubHeader = ({ primaryAction, secondaryActions, quickActions, theme }: Props) => (
  <View {...theme.header}>
    <QuickActions quickActions={quickActions} theme={theme} />
    <SecondaryActions secondaryActions={secondaryActions} theme={theme} />
    <PrimaryAction primaryAction={primaryAction} theme={theme} />
  </View>
)

SubHeader.defaultProps = defaultProps

const ActionsPropsT = {
  isEditorDirty: Boolean,
}

const QuickActions = ({ quickActions = [], theme }: ActionsPropsT) => {
  if (quickActions.length < 1) return null
  return (
    <div {...theme.actions}>
      {quickActions.map((action, index) => (
        <div key={index} onClick={action.onClick} {...theme.quickAction}>
          {action}
        </div>
      ))}
    </div>
  )
}

const ActionButton = ({ label, onClick, icon, kind = 'secondary', theme }) => {
  if (!label) return null
  return (
    <div {...theme.primaryAction}>
      <Button
        onClick={onClick}
        kind={kind}
        icon={name}
        theme={{
          button: primaryStyle,
        }}
      >
        {icon &&
          <Icon
            name={icon}
            stroke="white"
            theme={{
              icon: {
                alignItems: 'center',
                marginRight: 10,
                marginBottom: 4,
              },
            }}
          />}
        {label}
      </Button>
    </div>
  )
}

const PrimaryAction = ({ primaryAction, theme }) => (
  <ActionButton {...primaryAction} theme={theme} kind="regular" />
)

const SecondaryAction = ({ action, theme }) => (
  <ActionButton {...action} theme={theme} kind="secondary" />
)

const SecondaryActions = ({ secondaryActions = [], theme }) => {
  if (secondaryActions.length < 1) return null
  return (
    <div {...theme.secondaryActions}>
      {secondaryActions.map((action, index) => (
        <SecondaryAction key={index} action={action} theme={theme} />
      ))}
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
    flex: '0 0 56px',
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
    paddingRight: Spacing.small / 2,
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
    paddingLeft: Spacing.small / 2,
    color: Colors.primary,
    flex: '1 1',
  },
  primaryAction: {
    display: 'flex',
    alignSelf: 'stretch',
  },
  secondaryActions: {
    display: 'flex',
    alignSelf: 'stretch',
  },
  actions: {
    color: Colors.grey300,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  quickAction: {
    cursor: 'pointer',
  },
}

const ThemedSubHeader = Theme('SubHeader', defaultTheme)(SubHeader)
export default ThemedSubHeader
