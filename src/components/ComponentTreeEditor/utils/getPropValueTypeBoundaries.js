import { PropValue } from '../../../modules/ComponentTree'

const typeValueBoundaries = {
  any: '{}',
  string: "''",
}

const getPropValueTypeBoundaries = (value: PropValue) => {
  const text = typeValueBoundaries[value.type] || typeValueBoundaries['any']
  return {
    open: text[0],
    close: text[1],
  }
}

export default getPropValueTypeBoundaries
