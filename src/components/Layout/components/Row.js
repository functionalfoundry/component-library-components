import React from 'react'

/** Helper component for rendering flexbox row w/ semantically meaninful markup */
const Row = ({ children, style, ...props }: { children: React.Element, style: Object }) =>
  <div {...props} style={{ display: 'flex', flexDirection: 'row', ...style }}>
    {children}
  </div>

export default Row
