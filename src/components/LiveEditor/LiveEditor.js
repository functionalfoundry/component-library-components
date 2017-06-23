import React from 'react'
import Theme from 'js-theme'
import { Tab, TabList, TabPanel, Tabs, View } from '@workflo/components'
import { Colors, Spacing, Fonts } from '@workflo/styles'
import Slate from 'slate'
import CopyToClipboard from 'react-copy-to-clipboard'
import ComponentTreeEditor from '../ComponentTreeEditor'
import {
  generateTreeLayout,
  generateTreeLayoutMarkup,
} from '../ComponentTreeEditor/utils/ComponentTreeLayout'
import Data from '../Data'
import type { CompletionDataT } from '../../utils/CompositeComponents/Completion'

import { Helpers as TreeHelpers } from '../../modules/ComponentTree'

type DataT = {
  /* Passed in on initial load to seed the editor state */
  text: string,
  state?: ?Slate.State,
}

type PropsT = {
  actions: DataT,
  completionData?: CompletionDataT,
  componentTree: Object,
  data: DataT,
  nodeIdGenerator: Function,
  onChangeActions: Function,
  onChangeComponentName?: Function,
  onChangeComponentTree?: Function,
  onChangeData: Function,
  onChangePropName?: Function,
  onChangePropValue?: Function,
  onInsertComponent?: Function,
  onRemoveComponent?: Function,
  onRemoveProp?: Function,
  onSelectComponent?: Function,
  /**
   * Index of the selected tab.
   */
  selectedTabIndex?: ?number,
  /**
   * If set to true the contents of the Data editor will animate onto the screen
   * as if typed.
   */
  shouldAnimateDataEditor: boolean,
  theme: any,
}

const defaultProps = {
  onChangeData: () => {},
  onChangeActions: () => {},
  data: {
    text: '',
  },
  actions: {
    text: '',
  },
}

type StateT = {
  selectedIndex: number,
  markup: string,
}

class LiveEditor extends React.Component {
  props: PropsT
  state: StateT

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: props.selectedTabIndex !== undefined &&
        props.selectedTabIndex !== null
        ? props.selectedTabIndex
        : 0,
      copied: false,
      markup: '',
    }
  }

  handleSelect = index => this.setState({ selectedIndex: index })

  handleTreeChange = tree => {
    const { onChangeComponentTree } = this.props
    const rawTreeData = TreeHelpers.getRawTreeData(tree)
    onChangeComponentTree && onChangeComponentTree(rawTreeData)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTabIndex !== undefined && nextProps.selectedTabIndex !== null) {
      this.setState({ selectedIndex: nextProps.selectedTabIndex })
    }
  }

  render() {
    const {
      actions,
      completionData,
      componentTree,
      data,
      nodeIdGenerator,
      onChangeActions,
      onChangeComponentName,
      onChangeComponentTree, // eslint-disable-line no-unused-vars
      onChangeData,
      onChangePropName,
      onChangePropValue,
      onInsertComponent,
      onRemoveComponent,
      onRemoveProp,
      onSelectComponent,
      selectedTabIndex, // eslint-disable-line no-unused-vars
      shouldAnimateDataEditor,
      theme,
    } = this.props
    const { copied } = this.state

    const properTree = TreeHelpers.createTree(componentTree)
    const treeLayout = generateTreeLayout(properTree)
    const treeMarkup = generateTreeLayoutMarkup(treeLayout)

    return (
      <View {...theme.liveEditor} data-walkthrough-id="live-editor">
        <Tabs
          onSelect={this.handleSelect}
          selectedIndex={this.state.selectedIndex}
          {...theme.liveEditorTabs}
        >
          <TabList>
            {/* TODO: Rename Code -> Markup in code */}
            <Tab data-walkthrough-id="markup-tab">Markup</Tab>
            <Tab data-walkthrough-id="data-tab">Data</Tab>
            <Tab data-walkthrough-id="actions-tab">Actions</Tab>
          </TabList>
          <TabPanel>
            <ComponentTreeEditor
              tree={properTree}
              layout={treeLayout}
              markup={treeMarkup}
              completionData={completionData}
              nodeIdGenerator={nodeIdGenerator}
              onChange={this.handleTreeChange}
              onChangeComponentName={onChangeComponentName}
              onChangePropName={onChangePropName}
              onChangePropValue={onChangePropValue}
              onInsertComponent={onInsertComponent}
              onRemoveProp={onRemoveProp}
              onRemoveComponent={onRemoveComponent}
              onSelectComponent={onSelectComponent}
            />
          </TabPanel>
          <TabPanel>
            <Data
              state={data.state}
              text={data.text}
              onChange={onChangeData}
              shouldAnimate={shouldAnimateDataEditor}
            />
          </TabPanel>
          <TabPanel>
            <Data state={actions.state} text={actions.text} onChange={onChangeActions} />
          </TabPanel>
        </Tabs>
        <CopyToClipboard
          text={treeMarkup}
          onCopy={() => {
            this.setState({ copied: true })
            setTimeout(() => {
              this.setState({ copied: false })
            }, 1100)
          }}
        >
          <div {...theme.copy}>
            {!copied ? 'Copy' : 'Copied!'}
          </div>
        </CopyToClipboard>
      </View>
    )
  }
}

const defaultTheme = {
  liveEditor: {
    padding: Spacing.small,
    paddingTop: Spacing.base + Spacing.tiny,
    backgroundColor: 'white',
    color: Colors.grey600,
    overflowY: 'scroll',
    flex: '1 1 auto',
    position: 'relative',
  },
  liveEditorTabs: {},
  copy: {
    ...Fonts.small,
    fontWeight: 400,
    position: 'absolute',
    top: Spacing.base,
    right: Spacing.small,
    color: '#00719e',
    cursor: 'pointer',
  },
}

export default Theme('LiveEditor', defaultTheme)(LiveEditor)
