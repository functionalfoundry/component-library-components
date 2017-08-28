import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'
import { Trigger } from '@workflo/components'
import { Colors, Spacing } from '@workflo/styles'
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
  /** A raw component tree */
  tree: Object,
  /** Map from tree component IDs to bundle strings */
  bundles: BundlesT,
  /** The user-specified pixel width of the contianer that is then scaled */
  containerWidth: number,
  /** The user-specified pixel height of the contianer that is then scaled */
  containerHeight: number,
  /** The React object to use inside the iFrame (in the future should this be a string and get evaluated in the iFrame?) */
  React?: any,
  /** The ReactDOM object to use inside the iFrame */
  ReactDOM?: any,
  /** A unique ID for the iFrame */
  name: string,
  /** Less than 100 means shrink more than 100 means zoom in */
  zoom: number,
  /** Called quickly while the user is performing a continuous zoom action */
  onChangeZoom: Function,
  /** Optionally pass in an error */
  error?: ErrorT,
}

/**
 * Default props
 */

const defaultProps = {
  containerWidth: 600,
  containerHeight: 250,
}

/**
 * State
 */

type StateT = {
  canvasWidth: ?number,
  canvasHeight: ?number,
  zoom: number,
}

/**
 * Theming
 */

const defaultTheme = {}

/**
 * LivePreview component
 */

const minPadding = Spacing.base
const minContainerWidth = 60
const minContainerHeight = 60

class LivePreview extends React.Component {
  props: PropsT
  state: StateT

  liveCanvas = null

  constructor(props: PropsT) {
    super(props)
    this.state = {
      canvasWidth: undefined,
      canvasHeight: undefined,
      zoom: 100,
      zoomHasBeenChangedByUser: false,
      isContainerFocused: false,
    }
  }

  getDimensions = () => {
    const node = ReactDOM.findDOMNode(this)
    return {
      width: node !== null ? node.offsetWidth : 0,
      height: node !== null ? node.offsetHeight : 0,
    }
  }

  getInitialZoom = (canvasWidth, canvasHeight) => {
    const { containerWidth, containerHeight } = this.props
    if (containerWidth < canvasWidth && containerHeight < canvasHeight) return 100
    if (containerWidth / canvasWidth > containerHeight / canvasHeight) {
      return (canvasWidth - 2 * minPadding) / (containerWidth / 100)
    } else {
      return (canvasHeight - 2 * minPadding) / (containerHeight / 100)
    }
  }

  updateDimensions = () => {
    const dimensions = this.getDimensions()
    // QUESTION: Should we re-enable only doing scale-to-fit when zoom hasn't
    // been changed by user? Disabling that behavior for now.
    this.setState({
      canvasWidth: dimensions.width,
      canvasHeight: dimensions.height,
      zoom: this.getInitialZoom(dimensions.width, dimensions.height),
    })
  }

  handleChangeContainerFocused = isContainerFocused =>
    this.setState({ isContainerFocused })

  handleWheel = e => {
    if (this.state.isContainerFocused) return
    const { containerWidth, containerHeight } = this.props
    if (e.ctrlKey) {
      e.preventDefault()
      // This is a mac pinch to zoom event (looks like ctl scroll)
      const nextZoom = this.state.zoom - e.deltaY

      // Enforce a minimum zoom level
      if (
        nextZoom * containerWidth / 100 < minContainerWidth ||
        nextZoom * containerHeight / 100 < minContainerHeight
      ) {
        return
      }

      // Enforce a maximum zoom level at 5 times the container dimensions
      if (nextZoom > 500) return

      this.setState({ zoom: nextZoom, zoomHasBeenChangedByUser: true })
    }
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
      containerWidth,
      containerHeight,
      name,
      tree,
      bundles,
      React,
      ReactDOM,
      error,
    } = this.props

    const { canvasWidth, canvasHeight, isContainerFocused, zoom } = this.state
    const harnessElement = (
      <Harness
        key="harness"
        error={error}
        width={canvasWidth}
        height={canvasHeight}
        onWheel={this.handleWheel}
        onChangeContainerFocused={this.handleChangeContainerFocused}
        isContainerFocused={isContainerFocused}
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
          backgroundColor: Colors.grey100,
          width: `100%`,
          height: `100%`,
          position: 'absolute',
          overflow: 'hidden',
        }}
      >
        {canvasWidth !== undefined && canvasHeight !== undefined
          ? <LiveCanvas
              ref={c => (this.liveCanvas = c)}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              containerWidth={containerWidth}
              containerHeight={containerHeight}
              zoom={zoom}
              onWheel={this.handleWheel}
            >
              <Frame
                name={name}
                tree={TreeHelpers.createTree(tree)}
                bundles={bundles}
                React={React}
                ReactDOM={ReactDOM}
                harnessElement={harnessElement}
                theme={{
                  frame: {
                    backgroundColor: Colors.grey100,
                  },
                }}
              />
            </LiveCanvas>
          : null}
      </div>
    )
  }
}

LivePreview.defaultProps = defaultProps

const ThemedLivePreview = Theme('LivePreview', defaultTheme)(LivePreview)
export default ThemedLivePreview

/**
 * Harness component
 */

type HarnessPropsT = {
  width: number,
  height: number,
  children: React.Node,
  onWheel: Function,
  onChangeContainerFocused: Function,
  isContainerFocused: boolean,
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

  handleClick = () => {
    this.props.onChangeContainerFocused(true)
  }

  handleClickOutside = () => {
    this.props.onChangeContainerFocused(false)
  }

  render() {
    const { children, width, height, onWheel, isContainerFocused } = this.props
    const { error } = this.state

    if (error) {
      return (
        <div style={getHarnessStyle(true)}>
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
          <Trigger triggerOn={['Click outside']} onTrigger={this.handleClickOutside}>
            <div
              style={getHarnessStyle(false, isContainerFocused)}
              onClick={this.handleClick}
              onWheel={onWheel}
            >
              <div style={previewContainerStyle}>
                {children}
              </div>
            </div>
          </Trigger>
        )
      } catch (error) {
        return (
          <div style={getHarnessStyle()}>
            <div style={errorContainerStyle}>
              <ErrorView message={error.message} stacktrace={error.stacktrace} />
            </div>
          </div>
        )
      }
    }
  }
}

const getHarnessStyle = (hasError, isContainerFocused) => ({
  boxSizing: 'border-box',
  position: 'relative',
  width: hasError ? '100%' : '100vw',
  height: hasError ? '100%' : '100vh',
  border: isContainerFocused ? `1px solid ${Colors.grey200}` : 'none',
})

const previewContainerStyle = {
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'row',
  height: `100%`,
  alignItems: 'center',
  justifyContent: 'center',
}

const errorContainerStyle = {}
