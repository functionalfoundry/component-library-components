import { Prop, PropValue } from '../../../modules/ComponentTree'

let count = 0

// TODO: What is the best way to generate IDs?
const createEmptyProp = () => {
  const newPropValue = PropValue({ id: `new-prop-value-${count}`, value: '' })
  const newProp = Prop({ id: `new-prop-${count}`, value: newPropValue })
  count++
  return newProp
}

export default createEmptyProp
