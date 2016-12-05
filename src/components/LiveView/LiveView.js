import React from 'react'
import Theme from 'js-theme'
import Properties from '../Properties'
import LivePreview from '../LivePreview'
import LiveEditor from '../LiveEditor'
// import LiveHeader, { ActionT } from '../LiveHeader'
import {
  View,
} from '@workflo/components'
import {
  Spacing,
  Colors,
} from '@workflo/styles'

type DataT = {
  /* Passed in on initial load to seed the editor state */
  text: string,
  /* Stored by caller and passed back in on every change */
  editorState: Object,
}

type PropertyT = {
  name: string,
  type: string,
  default: string,
  description: string,
}

type Props = {
  component: {
    name: string,
    implementation: any,
    properties: Array<PropertyT>,
  },
  componentState: {
    name: string,
    propMap: Object,
    propKeyValues: Object,
  },
  data: DataT,
  actions: DataT,
  theme: Object,
  onUpdatePropKeyValues: Function,
  onAddPropToPropKeyValues: Function,
  onRemovePropFromPropKeyValues: Function,
  onChangeActions: Function,
  onChangeData: Function,
}

const defaultProps = {
  data: {
    text: '',
  },
  actions: {
    text: '',
  },
}

const LiveView = ({
  component,
  componentState,
  data,
  actions,
  primaryAction,
  secondaryActions,
  quickActions,
  theme,
  onUpdateComponent, // ?
  onUpdateComponentState, // ?
  onUpdatePropKeyValues,
  onAddPropToPropKeyValues,
  onRemovePropFromPropKeyValues,
  onChangeData,
  onChangeActions,
}: Props) => (
  <View
    {...theme.liveView}
  >
    <View
      {...theme.previewAndEditor}
    >
      <View
        {...theme.livePreviewContainer}
      >
        <LivePreview
          Component={component.implementation}
          propMap={componentState.propMap}
        />
      </View>
      <View
        {...theme.liveEditorContainer}
      >
        <LiveEditor
          componentName={component.name}
          propKeyValues={componentState.propKeyValues}
          onChangeCode={onUpdatePropKeyValues}
          onChangeData={onChangeData}
          onChangeActions={onChangeActions}
          onRemoveProp={onRemovePropFromPropKeyValues}
          data={data}
          actions={actions}
        />
      </View>
    </View>
    <View
      {...theme.propertyPaneContainer}
    >
      <Properties
        properties={component.properties}
        onClickPlus={onAddPropToPropKeyValues}
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
