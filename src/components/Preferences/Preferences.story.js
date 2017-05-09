import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import Preferences from './Preferences'
import RepoPreferences from '../RepoPreferences'
import ThemePreferences from '../ThemePreferences'

const repos = [
  {
    id: '1',
    name: 'Example Library',
    url: 'https://github.com/workfloapp/example-library',
    description: 'Some example library',
    localPath: '/Users/jannis/Work/example-library',
  },
  {
    id: '2',
    name: 'Component Library Components',
    url: 'https://github.com/workfloapp/component-library-components',
    description: 'Some other component library',
    localPath: '/Users/jannis/Work/component-library-components',
  },
]

const themes = [
  {
    id: '1',
    name: 'Dark',
  },
  {
    id: '2',
    name: 'Light',
  },
]

storiesOf('Preferences', module)
  .add('Empty', () => (
    <PreviewContainer>
      <Preview label={'Empty'}>
        <Preferences />
      </Preview>
    </PreviewContainer>
  ))
  .add('Repo preferences', () => (
    <PreviewContainer>
      <Preview label={'Empty'}>
        <Preferences>
          <RepoPreferences title={'Repositories'} repos={repos} />
        </Preferences>
      </Preview>
    </PreviewContainer>
  ))
  .add('Repo & theme preferences', () => (
    <PreviewContainer>
      <Preview label={'Empty'}>
        <Preferences>
          <RepoPreferences
            title={'Repositories'}
            repos={repos}
            onChange={action('onChange')}
            onSelectLocalDirectory={action('onSelectLocalDirectory')}
          />
          <ThemePreferences title={'Themes'} themes={themes} />
        </Preferences>
      </Preview>
    </PreviewContainer>
  ))
