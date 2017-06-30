import React from 'react'
import Theme from 'js-theme'

type PropsT = {}

class Building extends React.Component {
  componentDidMount() {
    TweenMax.to('#pulse-move', 9, {
      x: -1000,
      repeat: -1,
      ease: Linear.easeNone,
    })

    TweenMax.fromTo(
      '#pulse-poly',
      3,
      {
        drawSVG: '-10% 0%',
      },
      {
        drawSVG: '100% 110%',
        repeat: -1,
      }
    )
  }
  render() {
    return (
      <svg width="70" height="70" viewBox="0 0 160 147">
        <defs>
          <clipPath id="clip-path" transform="translate(12 0)">
            <circle cx="74" cy="76" r="61" fill="none" />
          </clipPath>
          <pattern id="pulse" width="7%" height="100%">
            <polyline
              points="0 80 66 80 79 41 89 108 102 66 107 80 200 80"
              fill="none"
              stroke="#ffe621"
              strokeMiterlimit="10"
              strokeWidth="6"
            />
            <polyline
              id="pulse-poly"
              points="0 80 66 80 79 41 89 108 102 66 107 80 200 80"
              fill="none"
              stroke="#000"
              strokeMiterlimit="10"
              strokeWidth="6"
            />
          </pattern>
        </defs>
        <title>building</title>
        <g clipPath="url(#clip-path)">
          <rect id="pulse-move" width="1800" height="147.46" fill="url(#pulse)" />
        </g>
        <circle
          cx="86"
          cy="76"
          r="61"
          fill="none"
          stroke="#ffe618"
          strokeMiterlimit="10"
          strokeWidth="6"
        />
      </svg>
    )
  }
}

const defaultTheme = {}

const ThemedBuilding = Theme('Building', defaultTheme)(Building)
export default ThemedBuilding
