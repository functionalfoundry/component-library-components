import React from 'react'
import Theme from 'js-theme'
import { find } from 'lodash'

import { Colors, Fonts, Spacing } from '@workflo/styles'
import { View } from '@workflo/components'

type BranchT = {
  id: string,
  name: string,
}

type Props = {
  branches: Array<BranchT>,
  onSelectBranch: Function,
  selectedBranchId: string,
  theme: Object,
}

const BranchDropdown = ({ branches, onSelectBranch, selectedBranchId, theme }: Props) => {
  const selectedBranch = find(branches, branch => branch.id === selectedBranchId)
  return (
    <View {...theme.container} inline>
      <View {...theme.innerContainer}>
        <View {...theme.leftBlock}>
          <View {...theme.label}>
            {'CURRENT BRANCH'}
          </View>
          <View {...theme.branch}>{selectedBranch ? selectedBranch.name : null}</View>
        </View>
        <View {...theme.caret}>▼</View>
      </View>
      <View {...theme.separator} inline />
    </View>
  )
}

const defaultTheme = {
  branch: {
    ...Fonts.base,
  },
  caret: {
    ...Fonts.tiny,
    ':hover': {
      color: Colors.grey100,
    },
    color: Colors.grey300,
    paddingLeft: Spacing.small,
    paddingTop: Spacing.tiny,
    marginLeft: Spacing.tiny,
    transform: 'scale(1, .75)',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
    height: 60,
  },
  innerContainer: {
    ':hover': {
      backgroundColor: Colors.grey700,
    },
    ':active': {
      backgroundColor: Colors.grey600,
    },
    cursor: 'pointer',
    paddingTop: Spacing.micro,
    paddingBottom: Spacing.micro,
    paddingLeft: Spacing.tiny,
    paddingRight: Spacing.tiny,
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    ...Fonts.tiny,
    color: Colors.grey400,
  },
  leftBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  separator: {
    flex: '0 1 auto',
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: Colors.grey500,
    height: 40,
    marginRight: Spacing.small,
  },
}

export default Theme('BranchDropdown', defaultTheme)(BranchDropdown)
