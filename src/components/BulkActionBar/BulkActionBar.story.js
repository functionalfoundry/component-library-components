import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import BulkActionBar from './BulkActionBar'
import BulkActionButton from '../BulkActionButton'
import QuickAction from '../QuickAction'
import { Colors } from '@workflo/styles'

storiesOf('BulkActionBar', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
        theme={{
          content: {
            marginTop: 150,
            marginBottom: 150,
          },
        }}
      >
        <BulkActionBar
          onClearSelection={action('onClearSelected')}
          numberSelected={2}
        >
          <QuickAction
            icon='alignment'
            iconKind='Primary'
            label='Alignment'
            input={{
              type: 'Icon',
              value: 'align-left',
              options: [{
                name: 'align-left',
                hint: 'Left',
              }, {
                name: 'align-center',
                hint: 'Center',
              }, {
                name: 'align-right',
                hint: 'Right',
              }]
            }}
            onClick={action('onClick')}
            showLabelInButton
          />
          <QuickAction
            icon='delete'
            iconKind='Primary'
            label='Delete'
            input={{
              type: 'Button',
            }}
            onClick={action('onClick')}
            showLabelInButton
          />
          <QuickAction
            icon='theme'
            iconKind='Primary'
            label='Theme'
            input={{
              options: [
                'Light',
                'Dark',
                'Grey',
              ],
              value: 'Dark',
              type: 'Radio',
            }}
            onClick={action('onClick')}
            showLabelInButton
          />
        </BulkActionBar>
      </Preview>
    </PreviewContainer>
  ))
