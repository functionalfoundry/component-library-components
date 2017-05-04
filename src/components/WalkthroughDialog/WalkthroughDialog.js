/** @flow */
import React from 'react'
import { Circ, TweenMax } from 'gsap'
import Theme from 'js-theme'
import { compose } from 'recompose'

import withTransitionGroup from '../../utils/withTransitionGroup'
import defaultTheme from './defaultTheme'
import { BackIcon, DismissIcon, ForwardIcon } from './components'

type Props = {
  onBack: Function,
  onDismiss: Function,
  onForward: Function,
  message: string,
  theme: Object,
  title: string,
}

class WalkthroughDialog extends React.Component {
  props: Props
  container: any
  componentWillEnter(callback: Function) {
    const el = this.container

    TweenMax.fromTo(
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
        onComplete: callback,
      }
    )
  }

  componentWillLeave(callback: Function) {
    const el = this.container
    TweenMax.fromTo(
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
        onComplete: callback,
      }
    )
  }

  render() {
    const { message, onBack, onDismiss, onForward, title, theme } = this.props
    return (
      <div {...theme.container} ref={c => (this.container = c)}>
        <h1 {...theme.title}>{title}</h1>
        <p {...theme.content}>{message}</p>
        {onBack
          ? <button onClick={onBack} {...theme.button}>
              <BackIcon />
            </button>
          : null}
        {onDismiss
          ? <button onClick={onDismiss} {...theme.button}>
              <DismissIcon />
            </button>
          : null}
        {onForward
          ? <button onClick={onForward} {...theme.button}>
              <ForwardIcon />
            </button>
          : null}
      </div>
    )
  }
}

export default compose(Theme('WalkthroughDialog', defaultTheme), withTransitionGroup)(
  WalkthroughDialog
)
