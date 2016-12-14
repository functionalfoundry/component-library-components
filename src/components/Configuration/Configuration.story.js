import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import Configuration from './Configuration'

storiesOf('Configuration', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
        theme={{
          preview: {
            width: 300,
          },
        }}
      >
        <Configuration
          onChange={action('onChange')}
        />
      </Preview>
    </PreviewContainer>
  ))
