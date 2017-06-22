/* @flow */
import { List, Record } from 'immutable'
import type { PropValueT, PropT, ComponentT, ComponentTreeT } from './types'

/**
 * Flow types
 */

/**
 * ComponentTree implementation
 */

// PropValue

const defaultPropValue: PropValueT = {
  id: null,
  nodeType: 'prop-value',
  value: null,
  type: null,
}

const PropValue = Record(defaultPropValue)
export { PropValue }

// Prop

const defaultProp: PropT = {
  id: null,
  nodeType: 'prop',
  name: null,
  value: null,
}

const Prop = Record(defaultProp)
export { Prop }

// Component

const defaultComponent: ComponentT = {
  id: null,
  nodeType: 'component',
  name: null,
  props: List(),
  children: List(),
  text: null,
}

const Component = Record(defaultComponent)
export { Component }

// ComponentTree

const defaultComponentTree: ComponentTreeT = {
  root: null,
}

const ComponentTree = Record(defaultComponentTree)

export { ComponentTree }
export default ComponentTree
