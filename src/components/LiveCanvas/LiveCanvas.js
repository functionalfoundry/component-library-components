import React from 'react'
import Theme from 'js-theme'
import { View } from '@workflo/components'
import { Fonts, Colors, Spacing } from '@workflo/styles'

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
  /** JS-theme theme */
  theme: Object,
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
      theme, // eslint-disable-line no-unused-vars
      containerWidth,
      containerHeight,
      canvasWidth,
      canvasHeight,
      onWheel,
      panX, // eslint-disable-line no-unused-vars
      panY, // eslint-disable-line no-unused-vars
      zoom,
    } = this.props
    const zoomValue = zoom * 0.01
    const actualContainerWidth = containerWidth * zoomValue
    const actualContainerHeight = containerHeight * zoomValue
    /** Currently the panning values are calculated to center the container
     *  inside the canvas.
     *  TODO: Apply the original pan values ontop to achieve the desired offset
     */

    const newPanX = (canvasWidth - actualContainerWidth) / 2
    const newPanY = (canvasHeight - actualContainerHeight) / 2
    return (
      <div onWheel={onWheel} {...theme.liveCanvas}>
        <div
          {...theme.artBoardContainer}
          style={getArtboardContainerTransformStyle(zoomValue, newPanX, newPanY)}
        >
          <div
            {...theme.artBoard}
            ref={this.storeComponentContainer}
            style={{
              width: containerWidth,
              height: containerHeight,
              // ...getTransformStyle(zoomValue, newPanX, newPanY),
            }}
          >
            {children}
          </div>
          <div
            {...theme.artBoardDimensionLabel}
            style={getTextTransformStyle(zoomValue, newPanX, newPanY, containerHeight)}
          >
            {containerWidth}x{containerHeight}
          </div>
        </div>
      </div>
    )
  }
}

const defaultTheme = ({ backgroundColor }: PropsT) => {
  return {
    liveCanvas: {
      backgroundColor: 'white',
      flexGrow: 1,
      overflow: 'hidden',
    },
    artBoardContainer: {
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'column',
      transformOrigin: 'left top',
    },
    artBoard: {
      backgroundColor,
      boxSizing: 'border-box',
      overflow: 'scroll',
    },
    artBoardDimensionLabel: {
      ...Fonts.small,
      color: Colors.grey600,
      transformOrigin: 'left top',
    },
  }
}

const getArtboardContainerTransformStyle = (zoom, panX, panY) => {
  let transforms = []
  zoom && transforms.push(`scale(${zoom})`)
  panX && transforms.push(`translateX(${panX / zoom}px)`)
  panY && transforms.push(`translateY(${panY / zoom}px)`)
  if (transforms.length === 0) return {}
  return {
    transform: transforms.join(' '),
  }
}

const getTextTransformStyle = (zoom, panX, panY, containerHeight) => {
  let transforms = []
  zoom && transforms.push(`scale(${1 / zoom})`)
  if (transforms.length === 0) return {}
  return {
    transform: transforms.join(' '),
  }
}

const ThemedLiveCanvas = Theme('LiveCanvas', defaultTheme, {
  withRef: true,
})(LiveCanvas)
export default ThemedLiveCanvas
