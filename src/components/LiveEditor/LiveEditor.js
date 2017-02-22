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
  onChangeComponentTree: Function,
  onChangeData: Function,
  onChangeActions: Function,
  componentTree: Object,
  completionData?: CompletionDataT,
  data: DataT,
  actions: DataT,
}

const defaultProps = {
  onChangeComponentTree: () => {},
  onChangeData: () => {},
  onChangeActions: () => {},
  data: {
    text: '',
  },
  actions: {
    text: '',
  },
}

class LiveEditor extends React.Component {
  props: PropsT

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
    }
  }

  handleSelect = (index) => this.setState({ selectedIndex: index })

  handleChangeComponentTree = (tree) => {
    const { onChangeComponentTree } = this.props
    const rawTreeData = TreeUtils.getRawTreeData(tree)
    onChangeComponentTree && onChangeComponentTree(tree)
  }

  render () {
    const {
      componentTree,
      completionData,
      onChangeComponentTree,
      onChangeData,
      onChangeActions,
      onRemoveProp,
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
            <Tab>Code</Tab>
            <Tab>Data</Tab>
            <Tab>Actions</Tab>
          </TabList>
          <TabPanel>
            <ComponentTreeEditor
              tree={TreeUtils.createTree(componentTree)}
              completionData={completionData}
              onChange={this.handleChangeComponentTree}
            />
          </TabPanel>
          <TabPanel>
            <Data
              text={data.text}
              onChange={onChangeData}
            />
          </TabPanel>
          <TabPanel>
            <Data
              text={actions.text}
              onChange={onChangeActions}
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
