import React from 'react'
import Theme from 'js-theme'
import { View } from '@workflo/components'
import { Colors } from '@workflo/styles'

type PropsT = {
  /* Background color to use for the canvas */
  backgroundColor: string,
  /* Rendered inside the canvas */
  children: React.Children,
  /* Zoom level from 0 to 200 */
  zoom: number,
  /* Pan from 0 (aligned left) to 100 (aligned right) */
  panX: number,
  /* Pan from 0 (aligned top) to 100 (aligned bottom) */
  panY: number,
  /* Width of the canvas in pixels */
  canvasWidth: number,
  /* Height of the canvas in pixels */
  canvasHeight: number,
  /* Width of the container in pixels */
  containerWidth: number,
  /* Height of the container in pixels */
  containerHeight: number,
  /* Called with the new zoom value when the user pinches to zoom */
  onChangeZoom: number => void,
}

const defaultProps = {
  backgroundColor: 'white',
  zoom: 100,
  panX: 0,
  panY: 0,
  containerWidth: 800,
  containerHeight: 400,
  onChangeZoom: () => {},
}

const ZOOM_FACTOR = 1

/* Renders content inside a zoomable and pannable canvas */
class LiveCanvas extends React.Component {
  props: PropsT
  static defaultProps = defaultProps

  handleWheel = e => {
    const { onChangeZoom, zoom } = this.props
    if (e.ctrlKey) {
      e.preventDefault()
      // This is a mac pinch to zoom event (looks like ctl scroll)
      onChangeZoom(zoom - e.deltaY * ZOOM_FACTOR)
    }
  }

  storeCanvas = c => (this.canvas = c)

  // TODO: Implement this once we have a better sense of panning UX
  setScrollPosition = () => {
    const { panX, panY, containerWidth, containerHeight } = this.props
    const contentHeight = this.canvas.scrollHeight
  }

  render() {
    const {
      children,
      theme,
      containerWidth,
      containerHeight,
      panX,
      panY,
      zoom,
    } = this.props
    const zoomValue = zoom * 0.01
    return (
      <div onWheel={this.handleWheel} {...theme.liveCanvas}>
        <div {...theme.center}>
          <View
            {...theme.componentPreviewContainer}
            ref={this.storeCanvas}
            style={{
              // width: containerWidth / zoomValue,
              // height: containerHeight / zoomValue,
              ...getTransformStyle(zoomValue, panX, panY),
            }}
          >
            {children}
          </View>
        </div>
      </div>
    )
  }
}

const defaultTheme = ({ backgroundColor }: PropsT) => {
  return {
    liveCanvas: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: Colors.grey100,
    },
    center: {
      display: 'flex',
      flex: '1',
    },
    componentPreviewContainer: {
      backgroundColor,
      boxSizing: 'border-box',
      transformOrigin: 'top left',
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'scroll',
    },
  }
}

const getTransformStyle = (zoom, panX, panY) => {
  let transforms = []
  zoom && transforms.push(`scale(${zoom})`)
  panX && transforms.push(`translateX(${panX}px)`)
  panY && transforms.push(`translateY(${panY}px)`)
  if (transforms.length === 0) return {}
  return {
    transform: transforms.join(' '),
  }
}

const ThemedLiveCanvas = Theme('LiveCanvas', defaultTheme, {
  withRef: true,
})(LiveCanvas)
export default ThemedLiveCanvas
