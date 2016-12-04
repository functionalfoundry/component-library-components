import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import QuickAction from './QuickAction'

storiesOf('Quick Action', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        theme={previewTheme}
        label='Regular'
      >
        <QuickAction
          icon='close'
          input={{
            options: [
              'Left',
              'Center',
              'Right',
            ],
            value: 'Center',
            type: 'Radio',
          }}
        />
      </Preview>
      <Preview
        theme={previewTheme}
        label='Button'
      >
        <QuickAction
          icon='close'
          input={{
            type: 'Button',
          }}
          onClick={action('onClick')}
        />
      </Preview>
    </PreviewContainer>
  ))

const previewTheme = {
  content: {
    height: 200,
    paddingTop: 100,
    paddingLeft: 100,
    backgroundColor: '#444',
  }
}
