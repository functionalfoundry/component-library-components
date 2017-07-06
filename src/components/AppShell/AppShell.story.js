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
      <QuickAction
        key="delete"
        icon="delete"
        iconKind="Secondary"
        label="Delete"
        input={{
          type: 'Button',
        }}
        shade="Light"
        onClick={action('onClick')}
        showLabelInButton
      />,
    ]}
    secondaryActions={[
      <QuickAction
        key="delete"
        icon="delete"
        iconKind="Secondary"
        label="Delete"
        input={{
          type: 'Button',
        }}
        shade="Light"
        onClick={action('onClick')}
        showLabelInButton
      />,
      <QuickAction
        key="delete"
        icon="delete"
        iconKind="Secondary"
        label="Delete"
        input={{
          type: 'Button',
        }}
        shade="Light"
        onClick={action('onClick')}
        showLabelInButton
      />,
    ]}
    primaryAction={{
      label: 'Share',
      icon: 'share',
      onClick: action('onShare'),
    }}
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
    buildStatus="Success"
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
          <Layout.ScrollableContent theme={scrollableContentTheme}>
            <ComponentStates harnessCards={stateCards} />
          </Layout.ScrollableContent>
        ),
        header,
        leftNav,
      }}
    />
  ))
  .add('LiveView', () => (
    <AppShell sections={{ bottomPanel, header, leftPanel, rightPanel }} />
  ))
