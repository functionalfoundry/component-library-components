/* @flow */
import React from 'react'
import Theme from 'js-theme'
import { Colors, Spacing } from '@workflo/styles'
import { verticalSizes } from '../../utils/sizes'
import { Power1, Power3, Power4, TweenMax } from 'gsap'

type SectionT = {
  element: React.Element<any>,
  layout?: {
    height?: Number,
  },
}

type SectionsT = {
  header?: SectionT,
  centerRight?: SectionT,
  centerLeft?: SectionT,
  centerMain?: SectionT,
  bottom?: SectionT,
}

type PropsT = {
  theme: Object,
  sections: SectionsT,
  backgroundColor: string,
}

class App extends React.Component {
  props: PropsT

  static defaultProps = {
    backgroundColor: Colors.grey900,
    sections: {},
  }

  header: ?React.Component<any>
  centerLeft: ?React.Component<any>
  centerRight: ?React.Component<any>
  centerMain: ?React.Component<any>
  bottom: ?React.Component<any>

  componentDidMount() {
    this.updateBodyBackgroundColor(this.props)
  }

  componentWillReceiveProps(nextProps: PropsT) {
    const liveTiming = 0.5
    const liveScale = 0.94
    const liveEase = Power1.easeOut

    this.updateBodyBackgroundColor((nextProps: PropsT))
    if (nextProps.sections.centerRight && !this.props.sections.centerRight) {
      TweenMax.from(this.centerRight, liveTiming, {
        scale: 0.3,
        opacity: 0,
        transformOrigin: '100% 0%',
        ease: Power4.easeOut,
      })
      TweenMax.from(this.centerLeft, liveTiming, {
        scale: liveScale,
        transformOrigin: '100% 0%',
        ease: liveEase,
      })
    }
    if (this.props.sections.centerRight && !nextProps.sections.centerRight) {
      // removing this view
    }
    if (nextProps.sections.bottom && !this.props.sections.bottom) {
      TweenMax.fromTo(
        this.bottom,
        liveTiming,
        {
          y: 300,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: Power4.easeOut,
        }
      )
    }
  }

  updateBodyBackgroundColor = props => {
    const { backgroundColor } = props
    TweenMax.to('html', 0.2, {
      backgroundColor: `${backgroundColor}`,
      ease: Power3.easeOut,
    })
  }

  storeCenterRight = c => (this.centerRight = c)
  storeCenterLeft = c => (this.centerLeft = c)
  storeMain = c => (this.centerMain = c)
  storeBottom = c => (this.bottom = c)

  render() {
    const { theme, sections } = this.props
    const { header, centerLeft, centerRight, bottom } = sections
    return (
      <div {...theme.app} id="app">
        {header &&
          <header {...theme.header}>
            <div {...theme.headerContent}>
              {header.element}
            </div>
          </header>}
        {/** filters && <div {...theme.filters} /> */}
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

const defaultCenterHeight = verticalSizes.Base

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
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: Colors.grey900,
    paddingTop: Spacing.tiny,
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
    flexBasis: sections.centerRight ? 260 : 0,
  },
  bottom: {
    ...appWidth,
    paddingTop: sections.bottom ? 10 : 0,
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
