/** @flow */

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { PreviewContainer } from '@workflo/components'

import RepoPane from './RepoPane'
import { repo } from '../../../mocks/header'

storiesOf('RepoPane', module).add('Regular', () =>
  <PreviewContainer theme={{ previewContainer: { height: 1000 } }}>
    <RepoPane repo={repo} onClickRepoGithub={action('clickRepoGithub')} />
  </PreviewContainer>
)
