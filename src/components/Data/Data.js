/* @flow */
import React from 'react'
import TextEditor from '@workflo/components/lib/TextEditor'

import DataDecorator from '../../utils/DataDecorator'
import dataBabelPlugin from '../../utils/DataBabelPlugin'

type PropsT = {
  text: string,
  editorState: Object,
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

  handleChange = ({ text, editorState }) => {
    try {
      const es5Ast = Babel.transform(text, babelOptions)
      eval(es5Ast.code)
      if (this.props.onChange) {
        this.props.onChange({
          data: window.workflo.liveView.data,
          text,
          editorState,
        })
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  render () {
    return (
      <TextEditor
        text={this.props.text}
        editorState={this.props.editorState}
        decorator={DataDecorator}
        onChange={this.handleChange}
      />
    )
  }
}
