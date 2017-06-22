/* @flow */
import React from 'react'
import { Record } from 'immutable'

import { PluginOptionsT } from '../types'
import ComponentStart from '../components/ComponentStart'
import ComponentTag from '../components/ComponentTag'
import PropValue from '../components/PropValue'
import EditableName from '../components/EditableName'
import Text from '../components/Text'

const InteractionState = Record({
  editingNodeId: null,
})

export { InteractionState }
/**
 * Slate plugin responsible for adding interactions to different parts of the JSX
 * markup in the ComponentTreeEditor.
 */
const InteractionPlugin = (options: PluginOptionsT) => ({
  schema: {
    marks: {
      'component-start': (props: Object) => (
        <ComponentStart {...props} options={options} />
      ),
      'component-open-tag-end': (props: Object) => (
        <ComponentTag {...props} options={options} />
      ),
      'component-name': (props: Object) => <EditableName {...props} options={options} />,
      'component-end': (props: Object) => <ComponentTag {...props} options={options} />,
      'prop-name': (props: Object) => <EditableName {...props} options={options} />,
      'prop-value': (props: Object) => <PropValue {...props} options={options} />,
      text: (props: Object) => <Text {...props} options={options} />,
    },
  },
})

export default InteractionPlugin
