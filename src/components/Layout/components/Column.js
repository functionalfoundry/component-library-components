import React from 'react'

/** Helper component for rendering flexbox column w/ semantically meaninful markup */
const Column = ({
  children,
  style,
  ...props
}: {
  children: React.Element,
  style: Object,
}) =>
  <div {...props} style={{ display: 'flex', flexDirection: 'column', ...style }}>
    {children}
  </div>

export default Column
