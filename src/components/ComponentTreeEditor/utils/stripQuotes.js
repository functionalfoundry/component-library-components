const stripQuotes = str => {
  if (typeof str === 'string') {
    return str.replace(/^['"](.+(?=['"]$))['"]$/, '$1')
  }
  console.warn('str: ', str, ' is not a string.')
  return str
}

export default stripQuotes
