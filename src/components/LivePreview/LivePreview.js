import React from 'react'
import { Image, View } from '@workflo/components'
import { Colors, Spacing } from '@workflo/styles'
import ErrorView from '../ErrorView'
import LiveCanvas from '../LiveCanvas'
import Frame from '../Frame'

type BundleMapT = object
type ImplementationMapT = object

type Props = {
  /* Takes a map from component names to component functions / classes and returns the composite component tree */
  realizeComponentTree: ImplementationMapT => React$element,
  /* Map from component names to bundle strings */
  bundleMap: BundleMapT,
  /* The React object to use inside the iFrame (in the future should this be a string and get evaluated in the iFrame?) */
  React?: any,
  /* The ReactDOM object to use inside the iFrame */
  ReactDOM?: any,
  /* A unique ID for the iFrame */
  name: string,
  /* The background color for the harness */
  backgroundColor: string,
  zoom: number,
  onChangeZoom: Function,
  /* Horizontal and vertical alignments that get rendered with flexbox */
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

const LivePreview = ({
  name,
  bundleMap,
  realizeComponentTree,
  React,
  ReactDOM,
  propMap,
  zoom,
  onChangeZoom,
  backgroundColor,
  alignment,
}) => {
  const harnessElement = (
    <Harness backgroundColor={backgroundColor} alignment={alignment} />
  )
  return (
    <LiveCanvas zoom={zoom} onChangeZoom={onChangeZoom}>
      <Frame
        name={name}
        bundleMap={bundleMap}
        realizeComponentTree={realizeComponentTree}
        React={React}
        ReactDOM={ReactDOM}
        harnessElement={harnessElement}
      />
    </LiveCanvas>
  )
}

export default LivePreview

class Harness extends React.Component {
  // props: Props
  static defaultProps = defaultProps

  state = {
    error: null,
  }

  unstable_handleError(error) {
    this.setState({ error })
  }

  render() {
    const { children, theme, backgroundColor, alignment } = this.props

    if (this.state.error) {
      return (
        <View style={getHarnessStyle(backgroundColor)}>
          <View style={errorContainerStyle}>
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
          <View style={getHarnessStyle(backgroundColor)}>
            <View style={getPreviewContainerStyle(alignment)}>
              {children}
            </View>
          </View>
        )
      } catch (error) {
        return (
          <View style={getHarnessStyle(backgroundColor)}>
            <View style={errorContainerStyle}>
              <ErrorView message={error.message} stacktrace={error.stack} />
            </View>
          </View>
        )
      }
    }
  }
}

LivePreview.defaultProps = defaultProps

const getHarnessStyle = backgroundColor => ({
  backgroundColor,
  padding: Spacing.small,
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  position: 'relative',
})

const getPreviewContainerStyle = alignment =>
  Object.assign(
    {},
    {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    getHorizontalAlignment(alignment.horizontal)
  )

const errorContainerStyle = {
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'row',
  justifyContent: 'center',
}

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
