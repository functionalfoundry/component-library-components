import React from 'react'
import Theme from 'js-theme'
import { View } from '@workflo/components'
import { BreakPoints, Colors, Fonts, Spacing } from '@workflo/styles'

import { ActionT, ActionsT } from '../../types/Action'
import BreadCrumb, { type BreadCrumbSegmentT } from '../BreadCrumb'
import ActionButton from '../ActionButton'

type Props = {
  breadCrumbPath: Array<BreadCrumbSegmentT>,
  bulkActions?: {
    quickActions: Array<React.Element>,
    numberSelected: Number,
    onClearSelection: Function,
  },
  onClickRoot: Function,
  primaryAction: ActionT,
  profile: Object,
  quickActions: Array<ActionT>,
  search?: React.Element,
  rootTitle: string,
  secondaryActions: Array<ActionT>,
  theme: Object,
}

const ComponentLibraryHeader = ({
  breadCrumbPath,
  bulkActions,
  primaryAction,
  profile,
  quickActions,
  search,
  secondaryActions,
  theme,
}: Props) => {
  return (
    <View {...theme.header}>
      <View {...theme.subtitleRow}>
        <div {...theme.leftBlock}>
          <BreadCrumb breadCrumbPath={breadCrumbPath} />
        </div>
        <div {...theme.rightBlock}>
          <div {...theme.quickActionsWrapper}>
            <QuickActions quickActions={quickActions} theme={theme} />
          </div>
          <div {...theme.actionsWrapper}>
            {secondaryActions &&
              <SecondaryActions secondaryActions={secondaryActions} theme={theme} />}
            {primaryAction &&
              <PrimaryAction primaryAction={primaryAction} theme={theme} />}
          </div>
        </div>
      </View>
    </View>
  )
}

type ActionsPropsT = {
  profile: Object,
  actions: ActionsT,
  search?: React.Element,
  theme: Object,
}

const PrimaryAction = ({ primaryAction, theme }) =>
  <ActionButton {...primaryAction} theme={theme} kind="regular" />

const SecondaryAction = ({ action, theme }) =>
  <ActionButton {...action} theme={theme} kind="secondary" />

const SecondaryActions = ({ secondaryActions = [], theme }) => {
  if (secondaryActions.length < 1) return null
  return (
    <div {...theme.secondaryActions}>
      {secondaryActions.map((action, index) =>
        <SecondaryAction key={index} action={action} theme={theme} />
      )}
    </div>
  )
}

const SEPARATOR_MARGIN = Spacing.small

const defaultTheme = {
  subtitleRow: {
    ...Fonts.large,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
    height: 40,
    justifyContent: 'flex-start',
    marginBottom: Spacing.micro,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  quickActionsWrapper: {
    marginLeft: 30,
    marginRight: 30,
    [`@media(max-width: ${BreakPoints.tabletLarge}px)`]: {
      display: 'none',
    },
  },
  quickActionWrapper: {
    display: 'flex',
  },
  secondaryActions: {
    display: 'flex',
    [`@media(max-width: ${BreakPoints.tabletLarge}px)`]: {
      display: 'none',
    },
  },
  header: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: Colors.grey900,
  },
  leftBlock: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    flex: '3 1 auto',
  },
  rightBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: '0 auto',
    [`@media(max-width: ${BreakPoints.tabletLarge}px)`]: {
      flexDirection: 'column-reverse',
      alignItems: 'flex-end',
    },
  },
  separator: {
    flex: '0 1 auto',
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: Colors.grey500,
    height: 40, // Make line-size height
    marginRight: SEPARATOR_MARGIN,
    marginLeft: SEPARATOR_MARGIN,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryActionWrapper: {
    display: 'flex',
    alignSelf: 'flex-end',
  },
  actionsWrapper: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    [`@media(max-width: ${500}px)`]: {
      display: 'none',
    },
  },
}

const QuickActions = ({ quickActions = [], theme }: ActionsPropsT) => {
  if (quickActions.length < 1) return null
  return (
    <div {...theme.actions}>
      {quickActions.map((action, index) =>
        <div key={index} onClick={action.onClick} {...theme.quickActionWrapper}>
          {action}
        </div>
      )}
    </div>
  )
}

export default Theme('ComponentLibraryHeader', defaultTheme)(ComponentLibraryHeader)
