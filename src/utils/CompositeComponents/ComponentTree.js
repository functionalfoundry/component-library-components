/* @flow */

import { List, OrderedMap, Record } from 'immutable'

/**
 * Flow types
 */

// TODO Rename to MarkupLocationT
type LocationT = {
  start: number,
  end: number,
}

type PropNameT = {
  name: ?string,
}

type PropValueValueT = any
type PropValueTypeT = any

type PropValueT = {
  value: ?PropValueValueT,
  valueType: ?PropValueTypeT,
}

type PropT = {
  name: PropNameT,
  value: PropValueT,
}

type ComponentNameT = {
  name: string,
}

type ComponentT = {
  name: ?ComponentNameT,
  props: ?List<PropT>,
  children: ?List<ComponentT>,
  text: ?TextT,
}

type TextT = {
  text: ?string,
}

type CursorPathSegmentT =
  NodeT
  | '::value'
  | '::before'
  | '::after'

type CursorT = {
  path: List<CursorPathSegmentT>,
  offset: number,
}

type NodeTypeT =
  'component'
  | 'component-name-open'
  | 'component-name-close'
  | 'prop'
  | 'prop-name'
  | 'prop-value'

type NodeElementT =
  ComponentT
  | ComponentNameT
  | PropT
  | PropNameT
  | PropValueT
  | TextT

type NodePathSegmentT = {
  type: NodeTypeT,
  index: number,
}

type NodePathT = List<NodePathSegmentT>

type NodeT = {
  type: NodeTypeT,
  element: NodeElementT,
  // We use a node path because the immutable nodes and elements
  // cannot store bidirectional references between each other
  // due their immutable nature (one would always have an outdated
  // copy of the other node/element)
  parent: ?NodePathT,
  children: List<?NodeT>,
}

type ComponentTreeT = {
  cursor: ?CursorT,
  root: ?NodeT,
}

/**
 * ComponentTree implementation
 */

// Location

const defaultLocation: LocationT = {
  start: 0,
  end: 0,
}

const Location = Record(defaultLocation)
export { Location }

// PropName

const defaultPropName: PropNameT = {
  name: null,
}

const PropName = Record(defaultPropName)
export { PropName }

// PropValue

const defaultPropValue: PropValueT = {
  value: null,
  valueType: null,
}

const PropValue = Record(defaultPropValue)
export { PropValue }

// Prop

const defaultProp: PropT = {
  name: null,
  value: null,
}

const Prop = Record(defaultProp)
export { Prop }

// ComponentName

const defaultComponentName: ComponentNameT = {
  name: null,
}

const ComponentName = Record(defaultComponentName)
export { ComponentName }

// Component

const defaultComponent: ComponentT = {
  name: null,
  props: List(),
  children: List(),
  text: null,
}

const Component = Record(defaultComponent)
export { Component }

// Text

const defaultText: TextT = {
  text: '',
}

const Text = Record(defaultText)
export { Text }

// Cursor

const defaultCursor: CursorT = {
  path: List(),
  offset: 0,
}

const Cursor = Record(defaultCursor)
export { Cursor }

// NodePathSegment

const defaultNodePathSegment: NodePathSegmentT = {
  type: null,
  index: 0,
}

const NodePathSegment = Record(defaultNodePathSegment)
export { NodePathSegment }

// NodePath

const NodePath = List
export { NodePath }

// Node

const defaultNode: NodeT = {
  type: null,
  parent: NodePath(),
  location: null,
  element: null,
  children: List(),
}

const Node = Record(defaultNode)
export { Node }

// ComponentTree

const defaultComponentTree: ComponentTreeT = {
  cursor: null,
  root: null,
}

const ComponentTree = Record(defaultComponentTree)

export { ComponentTree }
export default ComponentTree
