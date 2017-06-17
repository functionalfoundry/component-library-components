import React from 'react'
import Theme from 'js-theme'
import { find } from 'lodash'

import { Colors, Fonts, Spacing } from '@workflo/styles'
import { AlignedTrigger, View, Icon, Tooltip } from '@workflo/components'
import List, { ListItem } from '@workflo/components/lib/List'

export type RepoT = {
  id: string,
  name: string,
  url: string,
  status: 'Building' | 'Healthy' | 'Broken',
}

type Props = {
  onClickRepoGithub: Function,
  onSelectRepo: Function,
  repos: Array<RepoT>,
  selectedRepoId: string,
  theme: Object,
}

class RepoDropdown extends React.Component {
  props: Props
  constructor(props) {
    super(props)
    this.state = {
      githubIconRef: null,
      isOpen: false,
    }
  }
  saveRefToGithubIcon = githubIconRef => this.setState({ githubIconRef })
  saveRefToDropdownTarget = dropdownTargetRef => this.setState({ dropdownTargetRef })

  close = () => this.setState({ isOpen: false })

  render() {
    const { onClickRepoGithub, onSelectRepo, repos, selectedRepoId, theme } = this.props
    const selectedRepo = find(repos, repo => repo.id === selectedRepoId)
    if (!repos) return <div />
    return (
      <div {...theme.container}>
        {selectedRepo &&
          <Icon
            {...theme.icon}
            name="github"
            onClick={onClickRepoGithub}
            size="base"
            ref={this.saveRefToGithubIcon}
          />}
        {/* Horizontal offset is for the github icon*/}

        <AlignedTrigger
          closeTriggers={['Click outside']}
          gravity="Bottom"
          openTriggers={['Click inside']}
          portal={({ close }) => (
            <List {...theme.dropdownPanel}>
              {repos.map(repo => (
                <ListItem
                  onClick={() => {
                    if (typeof onSelectRepo === 'function') {
                      onSelectRepo(repo.id)
                    }
                    close()
                  }}
                  theme={{
                    listItem: {
                      ...darkHoverAndActive,
                    },
                  }}
                >
                  {repo.name}
                </ListItem>
              ))}
            </List>
          )}
          position="Bottom left"
        >
          <View {...theme.container} inline>
            <div
              {...theme.dropdownTarget}
              onClick={() => this.setState(prevState => ({ isOpen: !prevState.isOpen }))}
              ref={this.saveRefToDropdownTarget}
            >
              <View {...theme.repoTitle}>
                {selectedRepo ? selectedRepo.name : '<All Repos>'}
              </View>
              <View {...theme.caret}>▼</View>
            </div>
          </View>
        </AlignedTrigger>
        {selectedRepo &&
          <Tooltip
            portal={<span {...theme.tooltip}>{selectedRepo.url}</span>}
            position="Bottom left"
            gravity="Bottom"
            horizontalOffset={-8}
            targetRef={this.state.githubIconRef}
          />}
      </div>
    )
  }
}

const darkHoverAndActive = {
  cursor: 'pointer',
  color: 'white',
  backgroundColor: Colors.grey900,
  ':hover': {
    backgroundColor: Colors.grey800,
  },
  ':active': {
    backgroundColor: Colors.grey700,
  },
}

const defaultTheme = props => ({
  container: {
    alignItems: 'center',
    color: Colors.grey300,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    ':hover': {
      fill: Colors.grey100,
    },
    ':active': {
      fill: Colors.grey200,
    },
    fill: Colors.grey300,
    marginLeft: Spacing.tiny,
    marginRight: Spacing.tiny,
    paddingBottom: Spacing.pico,
  },
  caret: {
    ...Fonts.tiny,
    ':hover': {
      color: Colors.grey100,
    },
    color: Colors.grey300,
    marginLeft: Spacing.tiny,
    transform: 'scale(1, .75)',
  },
  dropdownPanel: {
    ...darkHoverAndActive,
    border: `1px solid ${Colors.grey700}`,
    // height: 100,
    width: 300,
  },
  dropdownTarget: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
  },
  repoTitle: {
    ...Fonts.large,
    ':hover': {
      color: Colors.grey100,
      textDecoration: 'underline',
    },
    color: Colors.grey300,
    flex: '0 auto',
    fontSize: 26, // TODO: FIXX
    justifyContent: 'flex-start',
    marginBottom: 0,
  },
  tooltip: {
    ...Fonts.small,
  },
})

export default Theme('RepoDropdown', defaultTheme)(RepoDropdown)
