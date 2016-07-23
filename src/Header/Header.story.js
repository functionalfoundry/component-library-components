import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Header from './Header'
import {
  View,
} from '@workflo/components'
import {
  Colors,
} from '@workflo/styles'

storiesOf('Header', module)
  .add('Regular', () => (
    <View
      style={{ backgroundColor: Colors.steel2, width: '100%', height: '120px' }}
    >
      <Header
        name='Listing Card'
        owner='Yaniv Tal'
        thumbnail='http://placehold.it/380x380'
      />
    </View>
  ))
