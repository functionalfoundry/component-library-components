import React from 'react'
import Theme from 'js-theme'

type PropsT = {}

const PanelHeader = ({ children, theme }: PropsT) => (
  <div {...theme.panelHeader}>
    {children.map((child, index) => (
      <div key={index} {...theme.quickActionWrapper}>
        {child}
      </div>
    ))}
  </div>
)

const defaultTheme = {
  panelHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  quickActionWrapper: {
    display: 'flex',
  },
}

const ThemedPanelHeader = Theme('PanelHeader', defaultTheme)(PanelHeader)
export default ThemedPanelHeader
