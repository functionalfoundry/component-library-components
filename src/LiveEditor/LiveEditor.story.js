import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import LiveEditor from './LiveEditor'

storiesOf('LiveEditor', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
      >
        <LiveEditor
          componentName='Comment'
          propKeyValues={propKeyValues}
          onChangeCode={() => {}}
          dataCode={initialText}
        />
      </Preview>
    </PreviewContainer>
  ))

const propKeyValues = [
  {
    key: 'comment',
    type: 'variable',
    value: 'comment',
    options: [
      'comment',
      'description',
      'user',
    ],
  },
  {
    key: 'description',
    type: 'variable',
    value: 'description',
    options: [
      'comment',
      'description',
      'user',
    ],
  },
  {
    key: 'size',
    type: 'string',
    value: 'Base',
    options: [
      'Tiny',
      'Small',
      'Base',
      'Large',
      'Huge',
    ],
  },
  {
    key: 'likeCount',
    type: 'number',
    value: 21,
  },
]

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
