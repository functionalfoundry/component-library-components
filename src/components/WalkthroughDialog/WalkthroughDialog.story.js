import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import AlignedTrigger from '@workflo/components/lib/AlignedTrigger'
import PreviewContainer from '@workflo/components/lib/PreviewContainer'

import WalkthroughDialog from '.'

storiesOf('WalkthroughDialog', module)
  .add('Beginning', () => (
    <div style={{ position: 'absolute', top: 20, left: 20 }}>
      <WalkthroughDialog
        message="This is where you’ll find all the components across your organization. We automatically take screenshots of your components and display those here. Click on a component to see all of that component’s states."
        onDismiss={action('dismiss-clicked')}
        onForward={action('forward-clicked')}
        title="Welcome to Workflo!"
      />
    </div>
  ))
  .add('Middle', () => (
    <div style={{ position: 'absolute', top: 20, left: 20 }}>
      <WalkthroughDialog
        message="Now it's time to do something different."
        onBack={action('back-clicked')}
        onDismiss={action('dismiss-clicked')}
        onForward={action('forward-clicked')}
        title="Step 2 of 3"
      />
    </div>
  ))
  .add('End', () => (
    <div style={{ position: 'absolute', top: 20, left: 20 }}>
      <WalkthroughDialog
        onDismiss={action('dismiss-clicked')}
        message="This is where you’ll find all the components across your organization. We automatically take screenshots of your components and display those here. Click on a component to see all of that component’s states."
        title="You're ready to go"
      />
    </div>
  ))
  .add('With Aligned Pointer', () => (
    <PreviewContainer shade="dark">
      <Preview label="Aligned Pointer With WalkthroughDialog">
        <AlignedTrigger
          position="Top"
          portal={
            <WalkthroughDialog
              message="This is where you’ll find all the components across your organization. We automatically take screenshots of your components and display those here. Click on a component to see all of that component’s states."
              onDismiss={action('dismiss-clicked')}
              onForward={action('forward-clicked')}
              title="Welcome to Workflo!"
            />
          }
          openTriggers={['Click inside']}
          closeTriggers={['Click outside']}
        >
          {'Walkthrough Target'}
        </AlignedTrigger>
      </Preview>
    </PreviewContainer>
  ))
