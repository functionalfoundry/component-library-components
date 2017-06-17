import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ComponentLibraryHeader from './ComponentLibraryHeader'
import { Preview, PreviewContainer } from '@workflo/components'
import QuickAction from '../QuickAction'
import { profile } from '../../../mocks/profile'
import { branches, breadCrumbPath, repos } from '../../../mocks/header'

storiesOf('ComponentLibraryHeader', module).add('Regular', () => (
  <PreviewContainer flush>
    <Preview label="Regular">
      <ComponentLibraryHeaderWrapper>
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
      </ComponentLibraryHeaderWrapper>
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

class ComponentLibraryHeaderWrapper extends React.Component {
  props: { children: React.Element<*>, initialSelectedRepoId: string | number }

  constructor(props) {
    const { initialSelectedRepoId } = props
    super(props)
    this.state = {
      selectedRepoId: initialSelectedRepoId || 1,
    }
  }
  render() {
    const { children } = this.props
    return React.cloneElement(React.Children.only(children), {
      onSelectRepo: id => {
        action('onSelectRepo')(id)
        this.setState({ selectedRepoId: id })
      },
      selectedRepoId: this.state.selectedRepoId,
    })
  }
}

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
