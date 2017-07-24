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
  onWheel: Function,
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

  storeComponentContainer = c => {
    this.componentContainer = c
  }

  // TODO: Implement this once we have a better sense of panning UX
  setScrollPosition = () => {
    const { panX, panY, containerWidth, containerHeight } = this.props
    const contentHeight = this.componentContainer.scrollHeight
  }

  render() {
    const {
      children,
      theme,
      containerWidth,
      containerHeight,
      onWheel,
      panX,
      panY,
      zoom,
    } = this.props
    const zoomValue = zoom * 0.01
    return (
      <div onWheel={onWheel} {...theme.liveCanvas}>
        <div {...theme.center}>
          <div
            {...theme.componentPreviewContainer}
            ref={this.storeComponentContainer}
            style={{
              width: containerWidth,
              height: containerHeight,
              ...getTransformStyle(zoomValue, panX, panY),
            }}
          >
            {children}
          </div>
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
      zIndex: 0,
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
