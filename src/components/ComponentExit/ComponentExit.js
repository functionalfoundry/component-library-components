/* @flow */
import React from 'react'
import Theme from 'js-theme'
import TweenMax from 'gsap'

class ComponentExit extends React.Component {
  componentWillLeave(callback) {
    const elChild = this.exit
    TweenMax.to(elChild, 1, {
      autoAlpha: 0,
      ease: Power3.easeIn,
      onComplete: callback,
    })
  }

  render() {
    return (
      <div ref={c => (this.exit = c)}>
        {this.props.children}
      </div>
    )
  }
}

const ThemedComponentExit = Theme('ComponentExit')(ComponentExit)
export default ThemedComponentExit
