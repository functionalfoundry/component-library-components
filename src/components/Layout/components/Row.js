import React from 'react'

/** Helper component for rendering flexbox row w/ semantically meaninful markup */
const Row = ({ children, ...props }: { children: React.Element }) => (
  <div {...props} style={{ display: 'flex', flexDirection: 'row' }}>{children}</div>
)

export default Row
