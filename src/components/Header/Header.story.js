import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Header from './Header'
import { Preview, PreviewContainer } from '@workflo/components'
import QuickAction from '../QuickAction'
import { profile } from '../../../mocks/profile'

storiesOf('Header', module).add('Regular', () => (
  <PreviewContainer flush>
    <Preview label="Regular">
      <Header
        {...actions}
        profile={profile}
        title={{
          value: 'Drawer',
        }}
        subtitle={{
          value: 'Collapsed',
        }}
        onClickBack={() => {}}
      />
    </Preview>
    <Preview label="With Logo">
      <Header
        profile={profile}
        title={{
          value: 'Drawer',
        }}
        subtitle={{
          value: 'Collapsed',
        }}
      />
    </Preview>
    <Preview label="With back button and search">
      <Header
        {...actions}
        profile={profile}
        title={{
          value: 'Component State',
        }}
        subtitle={{
          value: 'Collapsed',
        }}
        onClickBack={() => {}}
      />
    </Preview>
    <Preview label="Without subtitle">
      <Header
        profile={profile}
        title={{
          value: 'Drawer',
        }}
      />
    </Preview>
    <Preview label="Bulk actions">
      <Header
        profile={profile}
        title={{
          value: 'Drawer',
        }}
        bulkActions={{
          numberSelected: 3,
          onClearSelection: action('onClearSelected'),
          quickActions: [
            <QuickAction
              key="delete"
              icon="delete"
              iconKind="Primary"
              label="Delete"
              input={{
                type: 'Button',
              }}
              onClick={action('onClick')}
              showLabelInButton
            />,
          ],
        }}
      />
    </Preview>
  </PreviewContainer>
))

const actions = {
  quickActions: [
    <QuickAction
      icon="theme"
      shade="Light"
      label="Theme"
      input={{
        options: ['Light', 'Dark', 'Grey'],
        value: 'Dark',
        type: 'Radio',
      }}
    />,
    <QuickAction
      icon="alignment"
      label="Alignment"
      shade="Light"
      input={{
        type: 'Icon',
        value: 'align-left',
        options: [
          {
            name: 'align-left',
            hint: 'Left',
          },
          {
            name: 'align-center',
            hint: 'Center',
          },
          {
            name: 'align-right',
            hint: 'Right',
          },
        ],
      }}
      onClick={action('onClick')}
    />,
  ],
  secondaryActions: [
    {
      label: 'Cancel',
      onClick: action('onCancel'),
    },
  ],
  primaryAction: {
    label: 'Share',
    icon: 'share',
    onClick: action('onShare'),
  },
}
