import React from 'react'
const Slate = require('slate')
import ComponentTree from '../../utils/ComponentTree'
import type { NodeIdentifierT } from '../../modules/ComponentTree'
import type { CompletionDataT } from '../../types/Completion'

/**
 * Interaction state
 */
export type InteractionStateT = {
  editingNodeId?: NodeIdentifierT,
}

/**
 * Plugin options
 */
export type PluginOptionsT = {
  tree: ComponentTree,
  completionData?: CompletionDataT,
  interactionState: InteractionStateT,
  onChange?: Function,
  onRemoveProp?: Function,
  onRemoveComponent?: Function,
  onChangePropName?: Function,
  onChangePropValue?: Function,
  onInsertComponent?: Function,
  onChangeComponentName?: Function,
  onSelectNode?: Function,
}

/**
 * Mark renderers
 */
export type MarkRendererPropsT = {
  children: React.Children,
  mark: Slate.Mark,
  marks: Set<Slate.Mark>,
  options: PluginOptionsT,
  theme: any,
}
