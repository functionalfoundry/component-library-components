import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import ComponentExit from './ComponentExit'
import ReactTransitionGroup from 'react-addons-transition-group'

storiesOf('ComponentExit', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
        theme={{
          preview: {
            width: 300,
          },
        }}
      >
        <ReactTransitionGroup>
          <ComponentExit>
            <div style={defaultTheme} />
          </ComponentExit>
        </ReactTransitionGroup>
      </Preview>
    </PreviewContainer>
  ))

const defaultTheme = {
  background: '#eee',
  width: '200px',
  height: '200px'
};
