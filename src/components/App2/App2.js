/* @flow */
import React from 'react'
import Theme from 'js-theme'
import { Colors } from '@workflo/styles'

type SectionT = {
  element: React.Element<any>,
  layout: {
    height?: Number,
  },
}

class App extends React.Component {
  static defaultProps = {
    backgroundColor: Colors.grey900,
  }

  componentDidMount() {
    this.updateBodyBackgroundColor(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const liveTiming = 0.5,
          liveScale = 0.94,
          liveEase = Power1.easeOut;
    this.updateBodyBackgroundColor(nextProps)
    if (nextProps.sections.centerRight && !this.props.sections.centerRight) {
      console.clear()
      console.log('live view')
      TweenMax.from(this.centerRight, liveTiming, {
        scale: liveScale,
        transformOrigin: '0% 0%',
        ease: liveEase
      })
      TweenMax.from(this.centerLeft, liveTiming, {
        scale: liveScale,
        transformOrigin: '100% 0%',
        ease: liveEase,
      })
    }
    if (this.props.sections.centerRight && !nextProps.sections.centerRight) {
      //collection of components
      console.clear()
      console.log('collection')
      TweenMax.from(this.centerMain, liveTiming, {
        scale: 0.95,
        y: 10,
        transformOrigin: '50% 50%',
        ease: liveEase,
      })
    }

    if (nextProps.sections.bottom && !this.props.sections.bottom) {
      //live view
      console.log('new bottom live view')
      TweenMax.fromTo(this.bottom, liveTiming, {
        y: 10,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        ease: liveEase,
      })
    }
    if (this.props.sections.bottom && !nextProps.sections.bottom) {
      console.log('return')
    }
  }

  updateBodyBackgroundColor = props => {
    const { backgroundColor } = props
    const body = document.getElementsByTagName('html')[0]
    console.log('update to: ', `background-color: ${backgroundColor};`)
    TweenMax.to(body, 0.2, {
      backgroundColor: `${backgroundColor}`,
      ease: Power3.easeOut
    })
  }

  storeCenterRight = c => (this.centerRight = c)
  storeCenterLeft = c => (this.centerLeft = c)
  storeMain = c => (this.centerMain = c)
  storeBottom = c => (this.bottom = c)

  render() {
    const { theme, sections, backgroundColor } = this.props
    const { header, filters, centerLeft, centerRight, bottom } = sections
    return (
      <div {...theme.app} id="app">
        {header &&
          <header {...theme.header}>
            <div {...theme.headerContent}>
              {header.element}
            </div>
          </header>}
        {filters && <div {...theme.filters} />}
        {(centerLeft || centerRight) &&
          <main {...theme.main} ref={this.storeMain}>
            <div {...theme.centerLeft} ref={this.storeCenterLeft}>
              {centerLeft && centerLeft.element}
            </div>
            <div {...theme.centerRight} ref={this.storeCenterRight}>
              {centerRight && centerRight.element}
            </div>
          </main>}

        <footer {...theme.bottom} ref={this.storeBottom}>
          {bottom && bottom.element}
        </footer>
      </div>
    )
  }
}

const headerheight = '163px'
const defaultCenterHeight = verticalSizes.Base

const opacity = {
  opacity: 0.8,
}

const getCenterSideStyle = (flexGrow, sections) => {
  return {
    height: getCenterHeight(sections),
    flexGrow: flexGrow,
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    perspective: 1000,
    display: 'flex',
  }
}

const appWidth = {
  width: 1200,
  alignSelf: 'center',
}

const defaultTheme = ({ backgroundColor, sections }) => ({
  app: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  header: {
    height: headerheight,
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: Colors.grey900,
  },
  headerContent: {
    ...appWidth,
  },
  filters: {
    height: 50,
    width: `100%`,
  },
  main: {
    ...appWidth,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  centerLeft: {
    ...getCenterSideStyle(getCenterLeftGrow(sections.centerLeft), sections),
  },
  centerRight: {
    ...getCenterSideStyle(getCenterRightGrow(sections.centerRight), sections),
  },
  bottom: {
    ...appWidth,
  },
})

const getCenterLeftGrow = centerLeft => (centerLeft ? 3 : 0)

const getCenterRightGrow = centerRight => (centerRight ? 1 : 0)

const getCenterHeight = sections => {
  const { centerLeft, centerRight } = sections
  const leftHeight =
    (centerLeft && centerLeft.layout && centerLeft.layout.height) || defaultCenterHeight
  const rightHeight =
    (centerRight && centerRight.layout && centerRight.layout.height) ||
    defaultCenterHeight
  if (leftHeight !== defaultCenterHeight) return leftHeight
  if (rightHeight !== defaultCenterHeight) return rightHeight
  return defaultCenterHeight
}

const ThemedApp = Theme('App', defaultTheme)(App)
export default ThemedApp
