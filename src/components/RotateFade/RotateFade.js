/* @flow */
import React from 'react'
import Theme from 'js-theme'
import TweenMax from 'gsap'

class RotateFade extends React.Component {
  componentDidMount(callback) {
    const elChild = this.rotate
    TweenMax.set(elChild, {
      transformOrigin: '50% 50%',
    })
    TweenMax.fromTo(
      elChild,
      0.5,
      {
        rotation: 90,
        opacity: 0,
      },
      {
        rotation: 0,
        opacity: 1,
        ease: Power2.easeOut,
        onComplete: callback,
      }
    )
  }

  componentWillUnmount(callback) {
    const elChild = this.rotate
    TweenMax.set(elChild, {
      transformOrigin: '50% 50%',
    })
    TweenMax.to(elChild, 0.5, {
      rotation: 90,
      opacity: 0,
      ease: Power3.easeIn,
      onComplete: callback,
    })
  }

  render() {
    return (
      <div ref={c => (this.rotate = c)}>
        {this.props.children}
      </div>
    )
  }
}

const ThemedRotateFade = Theme('RotateFade')(RotateFade)
export default ThemedRotateFade
