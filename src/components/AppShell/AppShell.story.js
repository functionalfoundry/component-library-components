/** @flow */
import React from 'react'
import Theme from 'js-theme'

import { storiesOf, action } from '@kadira/storybook'
import { BreakPoints, Colors, Spacing } from '@workflo/styles'

import AppShell from './'
import Components from '../Components'
import ComponentLibraryHeader from '../ComponentLibraryHeader'
import ComponentsLeftNav from '../ComponentsLeftNav'
import LiveEditor from '../LiveEditor'
import Properties from '../Properties'
import {
  componentTree,
  // propKeyValues,
  dataCode,
  actionsCode,
  components,
} from '../../../mocks/components'
import { branches, breadCrumbPath, repos } from '../../../mocks/header'
import { liveViewState } from '../../../mocks/live-view'

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
    <Components components={components} />
  </div>
)

const ThemedComponentsGridContent = Theme('ComponentsGridContent', {
  container: {
    overflow: 'scroll',
    paddingLeft: Spacing.small,
    paddingTop: Spacing.small,
    [`@media(max-width: ${BreakPoints.tablet}px)`]: {
      paddingLeft: 0,
    },
  },
})(ComponentsGridContent)

storiesOf('AppShell', module)
  .add('ComponentsGrid', () => (
    <AppShell sections={{ content: <ThemedComponentsGridContent />, header, leftNav }} />
  ))
  .add('LiveView', () => (
    <AppShell sections={{ bottomPanel, header, leftPanel, rightPanel }} />
  ))
