/** @flow */
'use strict'

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import { PreviewContainer } from '@workflo/components'

import BranchStatus from './BranchStatus'

storiesOf('BranchStatus', module).add('Regular', () => (
  <PreviewContainer>
    <Preview label="Success">
      <BranchStatus status="Success" />
    </Preview>
    <Preview label="Failed">
      <BranchStatus
        status="Failed"
        error={`ERROR in ./src/components/BranchStatus/BranchStatus.js
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
      <BranchStatus status="Building" onIconClick={action('onIconClick')} />
    </Preview>
    <Preview label="SetupRequired">
      <BranchStatus status="SetupRequired" onIconClick={action('onIconClick')} />
    </Preview>
  </PreviewContainer>
))
