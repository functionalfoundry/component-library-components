import React from 'react'
import Theme from 'js-theme'
import { find } from 'lodash'

import { Colors, Fonts, Spacing } from '@workflo/styles'
import { View, Icon, Tooltip } from '@workflo/components'

type RepoT = {
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

const RepoDropdown = ({
  onClickRepoGithub,
  onSelectRepo,
  repos,
  selectedRepoId,
  theme,
}: Props) => {
  const selectedRepo = find(repos, repo => repo.id === selectedRepoId)
  return (
    <View {...theme.container}>
      <View {...theme.repoTitle}>
        {selectedRepo ? selectedRepo.name : '<All Repos>'}
      </View>
      {selectedRepo
        ? <Tooltip
            portal={<span {...theme.tooltip}>{selectedRepo.url}</span>}
            position="Bottom"
          >
            <Icon
              {...theme.icon}
              name="github"
              onClick={onClickRepoGithub}
              size="large"
            />
          </Tooltip>
        : null}
      <View {...theme.caret}>▼</View>
    </View>
  )
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
  },
  caret: {
    ':hover': {
      color: Colors.grey100,
    },
    color: Colors.grey300,
    paddingTop: Spacing.tiny,
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
    marginTop: Spacing.tiny,
  },
  tooltip: {
    ...Fonts.small,
  },
}

export default Theme('RepoDropdown', defaultTheme)(RepoDropdown)
