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

  animateEnter() {
    const el = this.container

    const timeline = new TimelineMax()

    timeline.fromTo(
      el,
      0.3,
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        tranformOrigin: '50% 50%',
        ease: Circ.easeOut,
      }
    )
  }

  animateExit() {
    const el = this.container

    const timeline = new TimelineMax()

    timeline.fromTo(
      el,
      0.2,
      {
        opacity: 1,
        scale: 1,
      },
      {
        scale: 0.95,
        opacity: 0,
        transformOrigin: '50% 50%',
        ease: Circ.easeIn,
      }
    )
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
