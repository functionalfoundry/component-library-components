import React from 'react'
import Theme from 'js-theme'
import { Colors, Spacing } from '@workflo/styles'

type PropsT = {
  /** How wide to make the separator in pixels  */
  width: number | string,
  /** A valid CSS color for the separator */
  color: string,
  /** How many pixels to leave on the left */
  marginTop: number,
  /** How many pixels to leave on the right */
  marginBottom: number,
  /** JS Theme */
  theme: Object,
}

const defaultProps = {
  width: '70%',
  color: Colors.grey500,
  marginTop: Spacing.small,
  marginBottom: Spacing.small,
}

const HorizontalSeparator = ({ theme }: PropsT) => <div {...theme.horizontalSeparator} />
HorizontalSeparator.defaultProps = defaultProps

const defaultTheme = ({ color, marginTop, marginBottom, width }) => {
  return {
    horizontalSeparator: {
      flex: '0 1 auto',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: color,
      width, // Make line-size width
      marginTop,
      marginBottom,
    },
  }
}

export default Theme('HorizontalSeparator', defaultTheme)(HorizontalSeparator)
