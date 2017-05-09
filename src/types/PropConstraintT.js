export type PropConstraintTypeT = 'union' | 'range'

export type UnionConstraintValueT = Array<any>

export type RangeConstraintValueT = {
  min: Number,
  max: Number,
  step: ?Number,
}

export type PropConstraintT = {
  type: PropConstraintTypeT,
  value: UnionConstraintValueT | RangeConstraintValueT,
}
