import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import MultiPropertiesTable from './MultiPropertiesTable'

storiesOf('MultiPropertiesTable', module).add('Regular', () => (
  <PreviewContainer>
    <Preview label="Regular">
      <MultiPropertiesTable
        components={components}
        selectedComponentId={'2'}
        onClickPlus={action('onClickPlus')}
        onClickMinus={action('onClickMinus')}
        onChangeComponent={action('onChangeComponent')}
      />
    </Preview>
  </PreviewContainer>
))

const components = [
  {
    name: 'Tab',
    id: '1',
    properties: [
      {
        name: 'children',
        type: 'React.Element',
        default: '',
        description: 'The content of the tab label',
        isUsedByTreeEditor: false,
      },
    ],
  },
  {
    name: 'Tabs',
    id: '2',
    properties: [
      {
        name: 'kind',
        type: 'Primary | Secondary',
        default: 'false',
        description: 'The primary kind uses the underline and secondary uses a colored background',
        isUsedByTreeEditor: true,
      },
      {
        name: 'tabPosition',
        type: "'top' | 'bottom'",
        default: "'top'",
        description: 'The position of the tab labels',
        isUsedByTreeEditor: false,
      },
    ],
  },
  {
    name: 'TabList',
    id: '3',
    properties: [],
  },
]
