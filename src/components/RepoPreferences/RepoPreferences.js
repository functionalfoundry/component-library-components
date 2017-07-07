/** @flow */
'use strict'

import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts, Spacing } from '@workflo/styles'
import { Button, Heading, TextInput, Tab, TabList, Tabs, View } from '@workflo/components'

/**
 * Theming
 */

const defaultTheme = {
  repoPreferences: {
    display: 'flex',
    flex: '1 auto',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  individualRepoPreferences: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  repoName: {
    ...Fonts.large,
  },
  inputField: {
    marginTop: Spacing.small,
  },
  inputFieldColumns: {
    display: 'flex',
    flexDirection: 'row',
  },
}

/**
 * Individual repo preferences
 */

const IndividualRepoPreferences = ({
  repo,
  onChange,
  onChangeLocalDirectory,
  onSelectLocalDirectory,
  theme,
  ...props
}) => (
  <View key={repo.id} {...theme.individualRepoPreferences}>
    <Heading size="Large">
      {repo.name}
    </Heading>
    <Heading
      size="Small"
      theme={{
        heading: {
          color: Colors.grey300,
          marginBottom: Spacing.base,
        },
      }}
    >
      {repo.url}
    </Heading>
    <View {...theme.inputField}>
      <View {...theme.inputFieldColumns}>
        <TextInput
          label="Local directory"
          value={repo.localPath || ''}
          onChange={path => {
            onChangeLocalDirectory(
              Object.assign({}, repo, {
                localPath: path,
              })
            )
          }}
          theme={{
            inputContain: {
              maxWidth: 600,
              marginRight: Spacing.base,
            },
            textInput: {
              color: 'white',
            },
          }}
        />
        <Button
          kind="secondary"
          shade="dark"
          label="Select..."
          onClick={() => onSelectLocalDirectory(repo)}
          theme={{
            button: {
              maxWidth: '7em',
            },
          }}
        />
      </View>
    </View>
    <View {...theme.inputField}>
      <TextInput
        label="Source directory (relative)"
        value={repo.sourcePath || ''}
        onChange={path => {
          onChange(
            Object.assign({}, repo, {
              sourcePath: path,
            })
          )
        }}
        theme={{
          inputContain: {
            maxWidth: 600,
          },
          textInput: {
            color: 'white',
          },
        }}
      />
    </View>
    <View {...theme.inputField}>
      <TextInput
        label="Component file pattern – glob | regex"
        value={repo.filePattern || ''}
        onChange={pattern => {
          onChange(
            Object.assign({}, repo, {
              filePattern: pattern,
            })
          )
        }}
        theme={{
          inputContain: {
            maxWidth: 600,
          },
          textInput: {
            color: 'white',
          },
        }}
      />
    </View>
    <View {...theme.inputField}>
      <TextInput
        label="Component name pattern – regex"
        value={repo.namePattern || ''}
        onChange={pattern => {
          onChange(
            Object.assign({}, repo, {
              namePattern: pattern,
            })
          )
        }}
        theme={{
          inputContain: {
            maxWidth: 600,
          },
          textInput: {
            color: 'white',
          },
        }}
      />
    </View>
  </View>
)

const ThemedIndividualRepoPreferences = Theme('IndividualRepoPreferences', defaultTheme)(
  IndividualRepoPreferences
)

/**
 * Repo preferences
 */

type RepoT = {
  id: string,
  name: string,
  description: string,
  localPath: string,
}

type PropsT = {
  repos: Array<RepoT>,
  onChange: Function,
  onChangeLocalDirectory: Function,
  onSelectLocalDirectory: Function,
  theme: Object,
}

const defaultProps = {
  repos: [],
  onChange: () => {},
  onChangeLocalDirectory: () => {},
  onSelectLocalDirectory: () => {},
}

const RepoPreferences = ({
  repos,
  onChange,
  onChangeLocalDirectory,
  onSelectLocalDirectory,
  theme,
  ...props
}: PropsT) => (
  <View {...theme.repoPreferences}>
    {repos.map((repo, index) => (
      <ThemedIndividualRepoPreferences
        key={repo.id}
        repo={repo}
        onChange={onChange}
        onChangeLocalDirectory={onChangeLocalDirectory}
        onSelectLocalDirectory={onSelectLocalDirectory}
      />
    ))}
  </View>
)

RepoPreferences.defaultProps = defaultProps

const ThemedRepoPreferences = Theme('RepoPreferences', defaultTheme)(RepoPreferences)
export default ThemedRepoPreferences
