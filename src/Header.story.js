import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Header from './Header'
import {
  Preview,
  PreviewContainer,
} from '@workflo/components'
import { profile } from '../mocks/profile'

storiesOf('Header', module)
  .add('Regular', () => (
    <PreviewContainer
      flush
    >
      <Preview
        label='Regular'
      >
        <Header
          profile={profile}
          title='Drawer'
          subtitle='Collapsed'
        />
      </Preview>
      <Preview
        label='With back button'
      >
        <Header
          profile={profile}
          title='Drawer'
          subtitle='Collapsed'
          onClickBack={() => {}}
        />
      </Preview>
      <Preview
        label='With back button and search'
      >
        <Header
          profile={profile}
          title='Drawer'
          subtitle='Collapsed'
          onClickBack={() => {}}
          search={{
            show: true,
          }}
          subHeaderActions={[
            {
              icon: 'add',
            },
            {
              icon: 'card-like',
            },
            {
              icon: 'layout',
            },
          ]}
        />
      </Preview>
      <Preview
        label='Without subtitle'
      >
        <Header
          profile={profile}
          title='Drawer'
        />
      </Preview>
    </PreviewContainer>
  ))
