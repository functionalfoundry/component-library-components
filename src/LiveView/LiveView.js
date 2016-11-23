import React from 'react'
import Theme from 'js-theme'
import PropertiesPane from '../PropertiesPane/PropertiesPane'
import LivePreview from './LivePreview'
import LiveEditor from '../LiveEditor/LiveEditor'
import LiveHeader from './LiveHeader'
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
  dataCode: string,
  profile: Object,
  propKeyValues: Array<any>,
  properties: Object,
  theme: Object,
  onUpdatePropKeyValue: Function,
  onAddPropToLiveEditor: Function,
}

const defaultProps = {
  dataCode: '',
}

const LiveView = ({
  component,
  componentState,
  dataCode,
  profile = {},
  propKeyValues,
  properties,
  theme,
  onUpdatePropKeyValue,
  onRemoveProp,
  onAddPropToLiveEditor,
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
        <LiveEditor
          componentName={component.name}
          propKeyValues={propKeyValues}
          onChangeCode={onUpdatePropKeyValue}
          onRemoveProp={onRemoveProp}
          dataCode={dataCode}
        />
      </View>
    </View>
    <View
      {...theme.propertyPaneContainer}
    >
      <PropertiesPane
        properties={component.props}
        onClickPlus={onAddPropToLiveEditor}
      />
    </View>
  </View>
)

LiveView.defaultProps = defaultProps

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
    flex: '1 0 400px',
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
