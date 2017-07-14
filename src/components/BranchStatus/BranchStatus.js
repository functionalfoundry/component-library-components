import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'
import { Tooltip } from '@workflo/components'

import Building from './Building'
import PopoverError from '../PopoverError'

export type BuildStatusT = 'Success' | 'Failed' | 'Building' | 'SetupRequired'

type PropsT = {
  /* Function property to be called when the status icon is clicked */
  onIconClick?: Function,
  /* One of three possible states */
  status: BuildStatusT,
  /* The error message, if there is an error */
  error?: string,
  /* The JS Theme */
  theme: Object,
}

const BranchStatus = ({ onIconClick, status, error, theme }: PropsT) => {
  const icon = status === 'Building'
    ? <div {...theme.circle} onClick={onIconClick}><Building /></div>
    : <div {...theme.circle} onClick={onIconClick} />

  switch (status) {
    case 'Success':
      return <div {...theme.label}>Success {icon}</div>
    case 'Failed':
      return (
        <Tooltip position="Right" portal={<PopoverError error={error} />} padding={0}>
          <div {...theme.label}>Failed {icon}</div>
        </Tooltip>
      )

    case 'Building':
      return <div {...theme.label}>Building {icon}</div>
    default:
      return <div {...theme.label}>Setup required {icon}</div>
  }
}

const colorMap = {
  Success: Colors.green,
  Failed: Colors.red,
  SetupRequired: Colors.grey500,
}

const getSize = status => (status === 'Building' ? 15 : 12)

const defaultTheme = ({ onIconClick, status }: PropsT) => {
  return {
    label: {
      ...Fonts.small,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    circle: {
      borderRadius: '50%',
      width: getSize(status),
      height: getSize(status),
      marginLeft: 6,
      marginTop: -4,
      backgroundColor: colorMap[status],
      display: 'flex',
      ...(typeof onIconClick === 'function' ? { cursor: 'pointer' } : {}),
    },
  }
}

const ThemedBranchStatus = Theme('BranchStatus', defaultTheme)(BranchStatus)
export default ThemedBranchStatus
