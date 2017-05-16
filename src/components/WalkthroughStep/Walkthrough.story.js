import React from 'react'
import Button from '@workflo/components/lib/Button'
import { storiesOf } from '@kadira/storybook'
import { range } from 'lodash'

import WalkthroughStep from './WalkthroughStep'
import WalkthroughBloop from '../WalkthroughBloop'

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
        <div
          id={`target-${index}`}
          style={{ backgroundColor: 'red', height: '100%', width: '100%' }}
        >
          {index}
        </div>
      </div>
    ))}
  </div>
)

const steps = [
  {
    message: 'This is where you’ll find all the components across your organization. We automatically take screenshots of your components and display those here. Click on a component to see all of that component’s states.',
    targetSelector: '#target-1',
    title: 'Welcome!',
  },
  {
    message: 'Step 2 is way down here.',
    targetSelector: '#target-7',
    title: 'Step 2',
  },
  {
    hints: [
      {
        position: 'Top Left',
        targetSelector: '#target-1',
      },
      {
        verticalOffset: -20,
        targetSelector: '#target-6',
      },
    ],
    message: 'This step wants you to pay attention to a couple other things.',
    targetSelector: '#target-4',
    title: 'Step 3',
  },
  {
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sedeligendi maiores ea aspernatur oditvoluptatem temporibus corporis, commo assumenda repellat earum perspiciatis ut, quia hic possimus numquam impedit vero aliquid.',
    targetSelector: '#target-4',
    title: "Congrats! You're all signed up",
    type: 'Success',
  },
]

class Walkthrough extends React.Component {
  state: {
    isActive: boolean,
    steps: Array<Object>,
    stepIndex: number,
  }
  constructor(props) {
    const { steps } = props
    super(props)

    this.state = {
      isActive: false,
      steps: this.calculateSteps(steps),
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

  handleBack = () => {
    this.setState(prevState => ({
      stepIndex: prevState.stepIndex - 1,
    }))
  }

  handleDismiss = () => {
    this.setState(() => ({
      isActive: false,
    }))
  }

  handleForward = () => {
    this.setState(prevState => ({
      stepIndex: prevState.stepIndex + 1,
    }))
  }

  render() {
    return (
      <div style={{ width: 1000 }}>
        <WalkthroughStep
          {...this.state.steps[this.state.stepIndex]}
          isActive={this.state.isActive}
        />
        <Button onClick={() => this.setState(() => ({ isActive: true, stepIndex: 0 }))}>
          Start Walkthrough
        </Button>
        <App />
      </div>
    )
  }
}

storiesOf('Walkthrough', module)
  .add('End to End', () => <Walkthrough steps={steps} />)
  .add('Bloop', () => <WalkthroughBloop />)
