import React from 'react'
import Theme from 'js-theme'
import {Colors} from '@workflo/styles'

class App extends React.Component {
  static defaultProps = {
    backgroundColor: Colors.grey900,
  };

  componentDidMount () {
    this.updateBodyBackgroundColor(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.updateBodyBackgroundColor(nextProps)
  }

  updateBodyBackgroundColor = props => {
    const {backgroundColor} = props
    const body = document.getElementsByTagName('html')[0]
    console.log('update to: ', `background-color: ${backgroundColor};`)
    body.style = `background-color: ${backgroundColor};`
  };

  render () {
    const {theme, layout, backgroundColor} = this.props
    const {header, centerLeft, centerRight, bottom} = layout
    return (
      <div {...theme.app} id='app'>
        <header {...theme.header}>
          {header}
        </header>
        <main {...theme.main}>
          <div {...theme.centerLeft}>
            {centerLeft}
          </div>
          <div {...theme.centerRight}>
            {centerRight}
          </div>
        </main>
        <footer {...theme.bottom}>
          {bottom}
        </footer>
      </div>
    )
  }
}

const headerheight = '163px'
const centerHeight = 350

const opacity = {
  opacity: 0.8,
}

const getCenterSideStyle = flexGrow => {
  return {
    height: centerHeight,
    flexGrow: flexGrow,
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    perspective: 1000,
    display: 'flex',
  }
}

const defaultTheme = (
  {
    backgroundColor,
  },
) => ({
  app: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  header: {
    width: '100%',
    height: headerheight,
  },
  main: {
    width: '100%',
    position: 'relative',
    display: 'flex',
  },
  centerLeft: {
    ...getCenterSideStyle(3),
  },
  centerRight: {
    ...getCenterSideStyle(1),
  },
  bottom: {
    width: '100%',
  },
})

const ThemedApp = Theme('App', defaultTheme)(App)
export default ThemedApp
