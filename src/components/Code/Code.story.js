import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Code from './Code'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import Preview from '@workflo/components/lib/Preview'

storiesOf('Code', module).add('Regular', () => (
  <PreviewContainer shade="light">
    <Preview label="Code">
      <StoryContainer />
    </Preview>
  </PreviewContainer>
))

class StoryContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      propKeyValues: [
        {
          key: 'comment',
          input: {
            type: 'Radio',
          },
          value: {
            type: 'JavaScript',
            value: 'comment',
          },
          options: ['comment', 'description', 'user'],
        },
        {
          key: 'description',
          input: {
            type: 'Radio',
          },
          value: {
            type: 'JavaScript',
            value: 'description',
          },
          options: ['comment', 'description', 'user'],
        },
        {
          key: 'size',
          input: {
            type: 'Radio',
          },
          value: {
            type: 'String',
            value: 'Base',
          },
          options: ['Tiny', 'Small', 'Base', 'Large', 'Huge'],
        },
        {
          key: 'likeCount',
          input: {
            type: 'Slider',
          },
          value: 21,
        },
      ],
    }
  }

  handleChange = propKeyValues => {
    this.setState({ propKeyValues })
  }

  render() {
    return (
      <Code
        componentName="Comment"
        propKeyValues={this.state.propKeyValues}
        onChange={this.handleChange}
        onRemoveProp={action('onRemoveProp')}
      />
    )
  }
}
