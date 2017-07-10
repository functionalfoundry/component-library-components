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
      return (
        <div {...theme.label}>Building <div {...theme.circle}><Building /></div></div>
      )
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
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    circle: {
      borderRadius: '50%',
      width: 15,
      height: 15,
      marginLeft: 6,
      marginTop: -4,
      backgroundColor: colorMap[status],
      display: 'flex',
    },
  }
}

const ThemedBranchStatus = Theme('BranchStatus', defaultTheme)(BranchStatus)
export default ThemedBranchStatus
