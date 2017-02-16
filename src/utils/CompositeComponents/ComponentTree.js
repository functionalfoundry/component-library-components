/* @flow */

import { List, OrderedMap, Record, Set } from 'immutable'

/**
 * Flow types
 */

type PropNameNodeTypeT = 'prop-name'
type PropNameT = {
  nodeType: PropNameNodeTypeT,
  name: ?string,
}

type PropValueNodeTypeT = 'prop-value'
type PropValueValueT = any
type PropValueTypeT = any
type PropValueT = {
  nodeType: PropValueNodeTypeT,
  value: ?PropValueValueT,
  valueType: ?PropValueTypeT,
}

type PropNodeTypeT = 'prop'
type PropT = {
  nodeType: PropNodeTypeT,
  name: ?PropNameT,
  value: ?PropValueT,
}

type ComponentNameNodeTypeT = 'component-name'
type ComponentNameT = {
  nodeType: ComponentNameNodeTypeT,
  name: ?string,
}

type ComponentNodeTypeT = 'component'
type ComponentT = {
  nodeType: ComponentNodeTypeT,
  name: ?ComponentNameT,
  props: ?List<PropT>,
  children: ?List<ComponentT>,
  text: ?TextT,
}

type TextNodeTypeT = 'text'
type TextT = {
  nodeType: TextNodeTypeT,
  text: ?string,
}

export type ComponentTreeNodeT =
  ComponentT
  | ComponentNameT
  | PropT
  | PropNameT
  | PropValueT
  | TextT

type ComponentTreeT = {
  root: ?ComponentT,
}

/**
 * ComponentTree implementation
 */

// PropName

const defaultPropName: PropNameT = {
  nodeType: 'prop-name',
  name: null,
}

const PropName = Record(defaultPropName)
export { PropName }

// PropValue

const defaultPropValue: PropValueT = {
  nodeType: 'prop-value',
  value: null,
  valueType: null,
}

const PropValue = Record(defaultPropValue)
export { PropValue }

// Prop

const defaultProp: PropT = {
  nodeType: 'prop',
  name: null,
  value: null,
}

const Prop = Record(defaultProp)
export { Prop }

// ComponentName

const defaultComponentName: ComponentNameT = {
  nodeType: 'component-name',
  name: null,
}

const ComponentName = Record(defaultComponentName)
export { ComponentName }

// Component

const defaultComponent: ComponentT = {
  nodeType: 'component',
  name: null,
  props: List(),
  children: List(),
  text: null,
}

const Component = Record(defaultComponent)
export { Component }

// Text

const defaultText: TextT = {
  nodeType: 'text',
  text: '',
}

const Text = Record(defaultText)
export { Text }

// ComponentTree

const defaultComponentTree: ComponentTreeT = {
  root: null,
}

const ComponentTree = Record(defaultComponentTree)

export { ComponentTree }
export default ComponentTree
