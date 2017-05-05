import React from 'react'
import Button from '@workflo/components/lib/Button'
import { storiesOf } from '@kadira/storybook'
import { range } from 'lodash'

import WalkthroughTarget from '../WalkthroughTarget'
import WalkthroughProvider, { WalkthroughBloop } from '.'

const App = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
    {range(0, 9).map(index => (
      <div
        key={index}
        style={{
          color: 'white',
          height: 100,
          margin: 20,
          position: 'relative',
          width: 100,
        }}
      >
        <WalkthroughTarget name={`target-${index}`}>
          <div style={{ backgroundColor: 'red', height: '100%', width: '100%' }}>
            {index}
          </div>
        </WalkthroughTarget>
      </div>
    ))}
  </div>
)

const steps = [
  {
    message: 'This is where you’ll find all the components across your organization. We automatically take screenshots of your components and display those here. Click on a component to see all of that component’s states.',
    target: 'target-1',
    title: 'Welcome!',
  },
  {
    message: 'Step 3 is way down here.',
    target: 'target-7',
    title: 'Step 2',
  },
  {
    hintTargets: ['target-1', 'target-6'],
    message: 'This step wants you to pay attention to a couple other things.',
    target: 'target-4',
    title: 'Step 3',
  },
]

class WalkthroughContainer extends React.Component {
  state: {
    steps: Array<Object>,
    stepIndex: number,
    status: string,
  }
  constructor(props) {
    const { steps } = props
    super(props)

    this.handleBack = this.handleBack.bind(this)
    this.handleDismiss = this.handleDismiss.bind(this)
    this.handleForward = this.handleForward.bind(this)

    this.state = {
      steps: this.calculateSteps(steps),
      status: 'Stopped',
      stepIndex: 0,
    }
  }
  calculateSteps(steps) {
    return (
      steps
        .map(step => ({ ...step, onDismiss: this.handleDismiss }))
        /** Don't show back button on first step */
        .map(
          (step, index) =>
            index === 0
              ? step
              : {
                  ...step,
                  onBack: this.handleBack,
                }
        )
        /** Don't show forward button on last step */
        .map(
          (step, index, steps) =>
            index === steps.length - 1
              ? step
              : {
                  ...step,
                  onForward: this.handleForward,
                }
        )
    )
  }

  handleBack() {
    this.setState(prevState => ({
      stepIndex: prevState.stepIndex - 1,
    }))
  }

  handleDismiss() {
    this.setState(() => ({
      status: 'Stopped',
    }))
  }

  handleForward() {
    this.setState(prevState => ({
      stepIndex: prevState.stepIndex + 1,
    }))
  }

  render() {
    return (
      <WalkthroughProvider
        steps={this.state.steps}
        stepIndex={this.state.stepIndex}
        status={this.state.status}
      >
        <div style={{ width: 1000 }}>
          <Button
            onClick={() => this.setState(() => ({ status: 'Active', stepIndex: 0 }))}
          >
            Start Walkthrough
          </Button>
          <App />
        </div>
      </WalkthroughProvider>
    )
  }
}

storiesOf('Walkthrough', module)
  .add('Beginning', () => <WalkthroughContainer steps={steps} />)
  .add('Bloop', () => <WalkthroughBloop />)
