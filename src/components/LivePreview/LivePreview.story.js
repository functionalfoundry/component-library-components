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

const previewStyle = {
  height: 300,
  backgroundColor: 'cyan',
  display: 'flex',
  flexDirection: 'column',
}
