import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ComponentState from './ComponentState'
import {
  Preview,
  PreviewContainer,
} from '@workflo/components'

const MyComponent = ({children}) => (
  <div style={{ backgroundColor: 'magenta', width: 100, height: 100 }}>
    {children}
  </div>
)

storiesOf('Component State', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
      >
        <ComponentState
          component={{
            implementation: MyComponent,
          }}
          harnessCard={{
            harness: {
              componentState: {
                name: 'With title',
                propMap: {
                  children: <div>Inner Text</div>,
                },
              },
              alignment: {
                horizontal: 'Right',
              },
              theme: {
                patterns: {
                  colors: {
                    background: 'yellow',
                  }
                },
              },
            },
            isSelected: true,
          }}
          onClickTitle={action('Click title')}
          onChangeIsSelected={action('Change is selected')}
        />
      </Preview>
    </PreviewContainer>
  ))
