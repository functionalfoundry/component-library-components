import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Harness from './Harness'
import { Preview, PreviewContainer } from '@workflo/components'

const MyComponent = () => (
  <div style={{ backgroundColor: 'magenta', height: 100, display: 'flex' }}>
    Hello
  </div>
)

class MyFailingComponent extends React.Component {
  render() {
    throw Error('This failed')
  }
}

const exampleElement = (
  <div
    style={{
      background: 'white',
      border: 'thin solid grey',
      padding: '2em',
      color: 'black',
    }}
  >
    Some element
  </div>
)

const failingElement = <MyFailingComponent />

storiesOf('Harness', module)
  .add('Regular', () => (
    <PreviewContainer>
      <div style={previewStyle} label="Regular">
        <Harness element={exampleElement} alignment="Center" backgroundColor="cyan" />
      </div>
    </PreviewContainer>
  ))
  .add('Failing component', () => (
    <PreviewContainer>
      <div style={previewStyle} label="Failing component">
        <Harness element={failingElement} alignment="Center" backgroundColor="cyan" />
      </div>
    </PreviewContainer>
  ))
  .add('No props', () => (
    <PreviewContainer>
      <div style={previewStyle} label="Failing component">
        <Harness />
      </div>
    </PreviewContainer>
  ))

const previewStyle = {
  height: 300,
  backgroundColor: 'cyan',
  display: 'flex',
  flexDirection: 'column',
}
