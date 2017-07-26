import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'

type PropsT = {
  showLeftBorder?: boolean,
}

const defaultProps = {
  showLeftBorder: false,
}

const PanelHeader = ({ children, theme }: PropsT) => {
  if (!children) return <div />
  let actions = children.length && children.map ? children : [children]
  if (!children.length || !children.map) {
    // TODO: Change to explicitely check for Action children instead of going by count?
    // Right now this won't work if we want to have a single Action in theme
    // Toolbar
    return (
      <div {...theme.panelHeader}>
        {children}
      </div>
    )
  }
  return (
    <div {...theme.panelHeader}>
      {actions.map((child, index) => (
        <div key={index} {...theme.quickActionWrapper}>
          {child}
        </div>
      ))}
    </div>
  )
}
PanelHeader.defaultProps = defaultProps

const defaultTheme = ({ showLeftBorder }) => {
  return {
    panelHeader: {
      ...Fonts.small,
      color: Colors.grey100,
      display: 'flex',
      flexDirection: 'row',
      // justifyContent: 'flex-end',
      backgroundColor: '#1e2428',
      paddingRight: 6,
      paddingLeft: 15,
      height: 40,
      flexGrow: 1,
      alignItems: 'center',
      ...(showLeftBorder ? { borderLeft: `1px solid ${Colors.grey900}` } : {}),
    },
    quickActionWrapper: {
      display: 'flex',
    },
  }
}

const ThemedPanelHeader = Theme('PanelHeader', defaultTheme)(PanelHeader)
export default ThemedPanelHeader
