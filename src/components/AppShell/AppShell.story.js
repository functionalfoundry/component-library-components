/** @flow */
import React from 'react'
import Theme from 'js-theme'

import { storiesOf, action } from '@kadira/storybook'
import { BreakPoints, Colors, Spacing } from '@workflo/styles'

import AppShell from './'
import ComponentStates from '../ComponentStates'
import ComponentLibraryHeader from '../ComponentLibraryHeader'
import ComponentsLeftNav from '../ComponentsLeftNav'
import LiveEditor from '../LiveEditor'
import Properties from '../Properties'
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
  />
)

const leftNav = (
  <ComponentsLeftNav
    items={[
      { id: 1, label: 'animation' },
      { id: 2, label: 'button' },
      { id: 3, label: 'card' },
    ]}
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

const ComponentsGridContent = ({ theme }: any) => (
  <div {...theme.container}>
    <ComponentStates harnessCards={stateCards} />
  </div>
)

const ThemedComponentsGridContent = Theme('ComponentsGridContent', {
  container: {
    backgroundColor: '#f1f1f1',
    overflow: 'scroll',
    paddingLeft: Spacing.small,
    paddingRight: Spacing.small,
    paddingTop: Spacing.small,
  },
})(ComponentsGridContent)

storiesOf('AppShell', module)
  .add('ComponentsGrid', () => (
    <AppShell sections={{ content: <ThemedComponentsGridContent />, header, leftNav }} />
  ))
  .add('LiveView', () => (
    <AppShell sections={{ bottomPanel, header, leftPanel, rightPanel }} />
  ))
