import React from 'react'
import Theme from 'js-theme'
import LivePreview from './LivePreview'
import LiveEditor from './LiveEditor'
import LiveHeader from './LiveHeader'
import PropertyPane from './PropertyPane'
import {
  View,
} from '@workflo/components'
import TextEditor from '@workflo/components/lib/TextEditor'
import {
  Spacing,
  Colors,
} from '@workflo/styles'

type Props = {
  component: any,
  componentState: any,
  profile: Object,
  propKeyValues: Array<any>,
  properties: Object,
  theme: Object,
  onUpdatePropKeyValue: Function,
}

const LiveView = ({
  component,
  componentState,
  profile = {},
  propKeyValues,
  properties,
  theme,
  onUpdatePropKeyValue,
}: Props) => (
  <View
    {...theme.liveView}
  >
    <LiveHeader
      firstName={profile.firstName}
      lastName={profile.lastName}
      image={profile.image}
    />
    <View
      {...theme.previewAndEditor}
    >
      <View
        {...theme.livePreviewContainer}
      >
        <LivePreview
          component={component}
          properties={properties}
        />
      </View>
      <View
        {...theme.liveEditorContainer}
      >
        <TextEditor
          componentName={component.name}
          propKeyValues={propKeyValues}
          onChange={onUpdatePropKeyValue}
        />
      </View>
    </View>
    <View
      {...theme.propertyPaneContainer}
    >
      <PropertyPane
        properties={component.props}
      />
    </View>
  </View>
)

const defaultTheme = {
  liveView: {
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  header: {
    backgroundColor: Colors.grey800,
    color: Colors.grey300,
    padding: Spacing.small,
  },
  previewAndEditor: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 0 300px',
  },
  livePreviewContainer: {
    display: 'flex',
    flex: '1 1 60%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  liveEditorContainer: {
    display: 'flex',
    flex: '0 1 40%',
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
  propertyPaneContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    color: Colors.grey700,
    marginTop: Spacing.small,
    marginBottom: Spacing.large,
  },
}

export default Theme('LiveView', defaultTheme)(LiveView)
