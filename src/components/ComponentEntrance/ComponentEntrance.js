/* @flow */
import React from 'react'
import Theme from 'js-theme'
import TweenMax from 'gsap'

class ComponentEntrance extends React.Component {
  componentWillEnter(callback) {
    console.log('mounted')

    const elChild = this.enter
    TweenMax.set(elChild, {
      autoAlpha: 0,
    })
    TweenMax.fromTo(
      elChild,
      0.5,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        ease: Power2.easeOut,
        delay: 0.9,
        onComplete: callback,
      }
    )
  }

  render() {
    return (
      <div ref={c => (this.enter = c)}>
        {this.props.children}
      </div>
    )
  }
}

const ThemedComponentEntrance = Theme('ComponentEntrance')(ComponentEntrance)
export default ThemedComponentEntrance
