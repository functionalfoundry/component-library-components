import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'
import { View } from '@workflo/components'
import { Spacing } from '@workflo/styles'
import ErrorView from '../ErrorView'
import LiveCanvas from '../LiveCanvas'
import Frame from '../Frame'

import { Helpers as TreeHelpers } from '../../modules/ComponentTree'

/**
 * Props
 */

type BundlesT = Object

type ErrorT = {
  message: string,
  stacktrace: string,
}

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
  /* Optionally pass in an error */
  error?: ErrorT,
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
 * Theming
 */

const defaultTheme = ({ backgroundColor }: Props) => ({
  backgroundColor,
})

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
    setTimeout(() => {
      this.updateDimensions()
    }, 0)
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
      error,
    } = this.props

    const { canvasWidth, canvasHeight } = this.state
    const harnessElement = (
      <Harness
        key="harness"
        backgroundColor={backgroundColor}
        alignment={alignment}
        error={error}
        width={canvasWidth}
        height={canvasHeight}
      />
    )
    if (error && canvasWidth !== undefined && canvasHeight !== undefined) {
      return (
        <div style={{ width: `100%`, height: `100%`, position: 'absolute' }}>
          {harnessElement}
        </div>
      )
    }

    return (
      <div
        style={{
          backgroundColor,
          width: `100%`,
          height: `100%`,
          position: 'absolute',
        }}
      >
        {canvasWidth !== undefined && canvasHeight !== undefined
          ? <LiveCanvas
              ref={c => (this.liveCanvas = c)}
              width={canvasWidth}
              height={canvasHeight}
              zoom={zoom}
              onChangeZoom={onChangeZoom}
              backgroundColor={backgroundColor}
            >
              <Frame
                name={name}
                tree={TreeHelpers.createTree(tree)}
                bundles={bundles}
                React={React}
                ReactDOM={ReactDOM}
                harnessElement={harnessElement}
                backgroundColor={backgroundColor}
                theme={{
                  frame: {
                    backgroundColor: backgroundColor,
                  },
                }}
              />
            </LiveCanvas>
          : null}
      </div>
    )
  }
}

const ThemedLivePreview = Theme('LivePreview', defaultTheme)(LivePreview)
export default ThemedLivePreview

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

  constructor(props: PropsT) {
    super(props)

    this.state = {
      error: props.error,
    }
  }

  unstable_handleError(error) {
    this.setState({ error })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== this.props.error) {
      this.setState({ error: nextProps.error })
    }
  }

  render() {
    const { children, backgroundColor, alignment, width, height } = this.props
    const { error } = this.state

    if (error) {
      return (
        <div style={getHarnessStyle(backgroundColor, true)}>
          <div style={errorContainerStyle}>
            <ErrorView
              message={error.message}
              stacktrace={error.stacktrace}
              width={width}
              height={height}
            />
          </div>
        </div>
      )
    } else {
      try {
        return (
          <div style={getHarnessStyle(backgroundColor)}>
            <div style={getPreviewContainerStyle(alignment)}>
              {children}
            </div>
          </div>
        )
      } catch (error) {
        return (
          <div style={getHarnessStyle(backgroundColor)}>
            <div style={errorContainerStyle}>
              <ErrorView message={error.message} stacktrace={error.stacktrace} />
            </div>
          </div>
        )
      }
    }
  }
}

const getHarnessStyle = (backgroundColor, hasError) => ({
  backgroundColor,
  boxSizing: 'border-box',
  position: 'relative',
  width: hasError ? '100%' : '100vw',
  height: hasError ? '100%' : '100vh',
})

const getPreviewContainerStyle = alignment =>
  Object.assign(
    {},
    {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'row',
      height: `100%`,
    },
    getVerticalAlignment(alignment.vertical),
    getHorizontalAlignment(alignment.horizontal)
  )

const errorContainerStyle = {}

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
