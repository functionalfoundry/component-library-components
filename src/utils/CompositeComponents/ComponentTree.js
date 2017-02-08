/* @flow */

import { List, OrderedMap, Record } from 'immutable'

/**
 * Flow types
 */

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
  isSelfClosing: ?boolean,
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

class Location extends Record(defaultLocation) {
  isWithin (other: LocationT) {
    return this.start >= other.start
      && this.start <= other.end
      && this.end >= other.start
      && this.end <= other.end
  }
}
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
  isSelfClosing: false,
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
