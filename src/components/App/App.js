/* @flow */

import React from 'react'
import Theme from 'js-theme'
import '../../utils/insertFont'
import { View } from '@workflo/components'
import { Colors, Spacing } from '@workflo/styles'
import { type SectionsT } from '../App2'

type PropsT = {
  profile: Object,
  sections: SectionsT,
  backgroundColor: String,
  navigation: Object,
  screen: string,
  theme: any,
}

class App extends React.Component {
  props: PropsT
  container: React.Element<any>

  componentDidUpdate(prevProps) {
    if (this.props.screen !== prevProps.screen) {
      document.body.scrollTop = 0
    }
  }

  render() {
    const { sections = {}, theme } = this.props

    return (
      <View ref={ref => (this.container = ref)} {...theme.container}>
        {sections.header &&
          <View {...theme.header}>
            <View {...theme.center}>
              <View {...theme.maxWidth}>
                {sections.header.element}
              </View>
            </View>
          </View>}
        <View {...theme.content}>
          <View {...theme.center}>
            <View {...theme.maxWidth}>
              {(sections.centerLeft || sections.centerRight) &&
                <View {...theme.centerContainerWrapper}>
                  <View {...theme.centerContainer}>
                    {sections.centerLeft &&
                      <View {...theme.centerLeftContainer}>
                        {sections.centerLeft.element}
                      </View>}
                    {sections.centerRight &&
                      <View {...theme.centerRightContainer}>
                        {sections.centerRight.element}
                      </View>}
                  </View>
                </View>}
            </View>
          </View>
        </View>
        {sections.bottom &&
          <View {...theme.bottom}>
            <View {...theme.center}>
              <View {...theme.maxWidth}>
                {sections.bottom.element}
              </View>
            </View>
          </View>}
      </View>
    )
  }
}

const defaultTheme = ({ sections, backgroundColor }: PropsT) => ({
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
    backgroundColor: backgroundColor,
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
    ...(sections.centerLeft && sections.centerRight
      ? {
          flex: '0 1 60%',
        }
      : {}),
    alignItems: 'stretch',
    '@media (max-width: 800px)': {
      flex: 1,
    },
  },
  centerRightContainer: {
    display: 'flex',
    ...(sections.centerLeft && sections.centerRight
      ? {
          flex: '0 1 40%',
        }
      : {}),
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
