import React from 'react'
import QuickAction from '../QuickAction'
import { Fonts } from '@workflo/styles'

type PropsT = {}

const QuickActionButton = ({ icon, label, onClick, disabled }) => {
  return (
    <QuickAction
      key={icon}
      icon={icon}
      iconKind="Secondary"
      label={label}
      input={{
        type: 'Button',
      }}
      shade="Light"
      onClick={onClick}
      showLabelInButton
    />
  )
}

export default QuickActionButton
