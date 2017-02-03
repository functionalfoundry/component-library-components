import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Data from './Data'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import Preview from '@workflo/components/lib/Preview'
import actionsBabelPlugin from '../../utils/ActionsBabelPlugin'
import dataBabelPlugin from '../../utils/DataBabelPlugin'

storiesOf('Data', module)
  .add('Data plugin', () => (
    <PreviewContainer
      shade='light'
    >
      <Preview
        label='Data'
      >
        <DataContainer
          text={initialDataText}
          plugin={dataBabelPlugin}
        />
      </Preview>
    </PreviewContainer>
  ))
  .add('Actions plugin', () => (
    <PreviewContainer
      shade='light'
    >
      <Preview
        label='Data'
      >
        <DataContainer
          text={initialActionsText}
          plugin={actionsBabelPlugin}
        />
      </Preview>
    </PreviewContainer>
  ))

class DataContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: this.props.text,
    }
  }

  handleChange = (text) => {
    action('onChange')(text)

    const babelOptions = {
      presets: ['es2015', 'react', 'stage-0'],
      plugins: [this.props.plugin],
      filename: 'workflo',
      babelrc: false,
    }

    try {
      const es5Ast = Babel.transform(text, babelOptions)
      console.log('code', es5Ast.code)
    } catch (err) {
      console.error(err)
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

const initialDataText = `
const button = ({title}) => {}
const label = ({caption}) => {}
`

const initialActionsText = `
const handleClick = ({event}) => {}
const handleHover = ({event}) => {}
`
