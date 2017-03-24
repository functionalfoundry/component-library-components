/** @flow */
'use strict'

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import { PreviewContainer } from '@workflo/components'

import RepositoryChooser from './RepositoryChooser'

const repositories = [
  { id: 1, name: 'Repository 1', description: 'The first example repository' },
  { id: 2, name: 'Repository 2', description: 'The second example repository' },
]

storiesOf('RepositoryChooser', module)
  .add('Regular', () => (
    <PreviewContainer>
      <RepositoryChooser
        onBack={action('onBack')}
        onChange={action('onChange')}
        onContinue={action('onContinue')}
        repositories={repositories}
      />
    </PreviewContainer>
  ))
  .add('Repository selected', () => (
    <PreviewContainer>
      <RepositoryChooser
        onBack={action('onBack')}
        onChange={action('onChange')}
        onContinue={action('onContinue')}
        repositories={repositories}
        selectedIds={[2]}
      />
    </PreviewContainer>
  ))
