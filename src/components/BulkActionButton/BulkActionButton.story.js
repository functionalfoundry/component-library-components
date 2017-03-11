import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import BulkActionButton from './BulkActionButton'

storiesOf('BulkActionButton', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
      >
        <BulkActionButton
          icon='duplicate'
          label='Duplicate'
        />
        <BulkActionButton
          icon='theme'
          label='Theme'
        />
      </Preview>
    </PreviewContainer>
  ))
