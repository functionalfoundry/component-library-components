import React from 'react'
import Theme from 'js-theme'
import { find } from 'lodash'

import { Colors, Fonts, Spacing } from '@workflo/styles'
import { Align, List, View, Icon, Tooltip, Trigger } from '@workflo/components'

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
  handleSelectRepo = index => {
    const { onSelectRepo, repos } = this.props
    const newSelectedRepo = repos[index]
    if (typeof onSelectRepo === 'function') {
      onSelectRepo(newSelectedRepo.id)
    }
    this.close()
  }

  close = () => this.setState({ isOpen: false })

  render() {
    const { onClickRepoGithub, repos, selectedRepoId, theme } = this.props
    const selectedRepo = find(repos, repo => repo.id === selectedRepoId)
    return (
      <View {...theme.container}>
        {selectedRepo &&
          <Icon
            {...theme.icon}
            name="github"
            onClick={onClickRepoGithub}
            size="base"
            ref={this.saveRefToGithubIcon}
          />}
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
        <Align
          isOpen={this.state.isOpen}
          portal={
            <Trigger triggerOn={['Click outside']} onTrigger={this.close}>
              <View {...theme.dropdownPanel}>
                <List
                  data={repos ? repos.map(repo => repo.name) : []}
                  isKeyboardFocused={this.state.isOpen}
                  onSelect={this.handleSelectRepo}
                />
              </View>
            </Trigger>
          }
          gravity="Bottom"
          position="Bottom Left"
          targetRef={this.state.dropdownTargetRef}
        />
        {selectedRepo &&
          <Tooltip
            portal={<span {...theme.tooltip}>{selectedRepo.url}</span>}
            position="Bottom"
            targetRef={this.state.githubIconRef}
          />}
      </View>
    )
  }
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
    backgroundColor: 'white',
    height: 100,
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
