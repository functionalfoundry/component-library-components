import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ComponentLibraryHeader from './ComponentLibraryHeader'
import { Preview, PreviewContainer } from '@workflo/components'
import QuickAction from '../QuickAction'
import { profile } from '../../../mocks/profile'

const breadCrumbPath = [
  {
    onClick: () => action('Navigate to Components')(),
    value: 'Components',
  },
  {
    onClick: () => action('Navigate to ButtonGroup')(),
    value: 'ButtonGroup',
  },
  {
    onChange: (...args) => action('Changed Example Name:')(...args),
    onStartEdit: () => action('Started Editing')(),
    onStopEdit: () => action('Stopped Editing')(),
    editable: true,
    value: 'With Two Buttons',
  },
]

const branches = [
  {
    id: 1,
    name: 'master',
  },
  {
    id: 2,
    name: 'develop',
  },
]

const repos = [
  {
    id: 1,
    name: 'components-library-components',
    url: 'https://github.com/workfloapp/component-library-components',
    status: 'Healthy',
  },
  {
    id: 2,
    name: 'components',
    url: 'https://github.com/workfloapp/components',
    status: 'Healthy',
  },
  {
    id: 3,
    name: 'example-library',
    url: 'https://github.com/workfloapp/example-library',
    status: 'Healthy',
  },
]

storiesOf('ComponentLibraryHeader', module).add('Regular', () => (
  <PreviewContainer flush>
    <Preview label="Regular">
      <ComponentLibraryHeader
        {...actions}
        branches={branches}
        breadCrumbPath={breadCrumbPath}
        onClickRepoGithub={id => action('onClickRepoGithub')(id)}
        profile={profile}
        title={{
          value: 'Drawer',
        }}
        repos={repos}
        selectedBranchId={1}
        selectedRepoId={1}
        subtitle={{
          value: 'Collapsed',
        }}
        onClickBack={() => {}}
      />
    </Preview>
    <Preview label="With Logo">
      <ComponentLibraryHeader
        breadCrumbPath={breadCrumbPath.slice(0, -1)}
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
      <ComponentLibraryHeader
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
      <ComponentLibraryHeader
        profile={profile}
        title={{
          value: 'Drawer',
        }}
      />
    </Preview>
    <Preview label="Bulk actions">
      <ComponentLibraryHeader
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
