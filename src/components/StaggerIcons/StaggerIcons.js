/* @flow */
import React from 'react'
import Theme from 'js-theme'
import TweenMax from 'gsap'

class StaggerIcons extends React.Component {
  componentDidMount (callback) {
    const elChild = this.icons.childNodes;
    console.log(elChild);
    TweenMax.staggerFromTo(elChild, 0.5, {
      x: 10, 
      opacity: 0
    }, {
      x: 0, 
      opacity: 1, 
      ease: Power2.easeOut,
      onComplete: callback
    }, 0.08);
  }

  componentWillUnmount (callback) {
    const elChild = this.icons.childNodes;
    TweenMax.staggerTo(elChild, 0.5, {
      x: 10, 
      opacity: 0,
      ease: Power3.easeIn,
      onComplete: callback
    }, 0.08);
  }

  render () {
    return (
      <div ref={c => this.icons = c}>
        {this.props.children}
      </div>
    )
  }
}

const ThemedStaggerIcons = Theme('StaggerIcons')(StaggerIcons)
export default ThemedStaggerIcons
