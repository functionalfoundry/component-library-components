import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ComponentStateCard from './ComponentStateCard'
import {
  Preview,
  PreviewContainer,
  View,
} from '@workflo/components'

storiesOf('Component State Card', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
      >
        <ComponentStateCard
          name='Listing Card'
          owner='Yaniv Tal'
          thumbnail='http://placehold.it/380x380'
        />
      </Preview>
    </PreviewContainer>
  ))
