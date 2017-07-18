import React from 'react'
import Properties, { PropertyT } from '../Properties'
import { Tabs, Tab, TabList, TabPanel } from '@workflo/components'
import { Spacing } from '@workflo/styles'

type ComponentT = {
  id: string,
  name: string,
  properties: Array<PropertyT>,
}

type PropsT = {
  components: Array<ComponentT>,
  onClickPlus: Function,
  onClickMinus: Function,
  selectedComponentId?: string,
  onChangeComponent: Function,
  forceHoverRowIndex?: number,
}

const getSelectedComponentIndex = (components, id) => {
  for (var index = 0; index < components.length; index++) {
    if (components[index].id === id) {
      return index
    }
  }
  return 0
}

const defaultProps = {
  components: [],
  onClickPlus: () => {},
  onClickMinus: () => {},
}

export default class MultiPropertiesTable extends React.Component {
  props: PropsT
  static defaultProps: PropsT = defaultProps

  handleSelect = i => {
    const { onChangeComponent, components } = this.props
    onChangeComponent(components[i].id)
  }

  render() {
    const {
      components,
      forceHoverRowIndex,
      onClickPlus,
      onClickMinus,
      selectedComponentId,
    } = this.props
    return (
      <Tabs
        kind="Primary"
        onSelect={this.handleSelect}
        selectedIndex={getSelectedComponentIndex(components, selectedComponentId)}
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
          <TabPanel
            key={`panel-${index}`}
            theme={{
              tabPanel: {
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
              },
            }}
          >
            <Properties
              forceHoverRowIndex={forceHoverRowIndex}
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
