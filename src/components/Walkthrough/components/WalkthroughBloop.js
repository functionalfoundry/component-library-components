import React from 'react'
import { Circ, Linear, TimelineMax, TweenMax } from 'gsap'
import Theme from 'js-theme'
import { compose } from 'recompose'

import withTransitionGroup from '../../../utils/withTransitionGroup'

type Props = {
  theme: Object,
}

class WalkthroughBloop extends React.Component {
  props: Props

  componentDidMount(callback) {
    const el = this.container
    const elChild1 = this.container.childNodes[0]
    const elChild2 = this.container.childNodes[1]
    const tl = new TimelineMax()

    TweenMax.fromTo(
      el,
      0.3,
      {
        opacity: 0,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1,
        tranformOrigin: '50% 50%',
        ease: Circ.easeOut,
        onComplete: callback,
      }
    )

    TweenMax.fromTo(
      elChild1,
      0.5,
      {
        opacity: 1,
        scale: 1,
      },
      {
        opacity: 0,
        scale: 1.5,
        repeat: 4,
        transformOrigin: '50% 50%',
        ease: Linear.easeNone,
        onComplete: callback,
      }
    )

    tl.fromTo(
      elChild2,
      0.5,
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: 1,
        scale: 1,
        repeat: 3,
        transformOrigin: '50% 50%',
        ease: Linear.easeNone,
      }
    )

    tl.to(elChild2, 0.5, {
      opacity: 0,
      scale: 0.5,
      transformOrigin: '50% 50%',
      ease: Linear.easeNone,
      onComplete: callback,
    })
  }

  componentWillLeave(callback) {
    const el = this.container
    TweenMax.fromTo(
      el,
      0.2,
      {
        opacity: 1,
        scale: 1,
      },
      {
        scale: 0,
        opacity: 0,
        transformOrigin: '50% 50%',
        ease: Circ.easeIn,
        onComplete: callback,
      }
    )
  }

  saveContainerRef = (ref: any) => {
    this.container = ref
  }

  render() {
    const { theme } = this.props
    return (
      <div {...theme.shape} ref={this.saveContainerRef}>
        <div {...theme.shapeDiv} />
        <div {...theme.shapeDiv} />
      </div>
    )
  }
}

const defaultTheme = {
  shape: {
    padding: '10px',
    borderRadius: '50%',
    width: '10px',
    height: '10px',
    position: 'absolute',
  },
  shapeDiv: {
    border: '1px #F24965 solid',
    borderRadius: '50%',
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: '0px',
  },
}

export default compose(withTransitionGroup, Theme('WalkthroughBloop', defaultTheme))(
  WalkthroughBloop
)
