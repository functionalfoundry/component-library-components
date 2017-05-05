/** @flow */
import React from 'react'
import PropTypes from 'prop-types'
import Align from '@workflo/components/lib/Align'

import WalkthroughDialog from '../WalkthroughDialog'

type StepT = {
  hintTargets: Array<string>,
  message: string,
  onBack?: Function,
  onDismiss?: Function,
  onForward?: Function,
  target: string,
  title: string,
}

type Props = {
  children: any,
  name?: string,
}

type State = {
  onBack: ?Function,
  onDismiss: ?Function,
  onForward: ?Function,
  stepIndex: number,
  steps: Array<StepT>,
  status: 'Stopped' | 'Paused' | 'Active',
}

type ContextT = {
  observableWalkthroughState: Object,
}

class WalkthroughTarget extends React.Component {
  props: Props
  state: State
  observableWalkthroughState: Object
  subscription: Object

  static contextTypes = {
    observableWalkthroughState: PropTypes.object,
  }

  constructor(props: Props, context: ContextT) {
    super(props)
    this.state = {
      onBack: null,
      onDismiss: null,
      onForward: null,
      steps: [],
      stepIndex: 0,
      status: 'Stopped',
    }
    this.observableWalkthroughState = context.observableWalkthroughState
  }

  componentWillMount() {
    if (this.observableWalkthroughState !== null) {
      this.subscription = this.observableWalkthroughState.subscribe(
        this.setState.bind(this)
      )
    } else {
      console.warn(
        'No observableWalkthroughState found. Make sure to render WalkthroughTarget' +
          ' inside of a WalkthroughProvider component'
      )
      this.subscription = { unsubscribe: () => {} }
    }
  }

  componentWillUnmnount() {
    this.subscription.unsubscribe()
  }

  render() {
    const { children, name, ...props } = this.props
    const { status, steps, stepIndex } = this.state
    const currentStep = steps[stepIndex]
    return (
      <Align
        isOpen
        portal={
          currentStep && currentStep.target === name && status === 'Active'
            ? <WalkthroughDialog
                title={currentStep.title}
                message={currentStep.message}
                onBack={currentStep.onBack}
                onDismiss={currentStep.onDismiss}
                onForward={currentStep.onForward}
              />
            : <div />
        }
        position="Bottom Right"
        theme={{
          target: {
            display: 'block',
            height: '100%',
          },
        }}
      >
        {React.cloneElement(React.Children.only(children), props)}
      </Align>
    )
  }
}

export default WalkthroughTarget
