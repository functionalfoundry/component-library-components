/* @flow */
import React from 'react'
import Theme from 'js-theme'
import TweenMax from 'gsap'

/**
 * Prop types
 */

type DirectionT = 'Left' | 'Right'

type PropsT = {
  direction: DirectionT,
  duration: number,
  distance: number,
  stagger: number,
}

/**
 * Default props
 */

const defaultProps = {
  direction: 'Left',
  duration: 0.5,
  distance: 10,
  stagger: 0.08,
}

class StaggerChildren extends React.Component {
  props: PropsT
  static defaultProps = defaultProps

  constructor (props) {
    super(props)
  }

  componentDidMount (callback) {
    const { direction, duration, distance, stagger } = this.props
    const elChild = this.childrenContainer.childNodes;

    TweenMax.staggerFromTo(elChild, duration, {
      x: direction == 'Left' ? distance : -distance,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      ease: Power2.easeOut,
      onComplete: callback
    }, stagger);
  }

  componentWillUnmount (callback) {
    const { direction, duration, distance, stagger } = this.props
    const elChild = this.childrenContainer.childNodes;

    TweenMax.staggerTo(elChild, duration, {
      x: direction == 'Left' ? distance : -distance,
      opacity: 0,
      ease: Power3.easeIn,
      onComplete: callback
    }, stagger);
  }

  render () {
    const { theme } = this.props
    return (
      <div
        {...theme.StaggerChildren}
        ref={c => this.childrenContainer = c}
      >
        {this.props.children}
      </div>
    )
  }
}

const defaultTheme = {
  StaggerChildren: {
    display: 'flex',
  }
}

const ThemedStaggerChildren = Theme('StaggerChildren', defaultTheme)(StaggerChildren)
export default ThemedStaggerChildren
