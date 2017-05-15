import React from 'react'
import Theme from 'js-theme'
const ScrollToPlugin = require('gsap/ScrollToPlugin')
import { Power3, TweenMax } from 'gsap'
import '../../utils/insertFont'
import { ActionsT } from '../../types/Action'
import { SearchT } from '../../types/Search'
import { View } from '@workflo/components'
import { Colors, Spacing } from '@workflo/styles'

type AnimationT = Object

type SectionT = {
  element: React.Element,
  appearAnimation: AnimationT,
  leaveAnimation: AnimationT,
}

type LayoutT = {
  header?: React.Element | SectionT,
  content?: React.Element | SectionT,
  centerLeft?: React.Element | SectionT,
  centerRight?: React.Element | SectionT,
  bottom?: React.Element | SectionT,
}

type Props = {
  profile: Object,
  layout: LayoutT,
  backgroundColor: String,
  navigation: Object,
  actions: ActionsT,
  search: SearchT,
  screen: string,
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    if (this.props.screen !== prevProps.screen) {
      document.body.scrollTop = 0
    }
  }

  render() {
    const {
      profile,
      layout = {},
      navigation = {},
      backgroundColor,
      actions,
      search,
      screen,
      theme,
    } = this.props

    return (
      <View ref={ref => (this.container = ref)} {...theme.container}>
        {layout.header &&
          <View {...theme.header}>
            <View {...theme.center}>
              <View {...theme.maxWidth}>
                {layout.header}
              </View>
            </View>
          </View>}
        <View {...theme.content}>
          <View {...theme.center}>
            <View {...theme.maxWidth}>
              {(layout.centerLeft || layout.centerRight) &&
                <View {...theme.centerContainerWrapper}>
                  <View {...theme.centerContainer}>
                    <View {...theme.centerLeftContainer}>
                      {layout.centerLeft}
                    </View>
                    <View {...theme.centerRightContainer}>
                      {layout.centerRight}
                    </View>
                  </View>
                </View>}
              {layout.content}
            </View>
          </View>
        </View>
        {layout.bottom &&
          <View {...theme.bottom}>
            <View {...theme.center}>
              <View {...theme.maxWidth}>
                {layout.bottom}
              </View>
            </View>
          </View>}
      </View>
    )
  }
}

const defaultTheme = (props: Props) => ({
  container: {
    backgroundColor: Colors.grey900,
    color: Colors.grey200,
    display: 'flex',
    flex: '1 1',
    flexDirection: 'column',
    paddingBottom: Spacing.huge,
  },
  center: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  maxWidth: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    alignItems: 'stretch',
    flex: '1 1 auto',
    maxWidth: 1200,
  },
  header: {
    marginLeft: Spacing.large,
    marginRight: Spacing.large,
    marginTop: Spacing.small,
    boxSizing: 'border-box',
    ...mediumBreakpoint,
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    backgroundColor: props.backgroundColor,
    marginLeft: Spacing.large,
    marginRight: Spacing.large,
    ...mediumBreakpoint,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    color: Colors.grey700,
    marginBottom: Spacing.large,
    marginLeft: Spacing.large,
    marginRight: Spacing.large,
    ...mediumBreakpoint,
  },
  centerContainerWrapper: {
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 0 400px',
  },
  centerLeftContainer: {
    display: 'flex',
    flex: '0 1 60%',
    alignItems: 'stretch',
    '@media (max-width: 800px)': {
      flex: 1,
    },
  },
  centerRightContainer: {
    display: 'flex',
    flex: '0 1 40%',
    '@media (max-width: 800px)': {
      display: 'none',
    },
    overflow: 'scroll',
  },
})

const mediumBreakpoint = {
  '@media (max-width: 800px)': {
    marginLeft: Spacing.small,
    marginRight: Spacing.small,
  },
}

export default Theme('App', defaultTheme)(App)
