/** @flow */
import { List, Record } from 'immutable'
import type { PropValueT, PropT, ComponentT, ComponentTreeT, StatusT } from './types'

/**
 * Flow types
 */

/**
 * ComponentTree implementation
 */

/**
 * Path used for getting and setting nested children in ComponentTree
 */
const Path = List
export { Path }

/**
 * Record for displaying the status of a node
 */
const defaultStatusValue: StatusT = {
  isValid: true,
  message: '',
}
export const Status = Record(defaultStatusValue)

// PropValue

const defaultPropValue: PropValueT = {
  id: null,
  path: List(),
  nodeType: 'prop-value',
  status: Status(),
  type: null,
  value: null,
}

const PropValue = Record(defaultPropValue)
export { PropValue }

// Prop

const defaultProp: PropT = {
  id: null,
  nodeType: 'prop',
  name: '',
  path: List(),
  value: null,
}

const Prop = Record(defaultProp)
export { Prop }

// Component

const defaultComponent: ComponentT = {
  id: null,
  nodeType: 'component',
  name: null,
  path: List(),
  props: List(),
  children: List(),
}

const Component = Record(defaultComponent)
export { Component }

// Render Callback
const defaultRenderCallback = {
  id: null,
  nodeType: 'render-callback',
  child: null,
  params: '',
}
export const RenderCallback = Record(defaultRenderCallback)

// ComponentTree

const defaultComponentTree: ComponentTreeT = {
  root: null,
}

const ComponentTree = Record(defaultComponentTree)

export type ComponentTreeNodeT = Prop | Component | PropValue

export { ComponentTree }
export default ComponentTree
