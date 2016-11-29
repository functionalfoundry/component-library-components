import { PropTypeT } from './PropTypeT'
import { PropConstraintT } from './PropConstraintT'

export type PropT = {
  name: String,
  type: PropTypeT,
  defaultValue: any,
  description: String,
  constraint: PropConstraintT,
  isRequired: Boolean,
}
