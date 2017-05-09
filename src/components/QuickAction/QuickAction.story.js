import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import QuickAction from './QuickAction'
import { Colors } from '@workflo/styles'

storiesOf('Quick Action', module).add('Regular', () => (
  <PreviewContainer>
    <Preview theme={previewTheme} label="Radio">
      <QuickAction
        icon="theme"
        shade="Light"
        label="Theme"
        input={{
          options: ['Light', 'Dark', 'Grey'],
          value: 'Dark',
          type: 'Radio',
        }}
        onClick={action('onClick')}
      />
    </Preview>
    <Preview theme={previewTheme} label="Icon">
      <QuickAction
        icon="alignment"
        label="Alignment"
        shade="Light"
        input={{
          type: 'Icon',
          value: 'align-left',
          options: [
            {
              name: 'align-left',
              hint: 'Left',
            },
            {
              name: 'align-center',
              hint: 'Center',
            },
            {
              name: 'align-right',
              hint: 'Right',
            },
          ],
        }}
        onClick={action('onClick')}
      />
    </Preview>
    <Preview theme={previewTheme} label="Button">
      <QuickAction
        icon="delete"
        shade="Light"
        label="Delete"
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
    backgroundColor: Colors.grey900,
  },
}
