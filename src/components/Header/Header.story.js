import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Header from './Header'
import {
  Preview,
  PreviewContainer,
} from '@workflo/components'
import QuickAction from '../QuickAction'
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
          title={{
            value: 'Drawer',
          }}
          subtitle={{
            value: 'Collapsed',
          }}
          onClickBack={() => {}}

        />
      </Preview>
      <Preview
        label='With Logo'
      >
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
      <Preview
        label='With back button and search'
      >
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
      <Preview
        label='Without subtitle'
      >
        <Header
          profile={profile}
          title={{
            value: 'Drawer',
          }}
        />
      </Preview>
      <Preview
        label='Bulk actions'
      >
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
                icon='delete'
                iconKind='Primary'
                label='Delete'
                input={{
                  type: 'Button',
                }}
                onClick={action('onClick')}
                showLabelInButton
              />
            ],
          }}
        />
      </Preview>
    </PreviewContainer>
  ))

const actions = {
  quickActions: [
    <QuickAction
      icon='card-like'
      input={{
        type: 'Radio',
        options: [
          'Left',
          'Center',
          'Right',
        ],
        value: 'Center',
      }}
      onChange={action('onChange alignment')}
    />,
    <QuickAction
      icon='card-like-hover'
      input={{
        type: 'Radio',
        options: [
          'Small',
          'Base',
          'Large',
        ],
        value: 'Base',
      }}
      onChange={action('onChange size')}
    />,
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
