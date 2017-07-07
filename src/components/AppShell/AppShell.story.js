/** @flow */
import React from 'react'
import Theme from 'js-theme'

import { storiesOf, action } from '@kadira/storybook'
import { Colors, Spacing } from '@workflo/styles'

import AppShell from './'
import Layout from '../Layout'
import ComponentStates from '../ComponentStates'
import ComponentLibraryHeader from '../ComponentLibraryHeader'
import ComponentsLeftNav from '../ComponentsLeftNav'
import LiveEditor from '../LiveEditor'
import Properties from '../Properties'
import QuickAction from '../QuickAction'
import Panel from '../Panel'
import QuickActionSelection from '../QuickActionSelection'
import QuickActionButton from '../QuickActionButton'
import PanelHeader from '../PanelHeader'
import {
  componentTree,
  // propKeyValues,
  dataCode,
  actionsCode,
} from '../../../mocks/components'
import { branches, breadCrumbPath, repos } from '../../../mocks/header'
import { liveViewState } from '../../../mocks/live-view'
import { stateCards } from '../../../mocks/componentStates'

const header = (
  <ComponentLibraryHeader
    {...{ branches, breadCrumbPath, repos }}
    selectedBranchId={1}
    selectedRepoId={1}
    quickActions={[
      <QuickActionSelection numberSelected={10} onDeselect={action('onDeselect')} />,
      <QuickActionButton icon="delete" label="Delete" onClick={action('onClick')} />,
      <QuickActionButton
        icon="duplicate"
        label="Duplicate"
        onClick={action('onClick')}
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
        showLabelInButton
      />,
      <QuickAction
        icon="theme"
        label="Theme"
        shade="Light"
        input={{
          type: 'Radio',
          value: 'Light',
          options: ['Light', 'Grey', 'Dark'],
        }}
        onClick={action('onClick')}
        showLabelInButton
      />,
    ]}
    primaryAction={{
      label: 'Share',
      icon: 'share',
      onClick: action('onShare'),
    }}
    secondaryActions={[
      {
        label: 'Cancel',
        onClick: action('onCancel'),
      },
    ]}
  />
)

const leftNav = (
  <ComponentsLeftNav
    items={[
      { id: 1, label: 'animation' },
      { id: 2, label: 'button' },
      { id: 3, label: 'card' },
    ]}
    repos={repos}
    branches={branches}
    selectedRepoId={repos[0].id}
    selectedBranchId={branches[0].id}
    onClickRepoGithub={action('clickRepoGithub')}
    onSelectRepo={action('onSelectRepo')}
    selectedId={2}
  />
)

const bottomPanel = <Properties properties={liveViewState.component.properties} />
const rightPanel = (
  <LiveEditor
    componentTree={componentTree}
    data={{ text: dataCode }}
    actions={{ text: actionsCode }}
    onChangeData={action('onChangeData')}
    onChangeActions={action('onChangeActions')}
  />
)

const leftPanel = (
  <div style={{ backgroundColor: Colors.red800, flexGrow: 1 }}>Left Panel</div>
)

const scrollableContentTheme = {
  container: {
    backgroundColor: '#f1f1f1',
    paddingLeft: Spacing.small,
    paddingRight: Spacing.small,
    paddingTop: Spacing.small,
  },
}

storiesOf('AppShell', module)
  .add('ComponentsGrid', () => (
    <AppShell
      sections={{
        content: (
          <Panel>
            <PanelHeader />
            <Layout.ScrollableContent theme={scrollableContentTheme}>
              <ComponentStates harnessCards={stateCards} />
            </Layout.ScrollableContent>
          </Panel>
        ),
        header,
        leftNav,
      }}
    />
  ))
  .add('LiveView', () => (
    <AppShell sections={{ bottomPanel, header, leftPanel, rightPanel }} />
  ))
