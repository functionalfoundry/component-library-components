import React from 'react'
import LivePreview from './LivePreview'
import LiveEditor from './LiveEditor'
import LiveHeader from './LiveHeader'
import PropertyPane from './PropertyPane'
import {
  View,
} from '@workflo/components'
import {
  Spacing,
  Colors,
} from '@workflo/styles'

type Props = {
  component: any,
  properties: any,
  profile: Object,
}

const LiveView = ({
  component,
  properties,
  profile = {},
}: Props) => (
  <View
    style={style.container}
  >
    <LiveHeader
      firstName={profile.firstName}
      lastName={profile.lastName}
      image={profile.image}
    />
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
    paddingTop: 0,
    display: flex,
    flexDirection: 'column',
  },
  header: {
    backgroundColor: Colors.steel3,
    color: Colors.aluminum6,
    padding: Spacing.small,
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
    flexBasis: '60%',
  },
  liveEditorContainer: {
    ...column,
    flexBasis: '34%',
  },
  propertyPaneContainer: {
    ...column,
    color: Colors.aluminum6,
    marginTop: Spacing.small,
  },
}
