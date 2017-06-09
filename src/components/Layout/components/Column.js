import React from 'react'

/** Helper component for rendering flexbox column w/ semantically meaninful markup */
const Column = ({ children, ...props }: { children: React.Element }) => (
  <div {...props} style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
)

export default Column
