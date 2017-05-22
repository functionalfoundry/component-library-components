import React from 'react'
import Theme from 'js-theme'
import { Back, Power4, Sine, TweenMax, TimelineMax } from 'gsap'
import { Fonts } from '@workflo/styles'

import SplitText from '../../../../vendor/greensock/minified/utils/SplitText.min'

type Props = {
  message: string,
  theme: Object,
  title: string,
}

class SuccessStep extends React.Component {
  props: Props
  circleRefs: Array<Object>
  circleColorRef: Object
  titleRef: Object
  messageRef: Object

  constructor(props) {
    super(props)
    this.circleRefs = []
  }

  componentWillUpdate() {
    this.circleRefs = []
  }

  componentDidMount() {
    this.circleRefs.forEach(ref => {
      TweenMax.set(ref, {
        css: {
          transformPerspective: 400,
          perspective: 400,
          transformStyle: 'preserve-3d',
        },
      })
    })

    const tl = new TimelineMax()
    const spT = new SplitText(this.messageRef, { type: 'lines' })
    const lines = spT.lines
    tl.staggerFromTo(
      this.circleRefs,
      1.2,
      {
        rotationX: 180,
        z: -300,
      },
      {
        rotationX: 0,
        z: 0,
        ease: Sine.easeOut,
      },
      0.2
    )
    tl.to(
      this.circleColorRef,
      0.35,
      {
        opacity: 1,
        ease: Sine.easeInOut,
      },
      'start+=0.2'
    )
    tl.add('burst')
    tl.fromTo(
      '#check',
      1,
      {
        opacity: 0,
        drawSVG: '50% 50%',
      },
      {
        opacity: 1,
        drawSVG: '100%',
        ease: Back.easeOut,
      },
      'burst'
    )
    tl.staggerFromTo(
      this.circleRefs,
      1,
      {
        opacity: 0.3,
        scale: 1,
      },
      {
        opacity: 0,
        scale: 2.5,
        ease: Power4.easeOut,
      },
      0.1,
      'burst+=0.1'
    )
    tl.fromTo(
      this.titleRef,
      1,
      {
        opacity: 0,
        scale: 0.93,
      },
      {
        opacity: 1,
        scale: 1,
        ease: Back.easeOut,
      },
      'burst+=0.3'
    )
    tl.staggerFrom(
      lines,
      1.2,
      {
        opacity: 0,
        scale: 0.95,
        y: -2,
        ease: Back.easeOut,
      },
      0.1,
      'burst+=0.3'
    )

    tl.timeScale(1.5)
  }

  saveCircleRefs = (ref: any) => {
    if (ref) {
      this.circleRefs.push(ref)
    }
  }

  saveCircleColorRef = (ref: any) => {
    this.circleColorRef = ref
  }

  saveTitleRef = (ref: any) => {
    this.titleRef = ref
  }

  saveMessageRef = (ref: any) => {
    this.messageRef = ref
  }

  render() {
    const { message, theme, title } = this.props
    return (
      <div>
        <div {...theme.contain}>
          <div {...theme.circle} ref={this.saveCircleRefs} />
          <div {...theme.circle} ref={this.saveCircleRefs} />
          <div {...theme.circle} ref={this.saveCircleRefs} />
          <div {...theme.circleColor} ref={this.saveCircleColorRef} />
          <svg
            {...theme.checkmark}
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            aria-labelledby="title"
          >
            <title id="title">checkmark</title>
            <polyline
              id="check"
              points="21.6 33.6 27.5 39.5 41.5 25.5"
              fill="none"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
        <h1 {...theme.title} ref={this.saveTitleRef}>{title}</h1>
        <p {...theme.message} ref={this.saveMessageRef}>
          {message}
        </p>
      </div>
    )
  }
}

const defaultTheme = {
  contain: {
    position: 'absolute',
    WebkitTransform: 'translate(50%, 50%)',
    transform: 'translateX(-25px)',
    left: '50%',
    top: '40px',
  },
  circle: {
    width: '50px',
    height: '50px',
    border: '1px solid #08CCCC',
    borderRadius: '50%',
    position: 'absolute',
  },

  circleColor: {
    width: '50px',
    height: '50px',
    border: '1px solid #08CCCC',
    borderRadius: '50%',
    position: 'absolute',
    background: '#08CCCC',
    opacity: '0',
  },

  checkmark: {
    position: 'absolute',
    width: '50px',
    marginTop: '-5px',
  },
  title: {
    ...Fonts.large,
    fontWeight: '300',
    marginTop: 90,
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    ...Fonts.base,
    display: 'inline-block',
    textAlign: 'left',
    paddingBottom: '5px',
    lineHeight: '1.5',
  },
}
export default Theme('SuccessStep', defaultTheme)(SuccessStep)
