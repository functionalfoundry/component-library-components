import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ErrorView from './ErrorView'
import { Preview, PreviewContainer } from '@workflo/components'

storiesOf('ErrorView', module)
  .add('Regular', () => (
    <PreviewContainer flush>
      <Preview label='Regular'>
        <ErrorView
          message='Error message'
          stacktrace='Stacktrace'
        />
      </Preview>
      <Preview label='Without props'>
        <ErrorView />
      </Preview>
    </PreviewContainer>
  ))