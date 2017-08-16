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
  children: ?List<ChildT>,
}

type RenderCallbackNodeTypeT = 'render-callback'
export type RenderCallbackT = {
  id: ?NodeIdentifierT,
  nodeType: RenderCallbackNodeTypeT,
  children: List<ChildT>,
  /**
   * Must be a valid string that could be found in between the parenthesis of
   * a JS function signature. (i.e. comma separated, default values, destructuring)
   */
  params: string,
}

type TextNodeNodeTypeT = 'text'
export type TextNodeT = {
  id: ?NodeIdentifierT,
  nodeType: TextNodeNodeTypeT,
  value: string,
}

type MapExpressionNodeTypeT = 'map-expression'
export type MapExpressionT = {
  id: ?NodeIdentifierT,
  nodeType: MapExpressionNodeTypeT,
  /** The name of the collection being mapped over */
  collection: string,
  children: List<ChildT>,
}

export type ChildT = ComponentT | TextNodeT | RenderCallbackT | MapExpressionT

export type ComponentTreeNodeT =
  | ComponentT
  | PropT
  | PropValueT
  | TextNodeT
  | RenderCallbackT
  | MapExpressionT

export type ComponentTreePathT = List<any>

export type ComponentTreeT = {
  root: ?ComponentT,
}
