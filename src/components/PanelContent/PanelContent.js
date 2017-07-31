import React from 'react'
import Theme from 'js-theme'

type PropsT = {}

const PanelContent = ({ children, theme }: PropsT) => (
  <div {...theme.panelContent}>{children}</div>
)

const defaultTheme = {
  panelContent: {
    display: 'flex',
    flexGrow: 1,
  },
}

const ThemedPanelContent = Theme('PanelContent', defaultTheme)(PanelContent)
export default ThemedPanelContent
