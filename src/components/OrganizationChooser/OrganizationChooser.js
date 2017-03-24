/** @flow */
'use strict'

import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts, Spacing } from '@workflo/styles'
import {
  Button,
  Heading,
  Radio,
  RadioGroup,
  View
} from '@workflo/components'

type OrganizationT = {
  id: string,
  name: string,
}

type PropsT = {
  onChange: Function,
  onContinueAsInvidual: Function,
  onContinueWithOrganization: Function,
  organizations: Array<OrganizationT>,
  selectedId: any,
  theme: any,
}

const defaultProps = {
  onChange: () => {},
  onContinueAsIndividual: () => {},
  onContinueWithOrganization: () => {},
  organizations: [],
}

const OrganizationChooser = ({
  onChange,
  onContinueAsInvidual,
  onContinueWithOrganization,
  organizations,
  selectedId,
  theme
}: PropsT) => (
  <View
    {...theme.organizationChooser}
  >
    <View
      {...theme.title}
    >
      <Heading size='Large'>Select an organization</Heading>
      <View
        {...theme.subtitle}>
        Only organizations with compatible repositories are shown
      </View>
    </View>
    <RadioGroup
      onChange={onChange}
      value={selectedId}
    >
      {
        organizations && organizations.map((organization) => (
          <Radio
            key={organization.id}
            label={organization.name}
            value={organization.id}
            theme={{
              container: {
                marginBottom: Spacing.tiny,
                color: 'white',
              }
            }}
          />
        ))
      }
    </RadioGroup>
    <View
      {...theme.buttons}
    >
      <Button
        label='Continue as an individual'
        kind={'hero'}
        ghost={true}
        onClick={onContinueAsInvidual}
        {...theme.button}
      />
      {
        selectedId && (
          <Button
            label='Continue'
            kind={'hero'}
            onClick={onContinueWithOrganization}
            {...theme.button}
          />
        )
      }
    </View>
  </View>
)

OrganizationChooser.defaultProps = defaultProps

const defaultTheme = {
  organizationChooser: {
  },
  title: {
    marginBottom: Spacing.base,
  },
  subtitle: {
    ...Fonts.small,
    color: Colors.grey400,
  },
  organization: {
    marginBottom: Spacing.tiny,
  },
  buttons: {
    marginTop: Spacing.base,
    flexDirection: 'row',
  },
  button: {
    flex: '0 0',
    marginRight: Spacing.tiny,
  },
}

const ThemedOrganizationChooser =
  Theme('OrganizationChooser', defaultTheme)(OrganizationChooser)

export default ThemedOrganizationChooser
