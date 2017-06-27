import React from 'react'
import Theme from 'js-theme'

type Props = {
  children: any,
  theme: Object,
}

const ScrollableContent = ({ children, theme }: Props) => (
  <div {...theme.container}>
    {children}
  </div>
)

const defaultTheme = {
  container: {
    overflow: 'scroll',
  },
}

export default Theme('ScrollableContent', defaultTheme)(ScrollableContent)
