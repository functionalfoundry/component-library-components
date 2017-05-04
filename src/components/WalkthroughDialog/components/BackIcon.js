import React from 'react'
import Theme from 'js-theme'
import iconTheme from '../iconTheme'

type Props = {
  theme: Object,
}

const BackIcon = ({ theme }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="46.4"
    height="46.2"
    viewBox="0 0 46.4 46.2"
    aria-labelledby="title"
  >
    <title id="title">backarrow</title>
    <g fill="none" stroke="#9FA7AB">
      <ellipse cx="23.2" cy="23.1" rx="22.7" ry="22.6" strokeMiterlimit="10" />
      <polyline
        points="22.3 18.5 17.6 23.2 22.5 28"
        strokeLinecap="round"
        strokeLinejoin="round"
        fillRule="evenodd"
      />
      <line
        x1="28.8"
        y1="23.4"
        x2="17.7"
        y2="23.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse
        {...theme.overlay}
        cx="23.2"
        cy="23.1"
        rx="22.7"
        ry="22.6"
        strokeMiterlimit="10"
      />
    </g>
  </svg>
)

export default Theme('BackIcon', iconTheme)(BackIcon)
