/* @flow */

export type PropKeyValueTypeT =
  | 'Radio'
  | 'Checkbox'
  | 'Slider'
  | 'TextInput'
  | 'Date'
  | 'Color'
  | 'Icon'

type InputT = {
  type: PropKeyValueTypeT,
}

export type ValueTypeT = 'String' | 'Javascript'

type ValueT = {
  type: ValueTypeT,
  value: any,
}

export type PropKeyValueT = {
  key: string,
  value: ValueT,
  options: Array<string>,
  input: InputT,
}
