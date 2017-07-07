import React from 'react'
import Theme from 'js-theme'
import { Button, View, Icon } from '@workflo/components'
import { Colors, Fonts, Spacing } from '@workflo/styles'

import { ActionT, ActionsT } from '../../types/Action'
import SubHeader from '../SubHeader'
import BulkActionBar from '../BulkActionBar'
import RepoDropdown, { type RepoT } from '../RepoDropdown'
import BranchDropdown, { type BranchT } from '../BranchDropdown'
import BreadCrumb, { type BreadCrumbSegmentT } from '../BreadCrumb'
import ActionButton from '../ActionButton'

type Props = {
  branches: BranchT,
  breadCrumbPath: Array<BreadCrumbSegmentT>,
  bulkActions?: {
    quickActions: Array<React.Element>,
    numberSelected: Number,
    onClearSelection: Function,
  },
  onClickRoot: Function,
  onSelectBranch: Function,
  onSelectRepo: Function,
  onClickRepoGithub: Function,
  primaryAction: ActionT,
  profile: Object,
  quickActions: Array<ActionT>,
  repos: Array<RepoT>,
  search?: React.Element,
  selectedBranchId: string,
  selectedRepoId: string,
  rootTitle: string,
  secondaryActions: Array<ActionT>,
  theme: Object,
}

const ComponentLibraryHeader = ({
  branches,
  breadCrumbPath,
  bulkActions,
  onClickRepoGithub,
  onSelectRepo,
  primaryAction,
  profile,
  quickActions,
  repos,
  search,
  secondaryActions,
  selectedBranchId,
  selectedRepoId,
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
          {secondaryActions &&
            <SecondaryActions secondaryActions={secondaryActions} theme={theme} />}
          {primaryAction && <PrimaryAction primaryAction={primaryAction} theme={theme} />}
        </div>
      </View>
    </View>
  )
}

// <View {...theme.titleRow}>
//   <View {...theme.leftBlock}>
//     <Icon name="logo" size="large" {...theme.backButton} />
//     <View {...theme.separator} inline />
//     <RepoDropdown {...{ onClickRepoGithub, onSelectRepo, repos, selectedRepoId }} />
//   </View>
//   <View {...theme.rightBlock}>
//     <Actions profile={profile} search={search} theme={theme} />
//   </View>
// </View>

// <View {...theme.subtitleRow}>
//   {branches && branches.length
//     ? <BranchDropdown {...{ branches, selectedBranchId }} />
//     : null}
//   <BreadCrumb breadCrumbPath={breadCrumbPath} />
// </View>

// <View {...theme.subtitleRow}>
//   {branches && branches.length
//     ? <BranchDropdown {...{ branches, selectedBranchId }} />
//     : null}
//   <BreadCrumb breadCrumbPath={breadCrumbPath} />
// </View>

// <View {...theme.subHeaderContainer}>
//   {bulkActions &&
//     <BulkActionBar
//       numberSelected={bulkActions.numberSelected}
//       onClearSelection={bulkActions.onClearSelection}
//     >
//       {bulkActions.quickActions}
//     </BulkActionBar>}
//   {!bulkActions &&
//     <View {...theme.rightBlock}>
//       <SubHeader
//         primaryAction={primaryAction}
//         secondaryActions={secondaryActions}
//         quickActions={quickActions}
//       />
//     </View>}
// </View>

type ActionsPropsT = {
  profile: Object,
  actions: ActionsT,
  search?: React.Element,
  theme: Object,
}

const Actions = ({ profile = {}, actions = [], search, theme }: ActionsPropsT) => (
  <View {...theme.actions}>
    {search}
    {actions}
    {}
  </View>
)

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
  },
  quickActionWrapper: {
    display: 'flex',
  },
  secondaryActions: {
    display: 'flex',
    marginLeft: 24,
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
}

const primaryStyle = {
  ...Fonts.small,
  borderRadius: 0,
  height: 'auto',
  letterSpacing: 2,
}

const QuickActions = ({ quickActions = [], theme }: ActionsPropsT) => {
  if (quickActions.length < 1) return null
  return (
    <div {...theme.actions}>
      {quickActions.map((action, index) => (
        <div key={index} onClick={action.onClick} {...theme.quickActionWrapper}>
          {action}
        </div>
      ))}
    </div>
  )
}

export default Theme('ComponentLibraryHeader', defaultTheme)(ComponentLibraryHeader)
