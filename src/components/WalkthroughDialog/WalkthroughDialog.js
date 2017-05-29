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
  dismissOnClickOutside: boolean,
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
    const { dialogRef, dismissOnClickOutside } = this.props
    if (dialogRef) {
      dialogRef(this)
    }
    if (dismissOnClickOutside) {
      window.addEventListener('click', this.handleClickAnywhere)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dismissOnClickOutside) {
      if (nextProps.dismissOnClickOutside !== this.props.dismissOnClickOutside) {
        window.addEventListener('click', this.handleClickAnywhere)
      }
    } else {
      if (nextProps.dismissOnClickOutside !== this.props.dismissOnClickOutside) {
        window.removeEventListener('click', this.handleClickAnywhere)
      }
    }
  }

  componentWillUnmount() {
    const { dismissOnClickOutside } = this.props
    if (dismissOnClickOutside) {
      window.removeEventListener('click', this.handleClickAnywhere)
    }
  }

  handleClickAnywhere = (e: Event) => {
    const { dismissOnClickOutside, onDismiss } = this.props
    if (dismissOnClickOutside && this.container && !this.container.contains(e.target)) {
      onDismiss()
    }
  }

  clearTransform() {
    const timeline = new TimelineMax()
    return timeline.set(this.container, { clearProps: 'transform' })
  }

  hide() {
    const timeline = new TimelineMax()
    return timeline.set(this.container, { autoAlpha: 0 })
  }

  /**
   * Accepts a Greensock style object.
   * See: https://greensock.com/docs/#/HTML5/GSAP/Plugins/CSSPlugin/
   */
  setStylesGS(style) {
    const timeline = new TimelineMax()
    return timeline.set(this.container, style)
  }

  animateEnter() {
    const timeline = new TimelineMax()

    return timeline.to(this.container, 0.6, {
      autoAlpha: 1,
      scale: 1,
      tranformOrigin: '50% 50%',
      ease: Circ.easeOut,
    })
  }

  animateExit() {
    const timeline = new TimelineMax()

    return timeline.to(this.container, 0.2, {
      scale: 0.95,
      autoAlpha: 0,
      transformOrigin: '50% 50%',
      ease: Circ.easeOut,
    })
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
