/* @flow */

import { List, OrderedMap, Record, Set } from 'immutable'

/**
 * Flow types
 */

export type NodeIdentifierT = string

type PropNameNodeTypeT = 'prop-name'
type PropNameT = {
  id: ?NodeIdentifierT,
  nodeType: PropNameNodeTypeT,
  name: ?string,
}

type PropValueNodeTypeT = 'prop-value'
type PropValueValueT = any
export type PropValueTypeT =
  'any'
  | 'array'
  | 'boolean'
  | 'custom'
  | 'element'
  | 'enum'
  | 'function'
  | 'literal'
  | 'node'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'tuple'
  | 'union'
  | 'unknown'
  | 'void'
type PropValueT = {
  id: ?NodeIdentifierT,
  nodeType: PropValueNodeTypeT,
  value: ?PropValueValueT,
  type: ?PropValueTypeT,
}

type PropNodeTypeT = 'prop'
type PropT = {
  id: ?NodeIdentifierT,
  nodeType: PropNodeTypeT,
  name: ?PropNameT,
  value: ?PropValueT,
}

type ComponentNameNodeTypeT = 'component-name'
type ComponentNameT = {
  id: ?NodeIdentifierT,
  nodeType: ComponentNameNodeTypeT,
  name: ?string,
}

type ComponentNodeTypeT = 'component'
type ComponentT = {
  id: ?NodeIdentifierT,
  nodeType: ComponentNodeTypeT,
  name: ?ComponentNameT,
  props: ?List<PropT>,
  children: ?List<ComponentT>,
  text: ?TextT,
}

type TextNodeTypeT = 'text'
type TextT = {
  id: ?NodeIdentifierT,
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

export type ComponentTreePathT = List<any>

type ComponentTreeT = {
  root: ?ComponentT,
}

/**
 * ComponentTree implementation
 */

// PropName

const defaultPropName: PropNameT = {
  id: null,
  nodeType: 'prop-name',
  name: null,
}

const PropName = Record(defaultPropName)
export { PropName }

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

// ComponentName

const defaultComponentName: ComponentNameT = {
  id: null,
  nodeType: 'component-name',
  name: null,
}

const ComponentName = Record(defaultComponentName)
export { ComponentName }

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

// Text

const defaultText: TextT = {
  id: null,
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
