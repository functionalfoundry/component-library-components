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
import Code from '../Code/Code'
import Data from '../Data/Data'

type PropsT = {
  onChangeCode: Function,
  onChangeData: Function,
  onChangeActions: Function,
  componentName: string,
  propKeyValues: any,
  dataCode: string,
}

const defaultProps = {
  onChangeCode: () => {},
  onChangeData: () => {},
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
          {...theme.tabs}
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
            />
          </TabPanel>
          <TabPanel>
            <Data
              text={dataCode}
              onChange={onChangeData}
            />
          </TabPanel>
          <TabPanel>
            <h2>Hello from Baz</h2>
          </TabPanel>
        </Tabs>
      </View>
    )
  }
}

const defaultTheme = {
  liveEditor: {
    padding: Spacing.small,
    backgroundColor: 'white',
    color: Colors.grey600,
  },
}

export default Theme('LiveEditor', defaultTheme)(LiveEditor)
