import React from 'react'
import Theme from 'js-theme'

import { Colors, Fonts, Spacing } from '@workflo/styles'
import { View, Icon, Tooltip } from '@workflo/components'

export type RefTypeT = 'branch' | 'tag'

export type RepoT = {
  id: string,
  name: string,
  url: string,
  ref: string,
  refType: RefTypeT,
  status: 'Building' | 'Success' | 'Failed',
}

type Props = {
  repo: RepoT,
  onClickRepoGithub: Function,
  theme: Object,
}

class RepoInfo extends React.Component {
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
    const { onClickRepoGithub, repo, theme } = this.props
    if (!repo) return <div />
    return (
      <div {...theme.container}>
        {repo &&
          <Icon
            {...theme.icon}
            name="github"
            onClick={onClickRepoGithub}
            ref={this.saveRefToGithubIcon}
            theme={{
              svg: {
                width: 24,
                height: 24,
              },
            }}
          />}
        {/* Horizontal offset is for the github icon*/}
        <View {...theme.container} inline>
          <div {...theme.repoTitle}>
            {repo.name}
          </div>
        </View>
        {repo &&
          <Tooltip
            portal={
              <span {...theme.tooltip}>
                {repo.url}
              </span>
            }
            position="Bottom left"
            gravity="Bottom"
            horizontalOffset={-8}
            targetRef={this.state.githubIconRef}
          />}
      </div>
    )
  }
}
const defaultTheme = props => ({
  container: {
    alignItems: 'center',
    color: Colors.grey300,
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    cursor: 'pointer',
    ':hover': {
      fill: Colors.grey100,
    },
    ':active': {
      fill: Colors.grey200,
    },
    fill: Colors.grey300,
    marginRight: Spacing.tiny,
    paddingBottom: Spacing.pico,
  },
  repoTitle: {
    ...Fonts.base,
    color: Colors.grey300,
    flex: '0 auto',
    justifyContent: 'flex-start',
    marginBottom: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: 200,
  },
  tooltip: {
    ...Fonts.small,
  },
})

export default Theme('RepoInfo', defaultTheme)(RepoInfo)
