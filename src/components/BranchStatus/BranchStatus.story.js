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
      <BranchStatus status="Failed" />
    </Preview>
    <Preview label="Building">
      <BranchStatus status="Building" />
    </Preview>
  </PreviewContainer>
))
