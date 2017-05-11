/** @flow */
/**
 * Helper for trimming whitespace from the left end of a string. Returns
 * a new string.
 */

const trimLeft = (str: String) => str.replace(/^\s+/, '')

export default trimLeft
