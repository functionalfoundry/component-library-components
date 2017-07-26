import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'

type PropsT = {
  children: any,
  theme: Object,
  align: 'Left' | 'Right',
}

const defaultProps = {
  align: 'Right',
}

const PanelToolbar = ({ children, theme }: PropsT) => {
  return (
    <div {...theme.panelToolbar}>
      {children}
    </div>
  )
}

const defaultTheme = ({ align }: PropsT) => {
  return {
    panelToolbar: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: align === 'Left' ? 'flex-start' : 'flex-end',
    },
  }
}
PanelToolbar.defaultProps = defaultProps

const ThemedPanelToolbar = Theme('PanelToolbar', defaultTheme)(PanelToolbar)
export default ThemedPanelToolbar
