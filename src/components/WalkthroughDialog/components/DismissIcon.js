import React from 'react'
import Theme from 'js-theme'

import iconTheme from '../iconTheme'

type Props = {
  theme: Object,
}

const DismissIcon = ({ theme }: Props) => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    width="46.4"
    height="46.2"
    viewBox="0 0 46.4 46.2"
    aria-labelledby="title"
  >
    <title id="title">dismiss</title>
    <g fill="none" stroke="#9FA7AB">
      <ellipse cx="23.2" cy="23.1" rx="22.7" ry="22.6" strokeMiterlimit="10" />
      <line
        x1="17.9"
        y1="17.8"
        x2="28.5"
        y2="28.4"
        strokeLinecap="round"
        strokeMiterlimit="10"
      />
      <line
        x1="28.5"
        y1="17.8"
        x2="17.9"
        y2="28.4"
        strokeLinecap="round"
        strokeMiterlimit="10"
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

export default Theme('DismissIcon', iconTheme)(DismissIcon)
