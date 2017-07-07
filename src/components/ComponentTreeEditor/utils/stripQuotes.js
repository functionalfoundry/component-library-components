const stripQuotes = str => str.replace(/^['"](.+(?=['"]$))['"]$/, '$1')

export default stripQuotes
