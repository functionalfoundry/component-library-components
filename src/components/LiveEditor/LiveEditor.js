import React from 'react'
import Theme from 'js-theme'
import { Tab, TabList, TabPanel, Tabs, View } from '@workflo/components'
import { Colors, Spacing } from '@workflo/styles'
import ComponentTreeEditor from '../ComponentTreeEditor'
import Data from '../Data'
import type { CompletionDataT } from '../../utils/CompositeComponents/Completion'

const TreeUtils = require('../../utils/CompositeComponents/ComponentTreeUtils')

type DataT = {
  /* Passed in on initial load to seed the editor state */
  text: string,
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
  dataState: any,
  actionsState: any,
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
      dataState: null,
      actionsState: null,
    }
  }

  handleSelect = index => this.setState({ selectedIndex: index })

  handleTreeChange = tree => {
    const { onChangeComponentTree } = this.props
    const rawTreeData = TreeUtils.getRawTreeData(tree)
    onChangeComponentTree && onChangeComponentTree(rawTreeData)
  }

  handleRemoveProp = nodeId => {
    this.props.onRemoveProp && this.props.onRemoveProp(nodeId)
  }

  handleChangePropValue = (nodeId, value) => {
    this.props.onChangePropValue && this.props.onChangePropValue(nodeId, value)
  }

  handleChangeData = dataState => {
    this.setState({ dataState })
  }

  handleChangeActions = actionsState => {
    this.setState({ actionsState })
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
      onChangePropValue,
      onInsertComponent,
      onRemoveComponent,
      onRemoveProp,
      onSelectComponent,
      selectedTabIndex, // eslint-disable-line no-unused-vars
      shouldAnimateDataEditor,
      theme,
    } = this.props
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
              tree={TreeUtils.createTree(componentTree)}
              completionData={completionData}
              nodeIdGenerator={nodeIdGenerator}
              onChange={this.handleTreeChange}
              onChangeComponentName={onChangeComponentName}
              onChangePropValue={onChangePropValue}
              onInsertComponent={onInsertComponent}
              onRemoveProp={onRemoveProp}
              onRemoveComponent={onRemoveComponent}
              onSelectComponent={onSelectComponent}
            />
          </TabPanel>
          <TabPanel>
            <Data
              state={this.state.dataState}
              text={data.text}
              onChange={onChangeData}
              onChangeState={this.handleChangeData}
              shouldAnimate={shouldAnimateDataEditor}
            />
          </TabPanel>
          <TabPanel>
            <Data
              state={this.state.actionsState}
              text={actions.text}
              onChange={onChangeActions}
              onChangeState={this.handleChangeActions}
            />
          </TabPanel>
        </Tabs>
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
  },
  liveEditorTabs: {},
}

export default Theme('LiveEditor', defaultTheme)(LiveEditor)
