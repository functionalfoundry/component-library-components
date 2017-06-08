import React from 'react'
import Theme from 'js-theme'
import { View, Icon } from '@workflo/components'
import { Colors, Fonts, Spacing } from '@workflo/styles'

import { ActionT, ActionsT } from '../../types/Action'
import SubHeader from '../SubHeader'
import BulkActionBar from '../BulkActionBar'
import RepoDropdown, { type RepoT } from '../RepoDropdown'
import BranchDropdown, { type BranchT } from '../BranchDropdown'
import BreadCrumb, { type BreadCrumbSegmentT } from '../BreadCrumb'

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
      <View {...theme.titleRow}>
        <View {...theme.leftBlock}>
          <Icon name="logo" size="large" {...theme.backButton} />
          <View {...theme.separator} inline />
          <RepoDropdown {...{ onClickRepoGithub, onSelectRepo, repos, selectedRepoId }} />
        </View>
        <View {...theme.rightBlock}>
          <Actions profile={profile} search={search} theme={theme} />
        </View>
      </View>
      <View {...theme.subtitleRow}>
        {branches && branches.length
          ? <BranchDropdown {...{ branches, selectedBranchId }} />
          : null}
        <BreadCrumb breadCrumbPath={breadCrumbPath} />
      </View>
      <View {...theme.subHeaderContainer}>
        {bulkActions &&
          <BulkActionBar
            numberSelected={bulkActions.numberSelected}
            onClearSelection={bulkActions.onClearSelection}
          >
            {bulkActions.quickActions}
          </BulkActionBar>}
        {!bulkActions &&
          <View {...theme.rightBlock}>
            <SubHeader
              primaryAction={primaryAction}
              secondaryActions={secondaryActions}
              quickActions={quickActions}
            />
          </View>}
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

const Actions = ({ profile = {}, actions = [], search, theme }: ActionsPropsT) => (
  <View {...theme.actions}>
    {search}
    {actions}
    {}
  </View>
)

const SEPARATOR_MARGIN = Spacing.small

const defaultTheme = {
  actions: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: Spacing.tiny,
  },
  header: {
    display: 'flex',
    flex: '0 1 auto',
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
    alignItems: 'flex-end',
    justifyContent: 'center',
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
  subHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Colors.grey800,
    color: Colors.grey300,
    height: 56,
  },
  subtitleRow: {
    ...Fonts.large,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
    height: 80,
    justifyContent: 'flex-start',
    marginBottom: Spacing.micro,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}

export default Theme('ComponentLibraryHeader', defaultTheme)(ComponentLibraryHeader)
