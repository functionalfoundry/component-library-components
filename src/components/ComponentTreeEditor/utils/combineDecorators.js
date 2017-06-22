/* @flow */
const Slate = require('slate')

const combineDecorators = (decorators: Array<Function>, options: any) => (
  text: Slate.Text,
  block: Slate.Block
) => {
  try {
    return decorators.reduce((characters, decorator) => {
      return decorator(characters, options)
    }, text.characters)
  } catch (error) {
    console.error(error)
    return text.characters
  }
}

export default combineDecorators
