import React from 'react'
import Theme from 'js-theme'
import { Image, View } from '@workflo/components'
import { Colors, Spacing } from '@workflo/styles'
import ErrorView from '../ErrorView'

type Props = {
  element: React.Element,
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

class LivePreview extends React.Component {
  props: Props
  static defaultProps = defaultProps

  state = {
    error: null,
  }

  unstable_handleError(error) {
    this.setState({ error })
  }

  render() {
    const { element, theme } = this.props

    if (this.state.error) {
      return (
        <View {...theme.livePreview}>
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
          <View {...theme.livePreview}>
            <View {...theme.previewContainer}>
              {element}
            </View>
          </View>
        )
      } catch (error) {
        return (
          <View {...theme.livePreview}>
            <View {...theme.errorContainer}>
              <ErrorView message={error.message} stacktrace={error.stack} />
            </View>
          </View>
        )
      }
    }
  }
}

LivePreview.defaultProps = defaultProps

const defaultTheme = ({ backgroundColor, alignment }) => ({
  livePreview: {
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

const ThemedLivePreview = Theme('LivePreview', defaultTheme)(LivePreview)
export default ThemedLivePreview
