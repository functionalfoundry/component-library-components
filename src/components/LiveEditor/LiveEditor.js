import React from 'react'
import Theme from 'js-theme'
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  View,
} from '@workflo/components'
import {
  Colors,
  Spacing,
} from '@workflo/styles'
import ComponentTreeEditor from '../ComponentTreeEditor'
import Data from '../Data'
import type { CompletionDataT } from '../../utils/CompositeComponents/Completion'

const TreeUtils = require('../../utils/CompositeComponents/ComponentTreeUtils')

type DataT = {
  /* Passed in on initial load to seed the editor state */
  text: string,
}

type PropsT = {
  nodeIdGenerator: Function,
  onChangeComponentTree?: Function,
  onRemoveProp?: Function,
  onRemoveComponent?: Function,
  onInsertComponent?: Function,
  onChangePropValue?: Function,
  onChangeComponentName?: Function,
  onSelectComponent?: Function,
  onChangeData: Function,
  onChangeActions: Function,
  componentTree: Object,
  completionData?: CompletionDataT,
  data: DataT,
  actions: DataT,
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
  data: any,
  actions: any,
}

class LiveEditor extends React.Component {
  props: PropsT
  state: StateT

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      dataState: null,
      actionsState: null,
    }
  }

  handleSelect = (index) => this.setState({ selectedIndex: index })

  handleTreeChange = (tree) => {
    const { onChangeComponentTree } = this.props
    const rawTreeData = TreeUtils.getRawTreeData(tree)
    onChangeComponentTree && onChangeComponentTree(rawTreeData)
  }

  handleRemoveProp = (nodeId) => {
    this.props.onRemoveProp && this.props.onRemoveProp(nodeId)
  }

  handleChangePropValue = (nodeId, value) => {
    this.props.onChangePropValue && this.props.onChangePropValue(nodeId, value)
  }

  handleChangeData = (dataState) => {
    this.setState({ dataState })
  }

  handleChangeActions = (actionsState) => {
    this.setState({ actionsState })
  }

  render () {
    const {
      componentTree,
      completionData,
      nodeIdGenerator,
      onChangeComponentTree,
      onChangeComponentName,
      onChangeData,
      onChangeActions,
      onChangePropValue,
      onInsertComponent,
      onRemoveProp,
      onRemoveComponent,
      onSelectComponent,
      actions,
      data,
      theme,
    } = this.props
    return (
      <View
        {...theme.liveEditor}
      >
        <Tabs
          onSelect={this.handleSelect}
          selectedIndex={this.state.selectedIndex}
          {...theme.liveEditorTabs}
        >
          <TabList>
            { /* TODO: Rename Code -> Markup in code */ }
            <Tab>Markup</Tab>
            <Tab>Data</Tab>
            <Tab>Actions</Tab>
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
    height: 400,
    overflowY: 'scroll',
  },
  liveEditorTabs: {
  }
}

export default Theme('LiveEditor', defaultTheme)(LiveEditor)
