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
  onChange: Function,
  onContinue: Function,
  repositories: Array<RepositoryT>,
  selectedIds: Array<string>,
  theme: any,
}

const defaultProps = {
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
                  : selectRepo(selectedIds, repo))
              }}
              theme={{
                inner: {
                  backgroundColor: isRepoSelected(selectedIds, repo)
                    ? Colors.grey800
                    : 'white'
                }
              }}
            />
            <View {...theme.repositoryName}>
              {repo.name}
            </View>
          </View>
        ))
      }
    </View>
    <View
      {...theme.buttons}
    >
      {
        selectedIds && selectedIds.length > 0 && (
          <Button
            label='Continue'
            kind={'hero'}
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
    marginBottom: Spacing.base,
  },
  repositories: {

  },
  repository: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.tiny,
  },
  repositoryName: {
    display: 'inline',
    marginLeft: Spacing.tiny,
    color: Colors.grey200,
    ...Fonts.base,
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
