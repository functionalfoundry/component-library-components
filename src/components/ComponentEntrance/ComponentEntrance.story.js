import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import ComponentEntrance from './ComponentEntrance'
import ReactTransitionGroup from 'react-addons-transition-group'

storiesOf('ComponentEntrance', module)
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
          <ComponentEntrance>
            <div style={defaultTheme} />
          </ComponentEntrance>
        </ReactTransitionGroup>
      </Preview>
    </PreviewContainer>
  ))

const defaultTheme = {
  background: '#eee',
  width: '200px',
  height: '200px'
};
