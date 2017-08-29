/** @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'

import { storiesOf, action } from '@kadira/storybook'
import { Colors, Spacing } from '@workflo/styles'

import AppShell from './'
import Layout from '../Layout'
import ComponentStates from '../ComponentStates'
import ComponentLibraryHeader from '../ComponentLibraryHeader'
import ComponentsLeftNav from '../ComponentsLeftNav'
import LiveEditor from '../LiveEditor'
import MultiPropertiesTable from '../MultiPropertiesTable'
import QuickAction from '../QuickAction'
import Panel from '../Panel'
import QuickActionSelection from '../QuickActionSelection'
import QuickActionButton from '../QuickActionButton'
import PanelHeader from '../PanelHeader'
import PanelContent from '../PanelContent'
import PanelToolbar from '../PanelToolbar'
import {
  componentTree,
  fullComponentTree,
  components,
  // propKeyValues,
  dataCode,
  actionsCode,
} from '../../../mocks/components'
import { branches, breadCrumbPath, repos } from '../../../mocks/header'
import { liveViewState } from '../../../mocks/live-view'
import { stateCards } from '../../../mocks/componentStates'
import {
  exampleBundles,
  rawExampleTree as rawPurpleExampleTree,
} from '../ComponentState/ComponentState.story'

import LiveCanvas from '../LiveCanvas'
import Components from '../Components'
import { BADGE_URL, LOADER_URL, SLIDER_URL, rawExampleTree } from '../Frame/Frame.story'
import LivePreview from '../LivePreview'

const header = (
  <ComponentLibraryHeader
    {...{ branches, breadCrumbPath, repos }}
    selectedBranchId={1}
    selectedRepoId={1}
    quickActions={[
      <QuickActionButton icon="delete" label="Delete" onClick={action('onClick')} />,
      <QuickActionButton
        icon="duplicate"
        label="Duplicate"
        onClick={action('onClick')}
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
      { id: 4, label: 'Align' },
      { id: 5, label: 'AutoSizer' },
      { id: 6, label: 'AutoSuggestPresentation' },
      { id: 7, label: 'AutoSuggest' },
      { id: 8, label: 'Avatar' },
      { id: 9, label: 'CardContainer' },
      { id: 10, label: 'CellMeasurer' },
      { id: 11, label: 'Checkbox' },
      { id: 12, label: 'EditableText' },
      { id: 13, label: 'FilledTextInput' },
      { id: 14, label: 'Grid' },
      { id: 15, label: 'Heading' },
      { id: 16, label: 'HoverIcon' },
      { id: 17, label: 'Icon' },
      { id: 18, label: 'IconButtonGroup' },
      { id: 19, label: 'Image' },
      { id: 20, label: 'ListItem' },
      { id: 21, label: 'MultiSizeGrid' },
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

const bottomPanel = (
  <MultiPropertiesTable
    components={[
      {
        id: '1',
        name: 'FirstComponent',
        properties: liveViewState.component.properties,
      },
    ]}
  />
)
const rightPanel = (
  <LiveEditor
    componentTree={fullComponentTree}
    completionData={{ components: [], props: [] }}
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

const sliderTree = {
  id: 'slider',
  name: 'Slider',
  props: [],
}

class LiveCanvasContainer extends React.Component {
  constructor(props) {
    super()
    this.state = {
      bundle: '',
      zoom: props.zoom,
    }
  }

  handleChangeZoom = zoom => {
    this.setState(() => ({
      zoom,
    }))
  }

  render() {
    const { bundle, zoom, panX, panY } = this.state

    return (
      <LiveCanvas
        zoom={zoom}
        onChangeZoom={this.handleChangeZoom}
        panX={panX}
        panY={panY}
      >
        <Components components={components} />
      </LiveCanvas>
    )
  }
}

class FetchAndRender extends React.Component {
  constructor() {
    super()
    this.state = {
      badge: null,
      loader: null,
      slider: null,
      zoom: 100,
    }
  }

  handleChangeZoom = zoom => {
    this.setState(() => ({
      zoom,
    }))
  }

  fetchBadge = () => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.setState({ badge: xhr.responseText })
      }
    }
    xhr.open('GET', BADGE_URL, true)
    xhr.send()
  }

  fetchLoader = () => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.setState({ loader: xhr.responseText })
      }
    }
    xhr.open('GET', LOADER_URL, true)
    xhr.send()
  }

  fetchSlider = () => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.setState({ slider: xhr.responseText })
      }
    }
    xhr.open('GET', SLIDER_URL, true)
    xhr.send()
  }

  componentWillMount() {
    this.fetchBadge()
    this.fetchLoader()
    this.fetchSlider()
  }

  render() {
    const { badge, loader, slider, zoom } = this.state
    const { isFullscreen, error } = this.props
    return (
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        <LivePreview
          name="frame-1"
          tree={rawPurpleExampleTree}
          bundles={{ ...exampleBundles, badge, loader, slider }}
          React={React}
          ReactDOM={ReactDOM}
          alignment={{
            horizontal: 'Center',
            vertical: 'Center',
          }}
          zoom={zoom}
          onChangeZoom={this.handleChangeZoom}
          error={error}
          isFullscreen={isFullscreen}
        />
      </div>
    )
  }
}

const LiveView = ({ isFullscreen }) => {
  return (
    <AppShell
      isFullscreen={isFullscreen}
      sections={{
        bottomPanel,
        header,
        leftNav,
        content: <FetchAndRender isFullscreen={isFullscreen} />,
        contentPanelHeader: (
          <PanelToolbar align="Right">
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
              paddingBottom={16}
              showLabelInButton
            />
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
              paddingBottom={16}
              showLabelInButton
            />
          </PanelToolbar>
        ),
        rightPanel: (
          <Panel
            header={
              <PanelHeader showLeftBorder>
                <PanelToolbar align="Left">Editor</PanelToolbar>
              </PanelHeader>
            }
            content={
              <PanelContent>
                {rightPanel}
              </PanelContent>
            }
          />
        ),
      }}
    />
  )
}

storiesOf('AppShell', module)
  .add('ComponentsGrid', () =>
    <AppShell
      sections={{
        content: (
          <Panel header={<PanelHeader />}>
            <Layout.ScrollableContent theme={scrollableContentTheme}>
              <ComponentStates harnessCards={stateCards} />
            </Layout.ScrollableContent>
          </Panel>
        ),
        header,
        leftNav,
      }}
    />
  )
  .add('LiveView', () => <LiveView />)
  .add('Fullscreen', () => <LiveView isFullscreen />)
