import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import Configuration from './Configuration'

storiesOf('Configuration', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
        theme={{
          preview: {
            width: 900,
          },
        }}
      >
        <Configuration
          onChange={action('onChange')}
          onClickAddRepo={action('onClickAddRepo')}
          onClickAddTheme={action('onClickAddTheme')}
          onClickDeleteRepo={action('onClickDeleteRepo')}
          onClickDeleteTheme={action('onClickDeleteTheme')}
          configuration={{
            repos,
            themes,
          }}
        />
      </Preview>
    </PreviewContainer>
  ))

const repos = [
  {
    name: 'Example Library',
    rootDirectory: '/User/Projects/workflo/example-library',
    sourcePath: 'src',
    filePattern: '/**/index.js',
    namePattern: '/()/index.js',
  },
  {
    name: 'Components',
    rootDirectory: '/User/Projects/workflo/components',
    sourcePath: 'src',
    filePattern: '/**/index.js',
    namePattern: '/()/index.js',
  },
]

const themes = [
  {
    name: 'Light',
    backgroundColor: '#fff',
  },
  {
    name: 'Dark',
    backgroundColor: '#434345',
  },
]
