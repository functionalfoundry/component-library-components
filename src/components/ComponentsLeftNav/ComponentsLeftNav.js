import React from 'react'
import { TextInput, Icon } from '@workflo/components'
import List, { ListItem } from '@workflo/components/lib/List'
import { Colors, Fonts, Spacing } from '@workflo/styles'
import Animations from '@workflo/styles/lib/Animations'
import Theme from 'js-theme'
import ProjectPane from '../ProjectPane'
import HorizontalSeparator from '../HorizontalSeparator'

type Props = {
  /** Filter state to display in left nav */
  filterValue: string,
  /** Items to display in left nav */
  items: Array<{
    id: string,
    label: string,
  }>,
  /** Callback invoked when user changes filter state */
  onChangeFilter: Function,
  /** Callback invoked when user selects a component from list */
  onSelect: Function,
  /** Id of the item to show selection state for */
  selectedId: string,
}

const listTheme = {
  list: {
    backgroundColor: Colors.grey900,
    color: 'white',
  },
  listItem: {
    ':hover': {
      backgroundColor: Colors.grey800,
    },
    cursor: 'pointer',
    paddingTop: 2,
    transition: `background-color ${Animations.Timing.t2.animationDuration}s ${Animations.Eases.entrance.animationTimingFunction}`, // eslint-disable-line
  },
  selectedListItem: {
    backgroundColor: Colors.grey600,
  },
}

const darkHoverAndActive = ({ isKeyboardFocused }, isSelected) => {
  const base = {
    ...Fonts.base,
    cursor: 'pointer',
    color: 'white',
    ':hover': {
      backgroundColor: Colors.grey600,
    },
  }

  if (isKeyboardFocused) {
    return {
      ...base,
      backgroundColor: Colors.grey600,
    }
  } else if (isSelected) {
    return {
      ...base,
      backgroundColor: Colors.grey700,
    }
  }
  return base
}

class ComponentsLeftNav extends React.Component {
  props: Props
  static defaultProps = {
    filterValue: '',
    items: [],
  }

  static getSelectedIndex = ({ items, selectedId }) => {
    const selectedIndex = items.map(item => item.id).indexOf(selectedId)
    return selectedIndex === -1 ? null : selectedIndex
  }

  handleSelect = itemId => {
    const { onSelect } = this.props
    if (onSelect) {
      onSelect(itemId)
    }
  }

  render() {
    const {
      filterValue,
      items,
      onChangeFilter,
      selectedId,
      repos,
      branches,
      selectedRepoId,
      selectedBranchId,
      onClickRepoGithub,
      onSelectRepo,
      buildStatus,
      theme,
    } = this.props
    return (
      <div {...theme.componentsLeftNav}>
        <div style={{ width: '100%' }}>
          <div {...theme.titleRow}>
            <div {...theme.leftBlock}>
              <div {...theme.logoAndTitle}>
                <Icon
                  name="logo"
                  size="base"
                  theme={{
                    svg: {
                      width: 28,
                      height: 28,
                    },
                  }}
                />
                <div {...theme.separator} inline />
              </div>
              <div {...theme.rightBlock}>
                Component Library
                {/* <Actions profile={profile} search={search} theme={theme} />  */}
              </div>
            </div>
          </div>
          <div {...theme.projectPane}>
            <ProjectPane
              repos={repos}
              branches={branches}
              selectedRepoId={selectedRepoId}
              selectedBranchId={selectedBranchId}
              onClickRepoGithub={onClickRepoGithub}
              onSelectRepo={onSelectRepo}
              buildStatus={buildStatus}
            />
          </div>
          <HorizontalSeparator
            theme={{
              horizontalSeparator: {
                width: `100%`,
                // Extend to full width
                // marginLeft: -12,
                // marginRight: 12,
              },
            }}
          />
          <TextInput
            disableUnderline
            placeholder="Filter"
            onChange={onChangeFilter}
            theme={{
              inputContain: {
                backgroundColor: '#23292b',
                // borderStyle: 'solid',
                // borderWidth: 0.5,
                // borderColor: Colors.grey700,
                padding: 3,
                display: 'flex',
                flex: 1,
                maxWidth: 'none',
                width: 'auto',
              },
              textInput: {
                color: 'white',
                paddingLeft: Spacing.tiny,
                paddingRight: Spacing.tiny,
                paddingTop: 8,
                paddingBottom: 4,
                ...Fonts.small,
                '::placeholder': {
                  color: Colors.grey300,
                },
              },
              inputLabel: {
                color: Colors.grey200,
                paddingLeft: Spacing.tiny,
                paddingRight: Spacing.tiny,
              },
            }}
            value={filterValue}
          />
        </div>
        <List
          onSelect={this.handleSelect}
          selectedIndex={ComponentsLeftNav.getSelectedIndex({ items, selectedId })}
          theme={listTheme}
        >
          {items.map(item => (
            <ListItem
              key={item.id}
              onClick={() => {
                this.handleSelect(item.id)
              }}
              theme={props => ({
                listItem: darkHoverAndActive(props, item.id === selectedId),
              })}
            >
              {item.label}
            </ListItem>
          ))}

        </List>
      </div>
    )
  }
}

const SEPARATOR_MARGIN = 6

const defaultTheme = {
  componentsLeftNav: {
    backgroundColor: Colors.grey900,
    color: 'white',
    height: '100%',
    width: '100%',
  },
  titleRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: Spacing.tiny,
    height: 36,
  },
  logoAndTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  leftBlock: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    // flex: '0 1 100',
  },
  rightBlock: {
    ...Fonts.base,
    paddingTop: 4,
    fontSize: 22,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: '0 auto',
  },
  separator: {
    flex: '0 1 auto',
    // borderLeftWidth: 1,
    // borderLeftStyle: 'solid',
    // borderLeftColor: Colors.grey500,
    height: 34, // Make line-size height
    marginRight: SEPARATOR_MARGIN,
    marginLeft: SEPARATOR_MARGIN,
  },
  projectPane: {
    marginTop: Spacing.large + 4,
  },
}

export default Theme('ComponentsLeftname', defaultTheme)(ComponentsLeftNav)
