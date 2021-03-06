import React from 'react'
import Theme from 'js-theme'
import { View } from '@workflo/components'
import { Borders, Colors, Spacing, Fonts } from '@workflo/styles'
import TweenMax from 'gsap'

type PropsT = {
  message: string,
  stacktrace: string,
  theme: Object,
  width: number,
  height: number,
}

const defaultProps = {
  message: '',
  stacktrace: '',
  width: 0,
  height: 0,
}

class ErrorView extends React.Component {
  componentDidMount(callback) {
    const eBorder = this.errorBorder
    const timeDelay = 0.2
    const { width, height } = this.props

    TweenMax.to(eBorder, timeDelay, {
      boxShadow: `0px 0px 0px 3px ${Colors.red400}`,
      ease: Sine.easeOut,
      width,
      height,
    })
    TweenMax.to(eBorder, 0.1, {
      x: -2,
      delay: timeDelay,
      ease: Quad.easeInOut,
      width,
      height,
    })
    TweenMax.to(eBorder, 0.1, {
      repeat: 6,
      x: 2,
      yoyo: true,
      delay: timeDelay + 0.1,
      ease: Quad.easeInOut,
      width,
      height,
    })
    TweenMax.to(eBorder, 0.1, {
      x: 0,
      delay: timeDelay + 0.1 * 6,
      onComplete: callback,
      width,
      height,
    })
  }

  render() {
    return (
      <div ref={c => (this.errorBorder = c)}>
        <ThemedInnerErrorView {...this.props} />
      </div>
    )
  }
}

/**
 *  JS Theme special cases the case where the outter most element matches
 *  the component name. Since errorBorder needs to be on the outside we need
 *  this to be a separate component with matching top level element and component name
 */
const InnerErrorView = ({ message, stacktrace, theme }: PropsT) => (
  <View {...theme.innerErrorView}>
    <View {...theme.errorMessage}>
      {message}
    </View>
    <View {...theme.errorStacktrace}>
      {stacktrace}
    </View>
  </View>
)

const defaultTheme = {
  innerErrorView: {
    ...Fonts.base,
    color: Colors.red400,
    backgroundColor: 'white',
    padding: Spacing.tiny,
    overflow: 'auto',
    height: '100%',
  },
  errorMessage: {
    fontWeight: 'bold',
    marginBottom: Spacing.small,
    whiteSpace: 'pre-wrap',
  },
  errorStacktrace: {
    whiteSpace: 'pre',
  },
}

const ThemedInnerErrorView = Theme('InnerErrorView', defaultTheme)(InnerErrorView)
export default ErrorView
