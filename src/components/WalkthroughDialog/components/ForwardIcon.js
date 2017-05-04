import React from 'react'
import Theme from 'js-theme'
import iconTheme from '../iconTheme'

type Props = {
  theme: Object,
}

const ForwardIcon = ({ theme }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="46.4"
    height="46.2"
    viewBox="0 0 46.4 46.2"
    aria-labelledby="title"
  >
    <title id="title">forwardarrow</title>
    <ellipse
      cx="23.2"
      cy="23.1"
      rx="22.7"
      ry="22.6"
      fill="#08CCCC"
      stroke="#08CCCC"
      strokeMiterlimit="10"
    />
    <polyline
      points="24.1 18.5 28.7 23.2 23.9 28"
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      fillRule="evenodd"
    />
    <line
      x1="17.6"
      y1="23.4"
      x2="28.7"
      y2="23.2"
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <ellipse
      {...theme.overlay}
      cx="23.2"
      cy="23.1"
      rx="22.7"
      ry="22.6"
      stroke="#08CCCC"
      strokeMiterlimit="10"
    />
  </svg>
)

export default Theme('ForwardIcon', iconTheme)(ForwardIcon)
