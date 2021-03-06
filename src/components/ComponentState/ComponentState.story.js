import React from 'react'
import ReactDOM from 'react-dom'
import { storiesOf, action } from '@kadira/storybook'
import ComponentState from './ComponentState'
import QuickAction from '../QuickAction'
import { Preview, PreviewContainer } from '@workflo/components'

const MyComponentBundle = `
  (
    function () {
      class ExampleComponent extends React.Component {
        componentWillMount() {
          console.log('ExampleComponent will mount')
        }

        componentWillReceiveProps() {
          console.log('ExampleComponent will receive props')
        }

        render() {
          return React.createElement(
            "div",
            {
              key: "foo",
              style: {
                backgroundColor: "magenta",
                width: "100px",
                height: "100px"
              }
            },
            "Example component"
          )
        }
      }

      return React.createElement(ExampleComponent, {});
    }
 )`

export const rawExampleTree = {
  id: 'my-component',
  name: 'MyComponent',
  props: [],
  children: [],
}

export const exampleBundles = {
  'my-component': MyComponentBundle,
}

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

storiesOf('Component State', module).add('Regular', () =>
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
)

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: false,
    }
  }

  toggleSelected = () => {
    this.setState(prevState => ({ isSelected: !prevState.isSelected }))
  }

  handleChangeIsSelected = isSelected => {
    action('onChangeIsSelected')(null, isSelected)
    this.setState(() => ({ isSelected }))
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 350 }}>
        <div>
          <button onClick={this.toggleSelected}>Toggle selected</button>
        </div>
        <ComponentState
          harnessCard={{
            actions,
            tree: rawExampleTree,
            bundles: { 'my-component': MyComponentBundle },
            React,
            ReactDOM,
            harness: {
              id: Date.now(),
              componentState: {
                name: 'With title',
              },
              alignment: {
                horizontal: 'Right',
                vertical: 'Center',
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
