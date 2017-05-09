import React from 'react'
import Theme from 'js-theme'
import { Image, View } from '@workflo/components'
import { Colors, Spacing } from '@workflo/styles'
import ErrorView from '../ErrorView'

type Props = {
  children: React.Children,
  theme: Object,
  backgroundColor: string,
  alignment: {
    horizontal: 'Left' | 'Center' | 'Right',
    vertical: 'Top' | 'Center' | 'Bottom',
  },
}

const defaultProps = {
  backgroundColor: 'white',
  alignment: {
    horizontal: 'Center',
    vertical: 'Center',
  },
}

class Harness extends React.Component {
  props: Props
  static defaultProps = defaultProps

  state = {
    error: null,
  }

  unstable_handleError(error) {
    this.setState({ error })
  }

  render() {
    const { children, theme } = this.props

    if (this.state.error) {
      return (
        <View {...theme.Harness}>
          <View {...theme.errorContainer}>
            <ErrorView
              message={this.state.error.message}
              stacktrace={this.state.error.stack}
            />
          </View>
        </View>
      )
    } else {
      try {
        return (
          <View {...theme.Harness}>
            <View {...theme.previewContainer}>
              {children}
            </View>
          </View>
        )
      } catch (error) {
        return (
          <View {...theme.Harness}>
            <View {...theme.errorContainer}>
              <ErrorView message={error.message} stacktrace={error.stack} />
            </View>
          </View>
        )
      }
    }
  }
}

Harness.defaultProps = defaultProps

const defaultTheme = ({ backgroundColor, alignment }) => ({
  Harness: {
    backgroundColor,
    padding: Spacing.small,
    // borderRight: `1px solid ${Colors.grey200}`,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    // flex: '0 1 auto',
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'relative',
  },
  previewContainer: Object.assign(
    {},
    {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    getHorizontalAlignment(alignment.horizontal)
  ),
  errorContainer: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

const getHorizontalAlignment = horizontalAlignment => {
  switch (horizontalAlignment) {
    case 'Left':
      return { justifyContent: 'flex-start' }
    case 'Right':
      return { justifyContent: 'flex-end' }
    case 'Center':
      return { justifyContent: 'center' }
  }
}

const ThemedHarness = Theme('Harness', defaultTheme)(Harness)
export default ThemedHarness
