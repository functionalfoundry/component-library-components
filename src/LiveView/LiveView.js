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
  data: string,
  theme: Object,
  onUpdatePropKeyValues: Function,
  onAddPropToPropKeyValues: Function,
  onRemovePropFromPropKeyValues: Function,
}

const defaultProps = {
  data: '',
}

const getPropMap = (propKeyValues) => {
  /* TODO: memoize */
  console.log('get map for: ', propKeyValues)
  return propKeyValues
    .reduce((propKeyValue, acc) => ({
      ...acc,
      [propKeyValue.key]: propKeyValue.value,
    }), {})
}

const LiveView = ({
  component,
  componentState,
  data,
  theme,
  onUpdatePropKeyValues,
  onAddPropToPropKeyValues,
  onRemovePropFromPropKeyValues,
}: Props) => (
  <View
    {...theme.liveView}
  >
    <LiveHeader
      firstName={component.owner.firstName}
      lastName={component.owner.lastName}
      profilePhoto={component.owner.profilePhoto}
    />
    <View
      {...theme.previewAndEditor}
    >
      <View
        {...theme.livePreviewContainer}
      >
        <LivePreview
          component={component}
          propMap={getPropMap(componentState.propKeyValues)}
        />
      </View>
      <View
        {...theme.liveEditorContainer}
      >
        <LiveEditor
          componentName={component.name}
          propKeyValues={componentState.propKeyValues}
          onChangeCode={onUpdatePropKeyValues}
          onRemoveProp={onRemovePropFromPropKeyValues}
          dataCode={data}
        />
      </View>
    </View>
    <View
      {...theme.propertyPaneContainer}
    >
      <PropertiesPane
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
