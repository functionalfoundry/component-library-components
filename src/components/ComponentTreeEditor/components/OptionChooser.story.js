/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Preview, PreviewContainer } from '@workflo/components'

import OptionChooser from './OptionChooser'

const completionData = {
  components: ['List', 'ListItem'],
  props: {
    List: {
      title: {
        type: 'string',
      },
      onSelect: {
        type: 'function',
      },
      listWidth: {
        type: 'number',
        options: ['10', '20', '30'],
      },
    },
    ListItem: {
      key: {
        type: 'string',
      },
    },
  },
  globalOptions: {
    'state.title': {
      name: 'state.title',
      value: 'state.title',
      type: 'string',
      source: 'state',
    },
    handleSelect: {
      name: 'handleSelect',
      value: 'handleSelect',
      type: 'function',
      source: 'actions',
    },
  },
}

const options = [
  {
    name: 'foo',
    value: 'foo',
    type: 'function',
  },
]

const optionsLong = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
  'Option 8',
  'Option 9',
  'Option 10',
  'Option 11',
  'Option 12',
]

storiesOf('OptionChooser', module).add('Regular', () =>
  <PreviewContainer shade="light">
    <Preview label="Regular">
      <OptionChooser accessOption={option => option.value} options={options} />
    </Preview>
    <Preview label="Long Options">
      <OptionChooser options={optionsLong} />
    </Preview>
  </PreviewContainer>
)
