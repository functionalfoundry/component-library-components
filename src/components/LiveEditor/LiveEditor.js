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
import Code from '../Code'
import Data from '../Data'

type PropsT = {
  onChangeCode: Function,
  onChangeData: Function,
  onChangeActions: Function,
  componentName: string,
  propKeyValues: any,
  dataCode: string,
  actionsCode: string,
}

const defaultProps = {
  onChangeCode: () => {},
  onChangeData: () => {},
  onChangeActions: () => {},
}

class LiveEditor extends React.Component {
  static defaultProps = defaultProps
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
    }
  }

  handleSelect = (index) => this.setState({ selectedIndex: index })

  render () {
    const {
      componentName,
      propKeyValues,
      onChangeCode,
      onChangeData,
      onChangeActions,
      onRemoveProp,
      actionsCode,
      dataCode,
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
            <Code
              componentName={componentName}
              propKeyValues={propKeyValues}
              onChange={onChangeCode}
              onRemoveProp={onRemoveProp}
            />
          </TabPanel>
          <TabPanel>
            <Data
              text={dataCode}
              onChange={onChangeData}
            />
          </TabPanel>
          <TabPanel>
          <Data
            text={actionsCode}
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