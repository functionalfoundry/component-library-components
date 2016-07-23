import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ComponentStateCard from '.'
import {
  View,
} from '@workflo/components'

storiesOf('Component State Card', module)
  .add('Regular', () => (
    <View
      style={{ backgroundColor: '#333', width: '100%' }}
    >
      <ComponentStateCard
        name='Listing Card'
        owner='Yaniv Tal'
        thumbnail='http://placehold.it/380x380'
      />
    </View>
  ))
