/** @flow */
'use strict'

import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts, Spacing } from '@workflo/styles'
import {
  Button,
  Heading,
  Checkbox,
  View
} from '@workflo/components'

type RepositoryT = {
  id: string,
  name: string,
}

type PropsT = {
  onBack: Function,
  onChange: Function,
  onContinue: Function,
  repositories: Array<RepositoryT>,
  selectedIds: Array<string>,
  theme: any,
}

const defaultProps = {
  onBack: () => {},
  onChange: () => {},
  onContinue: () => {},
  repositories: [],
}

const isRepoSelected = (selectedIds, repo) =>
  selectedIds && selectedIds.indexOf(repo.id) >= 0

const selectRepo = (selectedIds, repo) =>
  [...new Set([...(selectedIds || []), repo.id])]

const deselectRepo = (selectedIds, repo) =>
  [...new Set([...(selectedIds || []).filter(id => id !== repo.id)])]

const RepositoryChooser = ({
  onBack,
  onChange,
  onContinue,
  repositories,
  selectedIds,
  theme
}: PropsT) => (
  <View
    {...theme.repositoryChooser}
  >
    <View
      {...theme.title}
    >
      <Heading size='Large'>Select repositories</Heading>
      <View
        {...theme.subtitle}
      >
        Only compatible repositories are shown
      </View>
    </View>
    <View {...theme.repositories}>
      {
        repositories && repositories.map(repo => (
          <View
            {...theme.repository}
            key={repo.id}
          >
            <Checkbox
              checked={isRepoSelected(selectedIds, repo)}
              onChange={() => {
                onChange(
                  isRepoSelected(selectedIds, repo)
                  ? deselectRepo(selectedIds, repo)
                  : selectRepo(selectedIds, repo)
                )
              }}
              theme={{
                inner: {
                  backgroundColor: isRepoSelected(selectedIds, repo)
                    ? Colors.grey800
                    : 'white'
                }
              }}
            />
            <View
              {...theme.repositoryDetails}
              onClick={() => {
                onChange(
                  isRepoSelected(selectedIds, repo)
                  ? deselectRepo(selectedIds, repo)
                  : selectRepo(selectedIds, repo)
                )
              }}
            >
              <View {...theme.repositoryName}>
                {repo.name}
              </View>
              <View {...theme.repositoryDescription}>
                {repo.description}
              </View>
            </View>
          </View>
        ))
      }
    </View>
    <View
      {...theme.buttons}
    >
      <Button
        label='Back to organizations'
        kind='hero'
        ghost={true}
        onClick={onBack}
        {...theme.button}
      />
      {
        selectedIds && selectedIds.length > 0 && (
          <Button
            label='Get started'
            kind='hero'
            onClick={onContinue}
            {...theme.button}
          />
        )
      }
    </View>
  </View>
)

RepositoryChooser.defaultProps = defaultProps

const defaultTheme = {
  repositoryChooser: {
  },
  title: {
    marginBottom: Spacing.large,
  },
  subtitle: {
    ...Fonts.small,
    color: Colors.grey400,
  },
  repositories: {
  },
  repository: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.small,
  },
  repositoryDetails: {
    cursor: 'pointer',
    display: 'inline',
    marginLeft: Spacing.tiny,
  },
  repositoryName: {
    ...Fonts.base,
  },
  repositoryDescription: {
    ...Fonts.small,
    color: Colors.grey400,
  },
  buttons: {
    marginTop: Spacing.large,
    flexDirection: 'row',
  },
  button: {
    flex: '0 0',
    marginRight: Spacing.tiny,
  },
}

const ThemedRepositoryChooser =
  Theme('RepositoryChooser', defaultTheme)(RepositoryChooser)

export default ThemedRepositoryChooser
