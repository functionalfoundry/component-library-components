/* @flow */
import React from 'react'
import TextEditor from '@workflo/components/lib/TextEditor'

import DataDecorator from './DataDecorator'
import dataBabelPlugin from './DataBabelPlugin'

type PropsT = {
  text: string,
  onChange: Function,
}

const defaultProps = {
  onChange: () => {},
}

const babelOptions = {
  presets: ['es2015', 'react', 'stage-0'],
  plugins: ['DataBabelPlugin'],
  filename: 'workflo',
  babelrc: false,
}

export default class Data extends React.Component {
  static defaultProps = defaultProps

  constructor (props: PropsT) {
    super(props)
    Babel.registerPlugin('DataBabelPlugin', dataBabelPlugin)
  }

  onChange = (text) => {
    console.log('onChange: ', text)
    try {
      const es5Ast = Babel.transform(text, babelOptions)
      eval(es5Ast.code)
      console.log('es5Ast: ', es5Ast.code)
    } catch (err) {
      console.error(err.message)
    }
  }

  render () {
    return (
      <TextEditor
        text={this.props.text}
        decorator={DataDecorator}
        onChange={this.onChange}
      />
    )
  }
}
