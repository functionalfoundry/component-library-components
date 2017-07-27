/** @flow */
import { List, Record } from 'immutable'
import type { PropValueT, PropT, ComponentT, ComponentTreeT } from './types'

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

// PropValue

const defaultPropValue: PropValueT = {
  id: null,
  path: List(),
  nodeType: 'prop-value',
  status: {
    isValid: true,
    message: '',
  },
  type: null,
  value: null,
}

const PropValue = Record(defaultPropValue)
export { PropValue }

// Prop

const defaultProp: PropT = {
  id: null,
  nodeType: 'prop',
  name: null,
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

// ComponentTree

const defaultComponentTree: ComponentTreeT = {
  root: null,
}

const ComponentTree = Record(defaultComponentTree)

export type ComponentTreeNodeT = Prop | Component | PropValue

export { ComponentTree }
export default ComponentTree
