/* @flow */
import React from 'react'
import { EditableText, RadioGroup, Radio } from '@workflo/components'
import { Fonts } from '@workflo/styles'
import { Prop, PropValue } from '../../modules/ComponentTree'
import type { GlobalOptionsDataT, PropCompletionDataT } from '../../types/Completion'

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
        name: options && options[key] && options[key].name,
        value: options && options[key] && options[key].value,
        source: options && options[key] && options[key].source,
      })
    )
  }

  return result
}

const isOptionAppropriateForProp = (option, prop: Prop, value: PropValue) => {
  if (prop.value.type === 'function') {
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
        <Radio key={option.name} label={option.name} value={option.value} />
      ))}
  </RadioGroup>
)

const AnyPropValueChooser = (props: PropValueChooserPropsT) => (
  <RadioPropValueChooser {...props} />
)

type StringPropValueChooserStateT = {
  value: string,
}

class StringPropValueChooser extends React.Component {
  props: PropValueChooserPropsT
  state: StringPropValueChooserStateT

  constructor(props: PropValueChooserPropsT) {
    super(props)
    this.state = {
      value: props.value.value,
    }
  }

  handleChange = (value: string) => {
    this.setState(state => (state.value = value))
  }

  handleStopEdit = () => {
    this.props.onChange && this.props.onChange(this.state.value)
  }

  componentWillReceiveProps(nextProps: PropValueChooserPropsT) {
    if (this.props.value !== nextProps.value) {
      this.setState(state => (state.value = nextProps.value.value))
    }
  }

  render() {
    return (
      <EditableText
        value={this.props.value.value}
        onChange={this.handleChange}
        onStopEdit={this.handleStopEdit}
        theme={{
          text: {
            ...Fonts.code,
            minWidth: '0.25em !important',
            maxWidth: '200px !important',
            textAlign: 'left',
            wordBreak: 'break-all',
          },
        }}
      />
    )
  }
}

export { AnyPropValueChooser, StringPropValueChooser }
