import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ComponentState from './ComponentState'
import QuickAction from '../QuickAction'
import { Preview, PreviewContainer } from '@workflo/components'

const MyComponent = ({
  children, // eslint-disable-line react/prop-types
}) => (
  <div style={{ backgroundColor: 'magenta', width: 100, height: 100 }}>
    {children}
  </div>
)

const element = (
  <MyComponent>
    <div>Inner Text</div>
  </MyComponent>
)

const actions = [
  <QuickAction
    icon="alignment"
    input={{
      type: 'Radio',
      options: ['Left', 'Center', 'Right'],
      value: 'Center',
    }}
    onChange={action('Alignment')}
  />,
  <QuickAction
    icon="theme"
    label="Theme"
    input={{
      options: ['Light', 'Dark', 'Grey'],
      value: 'Dark',
      type: 'Radio',
    }}
  />,
  <QuickAction
    label="Delete"
    icon="delete"
    input={{
      type: 'Button',
    }}
    onClick={action('Delete')}
  />,
  <QuickAction
    icon="size"
    input={{
      type: 'Radio',
      options: ['Small', 'Base', 'Large'],
      value: 'Base',
    }}
    onChange={action('Size')}
  />,
]

storiesOf('Component State', module).add('Regular', () => (
  <PreviewContainer>
    <Preview
      label="Regular"
      theme={{
        content: {
          margin: 60,
        },
      }}
    >
      <Container />
    </Preview>
  </PreviewContainer>
))

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: false,
    }
  }

  toggleSelected = () => {
    this.setState(state => (state.isSelected = !state.isSelected))
  }

  handleChangeIsSelected = isSelected => {
    action('onChangeIsSelected')(null, isSelected)
    this.setState(state => (state.isSelected = isSelected))
  }

  render() {
    return (
      <div>
        <p><button onClick={this.toggleSelected}>Toggle selected</button></p>
        <ComponentState
          harnessCard={{
            actions,
            element,
            harness: {
              componentState: {
                name: 'With title',
              },
              alignment: {
                horizontal: 'Right',
              },
              theme: {
                patterns: {
                  colors: {
                    background: 'yellow',
                  },
                },
              },
            },
            isSelected: this.state.isSelected,
          }}
          onClickTitle={action('Click title')}
          onChangeIsSelected={this.handleChangeIsSelected}
        />
      </div>
    )
  }
}
