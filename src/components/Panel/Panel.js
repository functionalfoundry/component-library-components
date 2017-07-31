import React from 'react'
import PanelHeader from '../PanelHeader'
import PanelContent from '../PanelContent'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'

type PropsT = {
  /* Array of PanelRow's to display in the table */
  children: any,
  /* The JS Theme */
  theme: Object,
}

/** Displays a simple table with a single header column */
const Panel = ({ children, theme }: PropsT) => (
  <div {...theme.panel}>
    {children.map((child, index) => {
      switch (child.type) {
        case PanelHeader:
          return (
            <div key={index}>
              {child}
            </div>
          )
        case PanelContent:
          return (
            <div key={index} {...theme.panelContentContainer}>
              {child}
            </div>
          )
        default:
          return child
      }
    })}
  </div>
)

const defaultTheme = {
  panel: { display: 'flex', flexDirection: 'column', flexGrow: 1 },
  panelContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}

const ThemedPanel = Theme('Panel', defaultTheme)(Panel)
export default ThemedPanel
