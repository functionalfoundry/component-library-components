/* @flow */
import React from 'react'

import { codeDecoratorFactory } from '../../utils/CodeDecorator'
import TextEditor from '@workflo/components/lib/TextEditor'

export type CodePropKeyValueTypeT = 'Radio' | 'Checkbox' | 'Slider' | 'TextInput' | 'Date' | 'Color' | 'Icon'
type InputT = {
  type: CodePropKeyValueT,
}

export type ValueTypeT = 'String' | 'Javascript'
type ValueT = {
  type: ValueTypeT,
  value: any,
}

export type CodePropKeyValueT = {
  key: string,
  value: ValueT,
  options: Array<string>,
  input: InputT,
}

type PropsT = {
  componentName: string,
  propKeyValues: Array<CodePropKeyValueT>,
  onChange: Function,
  onRemoveProp: Function,
}

const defaultProps = {
  onChange: () => {},
}

export default class Code extends React.Component {
  static defaultProps = defaultProps

  constructor(props: PropsT) {
    super(props)
    this.state = {
      text: this.getText(props),
      decorator: this.getDecorator(props),
    }
  }

  componentWillReceiveProps(nextProps: PropsT) {
    if (nextProps.propKeyValues !== this.props.propKeyValues) {
      this.setState({
        text: this.getText(nextProps),
        decorator: this.getDecorator(nextProps),
      })
    }
  }

  getText = ({ componentName, propKeyValues }: PropsT) =>
    getCodeString(componentName, propKeyValues)

  getDecorator = ({ propKeyValues, onRemoveProp }: PropsT) => {
    return codeDecoratorFactory(propKeyValues, onRemoveProp, this.handleChange)
  }

  handleChange = (key, value) => {
    const {
      onChange,
      propKeyValues,
    } = this.props
    // this.setState({})
    const propKeyValue = propKeyValues
      .find((propKeyValue) => propKeyValue.key === key)
    const index = propKeyValues.indexOf(propKeyValue)
    const newPropKeyValues = [...propKeyValues]
    newPropKeyValues[index].value.value = value
    onChange(newPropKeyValues)
  }

  render() {
    return (
      <TextEditor
        text={this.state.text}
        decorator={this.state.decorator}
        readOnly
      />
    )
  }
}

const getCodeString = (componentName, propKeyValues) => {
  const props = propKeyValues
    .map((propKeyValue) => {
      const { key, value } = propKeyValue
      switch (value.type) {
        case 'JavaScript':
          return `  ${key}={${value.value}}`
        case 'String':
          return `  ${key}='${value.value}'`
        default:
          return `  ${key}={${value.value}}`
      }
    })
    .join('\n')
  return `<${componentName}\n${props}\n/>`
}
