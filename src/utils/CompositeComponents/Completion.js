/* @flow */

import type { PropValueTypeT } from './ComponentTree'

/**
 * Completion data types
 */

export type PropCompletionDataT = {
  type: PropValueTypeT,
  options: Array<any>,
}

export type PropsCompletionDataT = {
  [key: string]: PropCompletionDataT,
}

export type OptionSourceT = 'state' | 'data' | 'actions'

export type GlobalOptionDataT = {
  name: string,
  value: any,
  type: PropValueTypeT,
  source: OptionSourceT,
}

export type GlobalOptionsDataT = {
  [key: string]: GlobalOptionDataT,
}

export type ComponentPropsCompletionDataT = {
  [key: string]: PropsCompletionDataT,
}

export type CompletionDataT = {
  components: Array<string>,
  props: ComponentPropsCompletionDataT,
  globalOptions: GlobalOptionsDataT,
}
