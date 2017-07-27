import React from 'react'
import QuickAction from '../QuickAction'
import { Fonts } from '@workflo/styles'

type PropsT = {}

const QuickActionButton = ({ icon, label, onClick, disabled, addMarginLeft }) => {
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
      addMarginLeft={false}
    />
  )
}

export default QuickActionButton
