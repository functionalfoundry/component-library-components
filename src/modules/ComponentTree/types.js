import { List } from 'immutable'

export type PropValueTypeT =
  | 'any'
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

export type NodeIdentifierT = string

type PropValueNodeTypeT = 'prop-value'
type PropValueValueT = any

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

export type ComponentTreeNodeT = ComponentT | PropT | PropValueT

export type ComponentTreePathT = List<any>

export type ComponentTreeT = {
  root: ?ComponentT,
}
