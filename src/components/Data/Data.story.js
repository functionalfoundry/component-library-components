import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Data from './Data'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import Preview from '@workflo/components/lib/Preview'
import actionsBabelPlugin from '../../utils/ActionsBabelPlugin'

storiesOf('Data', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='light'
    >
      <Preview
        label='Data'
      >
        <DataContainer />
      </Preview>
    </PreviewContainer>
  ))
const babelOptions = {
    presets: ['es2015', 'react', 'stage-0'],
    plugins: [actionsBabelPlugin],
    filename: 'workflo',
    babelrc: false,
  }

class DataContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: initialText,
    }
  }

  handleChange = (data) => {
    // this.setState({
    //   text: data.text,
    // })
    action('onChange')(data)
    try {
      const es5Ast = Babel.transform(data.text, babelOptions)
      console.log('code: ', es5Ast.code)
      // eval(es5Ast.code)
    } catch (err) {
      console.error(err.message)
    }
  }

  render () {
    return (
      <Data
        text={this.state.text}
        onChange={this.handleChange}
      />
    )
  }
}

const initialText = ``
