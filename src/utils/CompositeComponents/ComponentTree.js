/* @flow */

import { List, OrderedMap, Record, Set } from 'immutable'

/**
 * Flow types
 */

export type NodeIdentifierT = string

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
  name: ?string,
  value: ?PropValueT,
}

type ComponentNodeTypeT = 'component'
type ComponentT = {
  id: ?NodeIdentifierT,
  nodeType: ComponentNodeTypeT,
  name: ?string,
  props: ?List<PropT>,
  children: ?List<ComponentT>,
  text: ?string,
}

export type ComponentTreeNodeT =
  ComponentT
  | PropT
  | PropValueT

export type ComponentTreePathT = List<any>

type ComponentTreeT = {
  root: ?ComponentT,
}

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
