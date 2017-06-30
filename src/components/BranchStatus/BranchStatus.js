import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'

import Building from './Building'

export type BuildStatusT = 'Success' | 'Failed' | 'Building'

type PropsT = {
  /* One of three possible states */
  status: BuildStatusT,
  /* The JS Theme */
  theme: Object,
}

const BranchStatus = ({ status, theme }: PropsT) => {
  switch (status) {
    case 'Success':
      return <div {...theme.label}>Success <div {...theme.circle} /></div>
    case 'Failed':
      return <div {...theme.label}>Failed <div {...theme.circle} /></div>
    case 'Building':
      return <Building />
    default:
      return <div />
  }
}

const colorMap = {
  Success: Colors.green,
  Failed: Colors.red,
}

const defaultTheme = ({ status }) => {
  return {
    label: {
      ...Fonts.small,
    },
    circle: {
      borderRadius: '50%',
      width: 9,
      height: 9,
      marginLeft: 2,
      backgroundColor: colorMap[status],
      display: 'inline-block',
    },
  }
}

const ThemedBranchStatus = Theme('BranchStatus', defaultTheme)(BranchStatus)
export default ThemedBranchStatus
