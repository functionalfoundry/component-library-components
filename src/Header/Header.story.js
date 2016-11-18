import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Header from './Header'
import {
  View,
} from '@workflo/components'
import {
  Colors,
} from '@workflo/styles'
import { profile } from '../../mocks/profile'

storiesOf('Header', module)
  .add('Regular', () => (
    <View
      style={{ backgroundColor: Colors.steel2, width: '100%', height: '120px' }}
    >
      <Header
        profile={profile}
        title='Drawer'
        search={{
          show: true,
        }}
      />
    </View>
  ))
