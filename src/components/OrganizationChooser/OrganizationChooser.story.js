/** @flow */
'use strict'

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import { PreviewContainer } from '@workflo/components'

import OrganizationChooser from './OrganizationChooser'

const organizations = [
  { id: 1, name: 'Organization 1' },
  { id: 2, name: 'Organization 2' },
]

storiesOf('OrganizationChooser', module)
  .add('Regular', () => (
    <PreviewContainer>
      <OrganizationChooser
        onChange={action('onChange')}
        organizations={organizations}
      />
    </PreviewContainer>
  ))
  .add('Organization selected', () => (
    <PreviewContainer>
      <OrganizationChooser
        onChange={action('onChange')}
        organizations={organizations}
        selectedId={2}
      />
    </PreviewContainer>
  ))