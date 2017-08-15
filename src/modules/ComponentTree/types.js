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

export type StatusT = {
  isValid: boolean,
  message: string,
}

type PropValueNodeTypeT = 'prop-value'
type PropValueValueT = any

type PropValueT = {
  id: ?NodeIdentifierT,
  nodeType: PropValueNodeTypeT,
  path: List<string>,
  status: {
    isValid: boolean,
    message: string,
  },
  type: ?PropValueTypeT,
  value: ?PropValueValueT,
}

type PropNodeTypeT = 'prop'
type PropT = {
  id: ?NodeIdentifierT,
  path: List<string>,
  nodeType: PropNodeTypeT,
  name: ?string,
  value: ?PropValueT,
}

type ComponentNodeTypeT = 'component'
type ComponentT = {
  id: ?NodeIdentifierT,
  nodeType: ComponentNodeTypeT,
  name: ?string,
  path: List<string>,
  props: ?List<PropT>,
  children: ?List<ComponentT>,
}

type ParamT = {
  name: string,
  type: string,
}

type RenderCallbackNodeTypeT = 'render-callback'
export type RenderCallbackT = {
  id: ?NodeIdentifierT,
  nodeType: RenderCallbackNodeTypeT,
  child: ?ComponentT,
  params: List<ParamT>,
}

export type ComponentTreeNodeT = ComponentT | PropT | PropValueT

export type ComponentTreePathT = List<any>

export type ComponentTreeT = {
  root: ?ComponentT,
}
