import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ComponentState from './ComponentState'
import {
  Preview,
  PreviewContainer,
} from '@workflo/components'

storiesOf('Component State', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
      >
        <ComponentState
          name='Listing Card'
          owner='Yaniv Tal'
          thumbnail='http://placehold.it/380x380'
        />
      </Preview>
    </PreviewContainer>
  ))
