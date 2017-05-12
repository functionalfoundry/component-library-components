import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import Button from '@workflo/components/lib/Button'
import AlignedTrigger from '@workflo/components/lib/AlignedTrigger'
import PreviewContainer from '@workflo/components/lib/PreviewContainer'

import WalkthroughDialog from '.'

class AnimatedWalkthroughDialog extends React.Component {
  _dialogRef: any

  constructor(props) {
    super(props)
    this.showDialog = true
  }
  handleClick = () => {
    if (this._dialogRef) {
      this.showDialog = !this.showDialog
      if (this.showDialog) {
        this._dialogRef.animateEnter()
      } else {
        this._dialogRef.animateExit()
      }
    }
  }
  saveDialogRef = (ref: any) => {
    this._dialogRef = ref
  }
  render() {
    return (
      <div style={{ position: 'absolute', top: 20, left: 20 }}>
        <Button onClick={this.handleClick}> Toggle Visibility </Button>
        <WalkthroughDialog
          message="This is where you’ll find all the components across your organization. We automatically take screenshots of your components and display those here. Click on a component to see all of that component’s states."
          onDismiss={action('dismiss-clicked')}
          onForward={action('forward-clicked')}
          dialogRef={this.saveDialogRef}
          title="Welcome to Workflo!"
        />
      </div>
    )
  }
}

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
  .add('Success', () => (
    <div style={{ position: 'absolute', top: 20, left: 20 }}>
      <WalkthroughDialog
        onDismiss={action('dismiss-clicked')}
        message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sedeligendi maiores ea aspernatur oditvoluptatem temporibus corporis, commo assumenda repellat earum perspiciatis ut, quia hic possimus numquam impedit vero aliquid."
        title="Congrats! You're all signed up"
        type="Success"
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
  .add('With Animation', () => <AnimatedWalkthroughDialog />)
