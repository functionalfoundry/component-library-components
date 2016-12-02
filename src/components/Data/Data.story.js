import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Data from './Data'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import Preview from '@workflo/components/lib/Preview'

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

class DataContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: initialText,
    }
  }

  handleChange = (data) => {
    this.setState({
      text: data.text,
      editorState: data.editorState,
    })
    action('onChange')(data)
  }

  render () {
    return (
      <Data
        text={this.state.text}
        editorState={this.state.editorState}
        onChange={this.handleChange}
      />
    )
  }
}

const initialText = `const user = {
  firstName: 'Brenda',
  lastName: 'Jenner',
}

const comment = {
  description: 'Something good',
}

const responders = [
  {
    firstName: 'Brenda',
    lastName: 'Jenner',
  },
  {
    firstName: 'Jenna',
    lastName: 'Doe',
  },
]`
