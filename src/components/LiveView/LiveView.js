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

type HarnessT = {
  alignment: {
    horizontal: 'Left' | 'Center' | 'Right',
  },
  size: {
    horizontal: 'Small' | 'Base' | 'Large',
  },
  theme: {
    id: string,
    name: string,
    patterns: {
      colors: {
        background: string,
      },
    },
  },
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
    componentTree: Object,
  },
  harness: HarnessT,
  data: DataT,
  actions: DataT,
  theme: Object,
  onChangeComponentTree: Function,
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
  onChangeComponentTree,
  onAddPropToPropKeyValues,
  onRemovePropFromPropKeyValues,
  onChangeData,
  onChangeActions,
  harness,
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
        {
          // The date-based React key here is a hack to always force a
          // new LivePreview on render; this is necessary because the
          // error boundary imnplemented by LivePreview doesn't catch
          // errors in all parts of the component lifecycle
        }
        <LivePreview
          key={Date.now()}
          Component={component.implementation}
          propMap={componentState.propMap}
          backgroundColor={harness.theme.patterns.colors.background}
          alignment={harness.alignment}
        />
      </View>
      <View
        {...theme.liveEditorContainer}
      >
        <LiveEditor
          componentName={component.name}
          componentTree={componentState.componentTree}
          onChangeComponentTree={onChangeComponentTree}
          onChangeData={onChangeData}
          onChangeActions={onChangeActions}
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
        onClickMinus={onRemovePropFromPropKeyValues}
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
    alignItems: 'stretch',
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

const ThemedLiveView = Theme('LiveView', defaultTheme)(LiveView)
export default ThemedLiveView
