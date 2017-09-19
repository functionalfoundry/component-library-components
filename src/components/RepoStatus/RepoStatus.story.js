/** @flow */
'use strict'

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import { PreviewContainer } from '@workflo/components'

import RepoStatus from './RepoStatus'

storiesOf('RepoStatus', module).add('Regular', () =>
  <PreviewContainer>
    <Preview label="Success">
      <RepoStatus status="Success" />
    </Preview>
    <Preview label="Failed">
      <RepoStatus
        status="Failed"
        error={`ERROR in ./src/components/RepoStatus/RepoStatus.js
Module build failed: SyntaxError: Unexpected token, expected { (27:4)
Another line
Another line
Another line
Another line
Line
Line
Line
Line
Line
Line
Line`}
      />
    </Preview>
    <Preview label="Building">
      <RepoStatus status="Building" onIconClick={action('onIconClick')} />
    </Preview>
    <Preview label="SetupRequired">
      <RepoStatus status="SetupRequired" onIconClick={action('onIconClick')} />
    </Preview>
  </PreviewContainer>
)
