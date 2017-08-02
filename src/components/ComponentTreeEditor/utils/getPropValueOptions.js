/** @flow */
import type {
  CompletionDataT,
  CompletionOptionT,
  GlobalOptionsDataT,
  PropCompletionDataT,
} from '../../../types/Completion'
import type { Component, Prop } from '../../../modules/ComponentTree'

const unifyOptions = (
  completionData: ?PropCompletionDataT,
  options: ?GlobalOptionsDataT
): Array<CompletionOptionT> => {
  const result = []

  if (completionData && completionData.options) {
    completionData.options.map(option =>
      result.push({
        name: option,
        value: option,
        source: null,
      })
    )
  }

  if (options && Object.keys(options)) {
    Object.keys(options).map(key =>
      result.push({
        name: (options && options[key] && options[key].name) || '',
        value: options && options[key] && options[key].value,
        source: options && options[key] && options[key].source,
      })
    )
  }

  return result
}

const isOptionAppropriateForProp = (option, propValueNode: ?Object) => {
  if (propValueNode && propValueNode.get('type') === 'function') {
    return (
      option.source === 'actions' && option.name !== 'setState' && option.name !== 'state'
    )
  } else {
    return (
      option.source !== 'actions' &&
      option.name !== 'initialState' &&
      option.name !== 'state'
    )
  }
}

/**
 * Utility for getting the completion options for a specific component/prop pair.
 * Returns a combination of global options and options specific for that prop.
 *
 * This utility *does not* filter the options based on any specific value that the
 * user has inputed.
 */
type GetPropValueOptionsT = ({
  completionData: CompletionDataT,
  propNode: Prop,
  componentNode: Component,
}) => Array<CompletionOptionT>
const getPropValueOptions: GetPropValueOptionsT = ({
  completionData,
  propNode,
  componentNode,
}) => {
  const componentName = componentNode.get('name')
  const propName = propNode.get('name')
  const propValueNode = propNode.get('value')

  const propSpecificOptions = (completionData &&
    completionData.props &&
    completionData.props[componentName] &&
    completionData.props[componentName][propName]) || {
    type: 'any',
    options: [],
  }

  const globalOptions = completionData && completionData.globalOptions

  return unifyOptions(propSpecificOptions, globalOptions).filter(option =>
    isOptionAppropriateForProp(option, propValueNode)
  )
}

export default getPropValueOptions
