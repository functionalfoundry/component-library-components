/* @flow */

import { List, OrderedMap, Record } from 'immutable'

/**
 * Flow types
 */

type TypeT =
  'component'
  | 'component-name'
  | 'prop'
  | 'prop-name'
  | 'prop-value'


type LocationT = {
  start: number,
  end: number,
}

type PropNameT = {
  type: TypeT,
  location: ?LocationT,
  parent: PropT,
  name: ?string,
}

type PropValueValueT = any
type PropValueTypeT = any

type PropValueT = {
  type: TypeT,
  location: ?LocationT,
  parent: PropT,
  value: ?PropValueValueT,
  valueType: ?PropValueTypeT,
}

type PropT = {
  type: TypeT,
  location: ?LocationT,
  parent: ComponentT,
  name: PropNameT,
  value: PropValueT,
}

type ComponentNameT = {
  type: TypeT,
  locations: ?Array<LocationT>,
  parent: ComponentT,
  name: string,
}

type ComponentT = {
  type: TypeT,
  location: ?LocationT,
  parent: ?ComponentT,
  name: ?ComponentNameT,
  props: ?List<PropT>,
  children: ?List<ComponentT>,
}

type CursorPathSegmentT =
  ComponentT
  | PropT
  | '::value'
  | '::before'
  | '::after'

type CursorT = {
  path: List<CursorPathSegmentT>,
  offset: number,
}

type ComponentTreeT = {
  cursor: ?CursorT,
  root: ?ComponentT,
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
  type: 'prop-name',
  location: null,
  parent: null,
  name: null,
}

const PropName = Record(defaultPropName)
export { PropName }

// PropValue

const defaultPropValue: PropValueT = {
  type: 'prop-value',
  location: null,
  parent: null,
  value: null,
  valueType: null,
}

const PropValue = Record(defaultPropName)
export { PropValue }

// Prop

const defaultProp: PropT = {
  type: 'prop',
  location: null,
  parent: null,
  name: null,
  value: null,
}

const Prop = Record(defaultProp)
export { Prop }

// ComponentName

const defaultComponentName: ComponentNameT = {
  type: 'component-name',
  locations: List(),
  parent: null,
  name: null,
}

const ComponentName = Record(defaultComponentName)
export { ComponentName }

// Component

const defaultComponent: ComponentT = {
  type: 'component',
  location: null,
  parent: null,
  name: null,
  props: List(),
  children: List(),
}

const Component = Record(defaultComponent)
export { Component }

// Cursor

const defaultCursor: CursorT = {
  path: List(),
  offset: 0,
}

const Cursor = Record(defaultCursor)
export { Cursor }

// ComponentTree

const defaultComponentTree: ComponentTreeT = {
  cursor: null,
  root: null,
}

const ComponentTree = Record(defaultComponentTree)

export { ComponentTree }
export default ComponentTree
