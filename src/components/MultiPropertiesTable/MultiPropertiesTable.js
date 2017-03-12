import React from 'react'
import Properties, { PropertyT } from '../Properties'
import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
} from '@workflo/components'
import {
  Spacing,
} from '@workflo/styles'

type ComponentT = {
  id: string,
  name: string,
  properties: Array<PropertyT>,
}

type PropsT = {
  components: Array<ComponentT>,
  onClickPlus: Function,
  onClickMinus: Function,
  selectedComponentId: string,
  onChangeComponent: Function,
}

const defaultProps = {
  components: [],
  onClickPlus: () => {},
  onClickMinus: () => {},
  selectedComponentId: 0,
}

export default class MultiPropertiesTable extends React.Component {
  props: PropsT
  static defaultProps: PropsT = defaultProps

  handleSelect = (i) => {
    const { onChangeComponent, components } = this.props
    onChangeComponent(components[i].id)
  }

  render () {
    const {
      components,
      onClickPlus,
      onClickMinus,
      selectedComponentId,
    } = this.props
    return (
      <Tabs
        kind='Primary'
        onSelect={this.handleSelect}
        selectedIndex={selectedComponentId}
        theme={{
          tabs: {
            marginTop: Spacing.tiny, // Remove when we add padding option to app layout
            color: 'white',
          },
        }}
      >
        <TabList>
          {components.map((component, index) => (
            <Tab key={`tab-${index}`}>
              {component.name}
            </Tab>
          ))}
        </TabList>
        {components.map((component, index) => (
          <TabPanel key={`panel-${index}`}>
            <Properties
              properties={component.properties}
              onClickPlus={onClickPlus}
              onClickMinus={onClickMinus}
            />
          </TabPanel>
        ))}
      </Tabs>
    )
  }
}
