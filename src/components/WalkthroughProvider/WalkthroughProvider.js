import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

type StepT = {
  hintTargets: Array<string>,
  message: string,
  target: string,
  title: string,
}

type Props = {
  children: any,
  stepIndex: number,
  steps: Array<StepT>,
  status: 'Stopped | Paused | Active',
}

export default class WalkthroughProvider extends React.Component {
  props: Props

  childContextTypes = {
    observableWalkthroughState: PropTypes.object,
  }

  constructor(props: Props) {
    const { steps } = props
    super(props)
    this.observableWalkthroughState = new BehaviorSubject()
    this.observableWalkthroughState.next({ steps })
  }

  shouldComponentUpdate(nextProps) {
    const { children, stepIndex, steps, status } = this.props
    if (nextProps.children !== children) {
      return true
    }
    /** Send new props to WalkthroughTarget components */
    if (
      stepIndex !== nextProps.stepIndex ||
      steps !== nextProps.steps ||
      status !== nextProps.status
    ) {
      this.observableWalkthroughState.next({
        stepIndex,
        steps,
        status,
      })
    }
  }

  getChildContext() {
    return { observableWalkthroughState: this.observableWalkthroughState }
  }

  render() {
    return Children.only(this.props.children)
  }
}
