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
  /** All branches to display in the dropdown */
  branches: Array<BranchT>,
  /* Called when a branch is selected */
  onSelectBranch: Function,
  /* The ID of the selected branch */
  selectedBranchId: string,
  /* The JS Theme */
  theme: Object,
}

const darkHoverAndActive = ({ isKeyboardFocused, isSelected }) => {
  const base = {
    ...Fonts.small,
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
          <View {...theme.branch}>{selectedBranch ? selectedBranch.name : null}</View>
          <View {...theme.caret}>▼</View>
        </View>
      </View>
    </AlignedTrigger>
  )
}

const defaultTheme = {
  branch: {
    ...Fonts.small,
  },
  caret: {
    ...Fonts.tiny,
    ':hover': {
      color: Colors.grey100,
    },
    color: Colors.grey300,
    paddingLeft: 2,
    paddingTop: 2,
    marginLeft: Spacing.tiny,
    transform: 'scale(.8, .6)',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
    // height: 60,
    cursor: 'pointer',
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
