import React from 'react'
import ReactDOM from 'react-dom'
import { View } from '@workflo/components'
import { Spacing } from '@workflo/styles'
import ErrorView from '../ErrorView'
import LiveCanvas from '../LiveCanvas'
import Frame from '../Frame'

const TreeUtils = require('../../utils/CompositeComponents/ComponentTreeUtils')

/**
 * Props
 */

type BundlesT = Object

type PropsT = {
  /** * A raw component tree */
  tree: Object,
  /** Map from tree component IDs to bundle strings */
  bundles: BundlesT,
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
  alignment: AlignmentT,
}

/**
 * Default props
 */

const defaultProps = {
  backgroundColor: 'white',
  alignment: {
    horizontal: 'Center',
    vertical: 'Center',
  },
}

/**
 * State
 */

type StateT = {
  canvasWidth: ?number,
  canvasHeight: ?number,
}

/**
 * LivePreview component
 */

class LivePreview extends React.Component {
  props: PropsT
  state: StateT

  defaultProps = defaultProps

  liveCanvas = null

  constructor(props: PropsT) {
    super(props)

    this.state = {
      canvasWidth: undefined,
      canvasHeight: undefined,
    }
  }

  getDimensions = () => {
    const node = ReactDOM.findDOMNode(this)
    return {
      width: node !== null ? node.offsetWidth : 0,
      height: node !== null ? node.offsetHeight : 0,
    }
  }

  updateDimensions = () => {
    const dimensions = this.getDimensions()
    this.setState({
      canvasWidth: dimensions.width,
      canvasHeight: dimensions.height,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
    this.updateDimensions()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  render() {
    const {
      name,
      tree,
      bundles,
      React,
      ReactDOM,
      zoom,
      onChangeZoom,
      backgroundColor,
      alignment,
    } = this.props

    const { canvasWidth, canvasHeight } = this.state

    const harnessElement = (
      <Harness backgroundColor={backgroundColor} alignment={alignment} />
    )

    return (
      <View>
        {canvasWidth !== undefined && canvasHeight !== undefined
          ? <LiveCanvas
              ref={c => (this.liveCanvas = c)}
              width={canvasWidth}
              height={canvasHeight}
              zoom={zoom}
              onChangeZoom={onChangeZoom}
            >
              <Frame
                name={name}
                tree={TreeUtils.createTree(tree)}
                bundles={bundles}
                React={React}
                ReactDOM={ReactDOM}
                harnessElement={harnessElement}
                theme={{
                  frame: {
                    backgroundColor: backgroundColor,
                  },
                }}
              />
            </LiveCanvas>
          : null}
      </View>
    )
  }
}

export default LivePreview

/**
 * Harness component
 */

type AlignmentT = {
  horizontal: 'Left' | 'Center' | 'Right',
  vertical: 'Top' | 'Center' | 'Bottom',
}

type HarnessPropsT = {
  alignment: AlignmentT,
  backgroundColor: string,
  children: React.Children,
  theme: any,
}

class Harness extends React.Component {
  props: HarnessPropsT
  static defaultProps = defaultProps

  state = {
    error: null,
  }

  unstable_handleError(error) {
    this.setState({ error })
  }

  render() {
    const { children, backgroundColor, alignment } = this.props

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

const getHarnessStyle = backgroundColor => ({
  backgroundColor,
  boxSizing: 'border-box',
  padding: Spacing.small,
  display: 'flex',
  flexDirection: 'row',
  flex: '1 1 auto',
  position: 'relative',
  width: '100vw',
  height: '100vh',
})

const getPreviewContainerStyle = alignment =>
  Object.assign(
    {},
    {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'row',
    },
    getVerticalAlignment(alignment.vertical),
    getHorizontalAlignment(alignment.horizontal)
  )

const errorContainerStyle = {
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'row',
  justifyContent: 'center',
}

const getVerticalAlignment = verticalAlignment => {
  switch (verticalAlignment) {
    case 'Top':
      return { alignItems: 'flex-start' }
    case 'Bottom':
      return { alignItems: 'flex-end' }
    case 'Center':
    default:
      return { alignItems: 'center' }
  }
}

const getHorizontalAlignment = horizontalAlignment => {
  switch (horizontalAlignment) {
    case 'Left':
      return { justifyContent: 'flex-start' }
    case 'Right':
      return { justifyContent: 'flex-end' }
    case 'Center':
    default:
      return { justifyContent: 'center' }
  }
}
