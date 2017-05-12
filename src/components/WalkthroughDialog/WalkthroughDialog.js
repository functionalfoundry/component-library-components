/** @flow */
import React from 'react'
import Theme from 'js-theme'

import TimelineMax from '../../../vendor/greensock/commonjs-flat/TimelineMax'
import { Circ } from '../../../vendor/greensock/commonjs-flat/EasePack'
import defaultTheme from './defaultTheme'
import { BasicStep, SuccessStep } from './components'

type Props = {
  /** Used to get ref to the dialog since component will be wrapped in HOC */
  dialogRef: any,
  onBack: Function,
  onDismiss: Function,
  onForward: Function,
  message: string,
  theme: Object,
  title: string,
  type: string,
}

class WalkthroughDialog extends React.Component {
  props: Props
  container: any
  static defaultProps = {
    dialogRef: () => {},
    type: 'Basic',
  }

  static getContentComponent(type) {
    switch (type) {
      case 'Success':
        return SuccessStep
      case 'Basic':
      default:
        return BasicStep
    }
  }

  componentDidMount() {
    const { dialogRef } = this.props
    if (dialogRef) {
      dialogRef(this)
    }
  }

  hide() {
    const timeline = new TimelineMax()

    timeline.set(this.container, { autoAlpha: 0 })

    return timeline
  }

  animateEnter() {
    const timeline = new TimelineMax()

    timeline.to(this.container, 0.3, {
      autoAlpha: 1,
      scale: 1,
      tranformOrigin: '50% 50%',
      ease: Circ.easeOut,
    })
    return timeline
  }

  animateExit() {
    const timeline = new TimelineMax()

    timeline.to(this.container, 0.2, {
      scale: 0.95,
      autoAlpha: 0,
      transformOrigin: '50% 50%',
      ease: Circ.easeIn,
    })
    return timeline
  }

  render() {
    const { message, onBack, onDismiss, onForward, title, theme, type } = this.props
    const ContentComponent = WalkthroughDialog.getContentComponent(type)
    return (
      <div {...theme.container} ref={c => (this.container = c)}>
        <ContentComponent
          message={message}
          onBack={onBack}
          onDismiss={onDismiss}
          onForward={onForward}
          title={title}
        />
      </div>
    )
  }
}

export default Theme('WalkthroughDialog', defaultTheme)(WalkthroughDialog)
