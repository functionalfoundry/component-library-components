import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'

type PropsT = {
  /** Array of PanelRow's to display in the table */
  children: any,
  /** Markup to render in the content area */
  content?: React.Element<*> | Array<React.Element<*>>,
  /** Markup to render in the toolbar header */
  header?: React.Element<*> | Array<React.Element<*>>,
  /** The JS Theme */
  theme: Object,
}

/** Displays a simple table with a single header column */
const Panel = ({ children, content, header, theme }: PropsT) =>
  <div {...theme.panel}>
    {header &&
      <div>
        {header}
      </div>}
    {(content || children) &&
      <div {...theme.panelContentContainer}>
        {content || children}
      </div>}
  </div>

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
