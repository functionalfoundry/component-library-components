import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ErrorView from './ErrorView'
import { Preview, PreviewContainer } from '@workflo/components'

storiesOf('ErrorView', module).add('Regular', () => (
  <PreviewContainer>
    <Preview label="Regular">
      <div style={{ display: 'flex' }}>
        <ErrorView message="Error message" stacktrace="Stacktrace" />
      </div>
    </Preview>
    <Preview label="Without props">
      <div style={{ display: 'flex' }}>
        <ErrorView />
      </div>
    </Preview>
  </PreviewContainer>
))
