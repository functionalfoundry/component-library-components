import React from 'react'
import View from '@workflo/components/lib/View/View'
import { Spacing, Colors } from '@workflo/styles'
import LivePreview from './LivePreview'
import LiveEditor from './LiveEditor'
import PropertyPane from './PropertyPane'

const LiveView = ({
  component,
  properties,
}) => (
  <View
    style={style.container}
  >
    <View
      style={style.previewAndEditor}
    >
      <View
        style={style.livePreviewContainer}
      >
        <LivePreview
          {...component}
        />
      </View>
      <View
        style={style.liveEditorContainer}
      >
        <LiveEditor
        />
      </View>
    </View>
    <View
      style={style.section}
    >
      <View
        style={style.propertyPaneContainer}
      >
        <PropertyPane
          properties={properties}
        />
      </View>
    </View>
  </View>
)

export default LiveView

const flex = {
  margin: '0 auto',
  display: 'flex',
}

const column = {
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,
}

const style = {
  container: {
    backgroundColor: Colors.steel2,
    padding: Spacing.base,
  },
  section: {
    ...flex,
  },
  previewAndEditor: {
    ...flex,
    backgroundColor: Colors.aluminum6,
    padding: Spacing.small,
  },
  livePreviewContainer: {
    ...column,
  },
  liveEditorContainer: {
    ...column,
  },
  propertyPaneContainer: {
    ...column,
    color: Colors.aluminum6,
    marginTop: Spacing.small,
  },
}
