import React from 'react'
import Theme from 'js-theme'

type PropsT = {
  error: string,
  theme: Object,
}

// TODO: Sanitize error to prevent XSS
const PopoverError = ({ error, theme }: PropsT) => {
  return <div {...theme.panelHeader} dangerouslySetInnerHTML={{ __html: error }} />
}

const defaultTheme = {
  panelHeader: {
    maxWidth: 500,
    maxHeight: 200,
    whiteSpace: 'pre',
    overflow: 'scroll',
    padding: 12,
  },
}

const ThemedPopoverError = Theme('PopoverError', defaultTheme)(PopoverError)
export default ThemedPopoverError
