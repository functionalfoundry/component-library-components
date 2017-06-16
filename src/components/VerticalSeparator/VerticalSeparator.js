import React from 'react'
import Theme from 'js-theme'
import { Colors, Spacing } from '@workflo/styles'

type PropsT = {
  /** How high to make the separator in pixels  */
  height: number,
  /** A valid CSS color for the separator */
  color: string,
  /** How many pixels to leave on the left */
  marginLeft: number,
  /** How many pixels to leave on the right */
  marginRight: number,
}

const defaultProps = {
  height: 30,
  color: Colors.grey500,
  marginLeft: Spacing.small,
  marginRight: Spacing.small,
}

const VerticalSeparator = ({ theme }: PropsT) => <div {...theme.verticalSeparator} />
VerticalSeparator.defaultProps = defaultProps

const defaultTheme = ({ color, marginLeft, marginRight }) => {
  return {
    verticalSeparator: {
      flex: '0 1 auto',
      borderLeftWidth: 1,
      borderLeftStyle: 'solid',
      borderLeftColor: color,
      height: 40, // Make line-size height
      marginLeft,
      marginRight,
    },
  }
}

export default Theme('VerticalSeparator', defaultTheme)(VerticalSeparator)
