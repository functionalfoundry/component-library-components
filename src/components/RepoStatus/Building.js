import React from 'react'
import Theme from 'js-theme'
import { Linear, TweenMax } from 'gsap'

class Building extends React.Component {
  componentDidMount() {
    TweenMax.to('#pulse-move', 9, {
      x: -1000,
      repeat: -1,
      ease: Linear.easeNone,
    })
  }
  render() {
    return (
      <svg width="15" height="15" viewBox="0 0 138 138">
        <defs>
          <clipPath id="clip-path">
            <circle cx="65" cy="65" r="61" fill="none" />
          </clipPath>
          <pattern id="pulse" width="7%" height="100%">
            <polyline
              transform="translate(0, -12)"
              points="0 80 66 80 79 41 89 108 102 66 107 80 200 80"
              fill="none"
              stroke="#ffe621"
              strokeMiterlimit="10"
              strokeWidth="8"
            />
          </pattern>
        </defs>
        <title>building</title>
        <g clipPath="url(#clip-path)">
          <rect id="pulse-move" width="1800" height="147.46" fill="url(#pulse)" />
        </g>
        <circle
          cx="65"
          cy="65"
          r="61"
          fill="none"
          stroke="#ffe618"
          strokeMiterlimit="10"
          strokeWidth="8"
        />
      </svg>
    )
  }
}

const defaultTheme = {}

const ThemedBuilding = Theme('Building', defaultTheme)(Building)
export default ThemedBuilding
