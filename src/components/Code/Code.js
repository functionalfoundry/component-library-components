/* @flow */
import React from 'react'
import TextEditor from '@workflo/components/lib/TextEditor'
import PropKeyValuePlugin from '../../utils/EditorPlugins/PropKeyValuePlugin'

import type PropKeyValueT from '../../types/PropKeyValueT'

type PropsT = {
  componentName: string,
  propKeyValues: Array<PropKeyValueT>,
  onChange: Function,
  onRemoveProp: Function,
}

type PropsT = {
  componentName: string,
  propKeyValues: Array<PropKeyValueT>,
  onChange: Function,
  onRemoveProp: Function,
}

type StateT = {
  text: string,
  plugins: Array<Object>,
}

const defaultProps = {
  componentName: 'Unknown',
  propKeyValues: [],
  onChange: () => {},
  onRemoveProp: () => {},
}

export default class Code extends React.Component {
  props: PropsT
  state: StateT

  static defaultProps = defaultProps

  constructor(props: PropsT) {
    super(props)
    this.state = {
      text: this.getText(props),
      plugins: this.getPlugins(props),
    }
  }

  componentWillReceiveProps(nextProps: PropsT) {
    if (nextProps.propKeyValues !== this.props.propKeyValues) {
      this.setState({
        text: this.getText(nextProps),
        plugins: this.getPlugins(nextProps),
      })
    }
  }

  getText = ({ componentName, propKeyValues }: PropsT) =>
    getCodeString(componentName, propKeyValues)

  getPlugins = ({ onRemoveProp, propKeyValues }: PropsT) => ([
    PropKeyValuePlugin({
      onChange: this.handleChange,
      onRemoveProp,
      propKeyValues
    }),
  ])

  handleChange = (key: string, value: any) => {
    const {
      onChange,
      propKeyValues,
    } = this.props
    const propKeyValue = propKeyValues.find((propKeyValue) => propKeyValue.key === key)
    const index = propKeyValues.indexOf(propKeyValue)
    const newPropKeyValues = [...propKeyValues]
    newPropKeyValues[index].value.value = value
    onChange(newPropKeyValues)
  }

  render() {
    return (
      <TextEditor
        text={this.state.text}
        plugins={this.state.plugins}
        readOnly={true}
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
