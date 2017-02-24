/* @flow */

import React from 'react'
import Theme from 'js-theme'
import { RadioGroup, Radio, View } from '@workflo/components'
import {
  Prop,
  PropValue,
} from '../../utils/CompositeComponents/ComponentTree'
import type {
  GlobalOptionsDataT,
  PropCompletionDataT,
} from '../../utils/CompositeComponents/Completion'

export type PropValueChooserPropsT = {
  prop: Prop,
  value: PropValue,
  completionData: ?PropCompletionDataT,
  options: ?GlobalOptionsDataT,
  onChange: Function,
}

const unifyOptions = (
  completionData: ?PropCompletionDataT,
  options: ?GlobalOptionsDataT
) => {
  const result = []

  if (completionData && completionData.options) {
    completionData.options.map(option => (
      result.push({
        name: option,
        value: option,
        source: null
      })
    ))
  }

  if (options && Object.keys(options)) {
    Object.keys(options).map(key => (
      result.push({
        name: options && options[key] && options[key].name,
        value: options && options[key] && options[key].value,
        source: options && options[key] && options[key].source
      })
    ))
  }

  return result
}

const isOptionAppropriateForProp = (option, prop: Prop, value: PropValue) => {
  if (prop.value.type == 'function') {
    return option.source == 'actions'
        && option.name !== 'setState'
        && option.name !== 'state'
  } else {
    return option.source !== 'actions'
        && option.name !== 'initialState'
  }
}

const RadioPropValueChooser = ({
  prop,
  value,
  completionData,
  options,
  onChange,
}: PropValueChooserPropsT) => (
  <RadioGroup
    value={value.value}
    theme={{
      radioGroup: {
        marginRight: 20,
      },
    }}
    onChange={onChange}
  >
    {unifyOptions(completionData, options)
      .filter(option => isOptionAppropriateForProp(option, prop, value))
      .map(option => (
        <Radio
          key={option.name}
          label={option.name}
          value={option.value}
        />
      ))}
  </RadioGroup>
)

const AnyPropValueChooser = (props: PropValueChooserPropsT) => (
  <RadioPropValueChooser {...props} />
)

export {
  AnyPropValueChooser,
}
