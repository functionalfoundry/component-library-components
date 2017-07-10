import React from 'react'
import Theme from 'js-theme'
import { Button, Icon } from '@workflo/components'
import { Fonts } from '@workflo/styles'

type PropsT = {}

const ActionButton = ({ label, onClick, icon, kind = 'secondary', theme }) => {
  if (!label) return null
  return (
    <div {...theme.primaryAction}>
      <Button
        onClick={onClick}
        kind={kind}
        icon={name}
        theme={{
          button: primaryStyle,
        }}
      >
        {icon &&
          <Icon
            name={icon}
            stroke="white"
            theme={{
              icon: {
                alignItems: 'center',
                marginRight: 10,
                marginBottom: 4,
              },
            }}
          />}
        {label}
      </Button>
    </div>
  )
}

const defaultTheme = {
  primaryAction: {},
}

const primaryStyle = {
  ...Fonts.small,
  borderRadius: 0,
  height: 'auto',
  letterSpacing: 2,
}

const ThemedActionButton = Theme('ActionButton', defaultTheme)(ActionButton)
export default ThemedActionButton
