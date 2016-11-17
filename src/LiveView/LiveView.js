import React from 'react'
import LivePreview from './LivePreview'
import LiveHeader from './LiveHeader'
import PropertyPane from './PropertyPane'
import TextEditor from '@workflo/components/TextEditor'

import {
  View,
} from '@workflo/components'
import {
  Spacing,
  Colors,
} from '@workflo/styles'

type Props = {
  component: any,
  componentState: any,
  profile: Object,
  onChangePropKeyValue: Function,
}

const LiveView = ({
  component,
  componentState,
  profile = {},
  onChangePropKeyValue,
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
          component={component}
          componentState={componentState}
        />
      </View>
      <View
        style={style.liveEditorContainer}
      >
        <TextEditor
          componentName={component.name}
          propKeyValues={componentState.propKeyValues}
          onChange={onChangePropKeyValue}
        />
      </View>
    </View>
    <View
      style={style.propertyPaneContainer}
    >
      <PropertyPane
        properties={component.props}
      />
    </View>
  </View>
)

export default LiveView

const style = {
  container: {
    backgroundColor: Colors.steel2,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  header: {
    backgroundColor: Colors.steel3,
    color: Colors.aluminum6,
    padding: Spacing.small,
  },
  previewAndEditor: {
    display: 'flex',
    backgroundColor: Colors.aluminum6,
    flex: '1 0 300px',
  },
  livePreviewContainer: {
    display: 'flex',
    flex: '1 1 66%',
  },
  liveEditorContainer: {
    display: 'flex',
    flex: '0 1 34%'
  },
  propertyPaneContainer: {
    display: 'flex',
    flex: '1',
    color: Colors.aluminum6,
    marginTop: Spacing.small,
    marginBottom: Spacing.large,
  },
}
