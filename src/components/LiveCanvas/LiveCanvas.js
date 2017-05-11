import React from 'react'
import Theme from 'js-theme'
import { View } from '@workflo/components'

type PropsT = {
  /* Rendered inside the canvas */
  children: React.Children,
  /* Zoom level from 0 to 200 */
  zoom: number,
  /* Pan from 0 (aligned left) to 100 (aligned right) */
  panX: number,
  /* Pan from 0 (aligned top) to 100 (aligned bottom) */
  panY: number,
  /* Width of the canvas in pixels */
  width: number,
  /* Height of the canvas in pixels */
  height: number,
  /* Called with the new zoom value when the user pinches to zoom */
  onChangeZoom: number => void,
}

const defaultProps = {
  zoom: 100,
  panX: 0,
  panY: 0,
  width: 800,
  height: 400,
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
    const { panX, panY, width, height } = this.props
    const contentHeight = this.canvas.scrollHeight
  }

  render() {
    const { children, theme, width, height, panX, panY, zoom } = this.props
    const zoomValue = zoom * 0.01
    return (
      <View
        {...theme.liveCanvas}
        ref={this.storeCanvas}
        onWheel={this.handleWheel}
        style={{
          width: width / zoomValue,
          height: height / zoomValue,
          ...getTransformStyle(zoomValue, panX, panY),
        }}
      >
        {children}
      </View>
    )
  }
}

const defaultTheme = () => {
  return {
    liveCanvas: {
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

const ThemedLiveCanvas = Theme('LiveCanvas', defaultTheme, { withRef: true })(LiveCanvas)
export default ThemedLiveCanvas
