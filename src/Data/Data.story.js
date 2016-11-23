import React from 'react'
import { storiesOf } from '@kadira/storybook'
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

  handleChange = (text) => {
    this.setState({
      text,
    })
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
