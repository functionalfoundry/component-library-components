import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Header from './Header'
import {
  Preview,
  PreviewContainer,
} from '@workflo/components'
import { profile } from '../../../mocks/profile'

storiesOf('Header', module)
  .add('Regular', () => (
    <PreviewContainer
      flush
    >
      <Preview
        label='Regular'
      >
        <Header
          {...actions}
          profile={profile}
          title='Drawer'
          subtitle='Collapsed'
          onClickBack={() => {}}
          search={{
            show: true,
          }}
        />
      </Preview>
      <Preview
        label='With Logo'
      >
        <Header
          profile={profile}
          title='Drawer'
          subtitle='Collapsed'
        />
      </Preview>
      <Preview
        label='With back button and search'
      >
        <Header
          {...actions}
          profile={profile}
          title='Component State'
          subtitle='Collapsed'
          onClickBack={() => {}}
          search={{
            show: true,
          }}
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

const actions = {
  quickActions: [
    {
      icon: 'card-like',
      onClick: action('onLike'),
    },
  ],
  secondaryActions: [
    {
      label: 'Cancel',
      onClick: action('onCancel'),
    },
  ],
  primaryAction: {
    label: 'Save',
    onClick: action('onSave'),
  }
}
