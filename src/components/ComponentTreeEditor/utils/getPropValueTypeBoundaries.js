import { PropValue } from '../../../modules/ComponentTree'

const typeValueBoundaries = {
  any: '{}',
  string: "''",
}

const getPropValueTypeBoundaries = (type: string) => {
  const text = typeValueBoundaries[type] || typeValueBoundaries['any']
  return {
    open: text[0],
    close: text[1],
  }
}

export default getPropValueTypeBoundaries
