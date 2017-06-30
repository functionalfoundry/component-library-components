/** @flow */

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { PreviewContainer } from '@workflo/components'

import ProjectPane from './ProjectPane'
import { branches, repos } from '../../../mocks/header'

storiesOf('ProjectPane', module).add('Regular', () => (
  <PreviewContainer theme={{ previewContainer: { height: 1000 } }}>
    <ProjectPane
      repos={repos}
      branches={branches}
      selectedRepoId={repos[0].id}
      selectedBranchId={branches[0].id}
      onClickRepoGithub={action('clickRepoGithub')}
      onSelectRepo={action('onSelectRepo')}
      buildStatus="Success"
    />
  </PreviewContainer>
))
