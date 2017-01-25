import React from 'react'
import { storiesOf } from '@kadira/storybook'
import LivePreview from './LivePreview'
import {
  Preview,
  PreviewContainer,
} from '@workflo/components'

const MyComponent = () => (
  <div style={{ backgroundColor: 'magenta', height: 100, display: 'flex' }}>
    Hello
  </div>
)

class MyFailingComponent extends React.Component {
  render () {
    throw Error('This failed')
  }
}

storiesOf('LivePreview', module)
  .add('Regular', () => (
    <PreviewContainer>
      <div
        style={previewStyle}
        label='Regular'
      >
        <LivePreview
          Component={MyComponent}
          propMap={{}}
          alignment='Center'
          backgroundColor='cyan'
        />
      </div>
    </PreviewContainer>
  ))
  .add('Failing component', () => (
    <PreviewContainer>
      <div
        style={previewStyle}
        label='Failing component'
      >
        <LivePreview
          Component={MyFailingComponent}
          propMap={{}}
          alignment='Center'
          backgroundColor='cyan'
        />
      </div>
    </PreviewContainer>
  ))
  .add('No props', () => (
    <PreviewContainer>
      <div
        style={previewStyle}
        label='Failing component'
      >
        <LivePreview />
      </div>
    </PreviewContainer>
  ))

const previewStyle = {
  height: 300,
  backgroundColor: 'cyan',
  display: 'flex',
  flexDirection: 'column',
}
