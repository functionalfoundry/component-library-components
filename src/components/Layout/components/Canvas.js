import React from 'react'
import Panel from '../../Panel'
import PanelHeader from '../../PanelHeader'
import PanelContent from '../../PanelContent'

type PropsT = {
  children: React.Element,
  header: React.Element,
  isFullscreen: boolean,
}

/** Helper component for rendering flexbox row w/ semantically meaninful markup */
const Canvas = ({ children, header, ...props }: PropsT) => {
  return (
    <Panel {...props}>
      <PanelHeader>
        {header}
      </PanelHeader>
      <PanelContent>
        {children}
      </PanelContent>
    </Panel>
  )
}

export default Canvas
