import React from 'react'
import Theme from 'js-theme'
import { find } from 'lodash'

import { Colors, Fonts, Spacing } from '@workflo/styles'
import { View, Icon, Tooltip } from '@workflo/components'

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
    }
  }
  saveRefToGithubIcon = githubIconRef => this.setState({ githubIconRef })

  render() {
    const { onClickRepoGithub, onSelectRepo, repos, selectedRepoId, theme } = this.props
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
        <View {...theme.repoTitle}>
          {selectedRepo ? selectedRepo.name : '<All Repos>'}
        </View>
        <View {...theme.caret}>▼</View>
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

const defaultTheme = {
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
}

export default Theme('RepoDropdown', defaultTheme)(RepoDropdown)
