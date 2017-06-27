import React from 'react'
import Theme from 'js-theme'
import { find } from 'lodash'

import { Colors, Fonts, Spacing } from '@workflo/styles'
import { AlignedTrigger, View } from '@workflo/components'
import List, { ListItem } from '@workflo/components/lib/List'

export type BranchT = {
  id: string,
  name: string,
}

type Props = {
  branches: Array<BranchT>,
  onSelectBranch: Function,
  selectedBranchId: string,
  theme: Object,
}

const darkHoverAndActive = ({ isKeyboardFocused, isSelected }) => {
  const base = {
    cursor: 'pointer',
    color: 'white',
    backgroundColor: Colors.grey900,
    ':hover': {
      backgroundColor: Colors.grey800,
    },
  }
  if (isKeyboardFocused) {
    return {
      ...base,
      backgroundColor: Colors.grey800,
    }
  }
  return base
}

const BranchDropdown = ({ branches, onSelectBranch, selectedBranchId, theme }: Props) => {
  const selectedBranch = find(branches, branch => branch.id === selectedBranchId)
  return (
    <AlignedTrigger
      closeTriggers={['Click outside', 'Hit Escape']}
      gravity="Bottom"
      openTriggers={['Click inside']}
      portal={({ close }) => (
        <List {...theme.dropdownPanel}>
          {branches.map(branch => (
            <ListItem
              key={branch.id}
              onClick={() => {
                if (typeof onSelectBranch === 'function') {
                  onSelectBranch(branch.id)
                }
                close()
              }}
              theme={props => ({
                listItem: darkHoverAndActive(props),
              })}
            >
              {branch.name}
            </ListItem>
          ))}
        </List>
      )}
      position="Bottom Right"
    >
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
    </AlignedTrigger>
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
  dropdownPanel: {
    maxWidth: 300,
    backgroundColor: Colors.grey900,
    border: `1px solid ${Colors.grey800}`,
    color: 'white',
    marginTop: -4,
  },
  innerContainer: {
    ...darkHoverAndActive,
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
    height: 51,
    marginRight: Spacing.small,
  },
}

export default Theme('BranchDropdown', defaultTheme)(BranchDropdown)
