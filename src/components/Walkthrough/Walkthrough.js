import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

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
  stepIndex: number,
  steps: Array<StepT>,
  status: 'Stopped' | 'Paused' | 'Active',
}

export default class WalkthroughProvider extends React.Component {
  props: Props

  static defaultProps = {
    steps: [],
    stepIndex: 0,
    status: 'Stopped',
  }

  static childContextTypes = {
    observableWalkthroughState: PropTypes.object,
  }

  constructor(props: Props) {
    const { onBack, onDismiss, onForward, steps, stepIndex, status } = props
    super(props)
    this.observableWalkthroughState = new BehaviorSubject({
      onBack,
      onDismiss,
      onForward,
      status,
      stepIndex,
      steps,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { onBack, onDismiss, onForward, stepIndex, steps, status } = nextProps
    /** Send new props to WalkthroughTarget components */
    if (
      stepIndex !== this.props.stepIndex ||
      steps !== this.props.steps ||
      status !== this.props.status
    ) {
      this.observableWalkthroughState.next({
        onBack,
        onDismiss,
        onForward,
        stepIndex,
        steps,
        status,
      })
    }
  }

  shouldComponentUpdate(nextProps) {
    const { children } = this.props
    if (nextProps.children !== children) {
      return true
    }
    return false
  }

  getChildContext() {
    return { observableWalkthroughState: this.observableWalkthroughState }
  }

  render() {
    return Children.only(this.props.children)
  }
}
