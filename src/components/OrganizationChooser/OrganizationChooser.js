/** @flow */
'use strict'

import React from 'react'
import Theme from 'js-theme'
import { Spacing } from '@workflo/styles'
import { Heading, Radio, RadioGroup, View } from '@workflo/components'

type OrganizationT = {
  id: string,
  name: string,
}

type PropsT = {
  onChange: Function,
  organizations: Array<OrganizationT>,
  selectedId: any,
  theme: any,
}

const OrganizationChooser = ({
  onChange,
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
    </View>
    <RadioGroup
      onChange={onChange}
      value={selectedId}
    >
      {
        organizations && organizations.map((organization) => (
          <Radio
            label={organization.name}
            value={organization.id}
          />
        ))
      }
    </RadioGroup>
  </View>
)

const defaultTheme = {
  title: {
    marginBottom: Spacing.small,
  },
  organizationChooser: {
  }
}

const ThemedOrganizationChooser =
  Theme('OrganizationChooser', defaultTheme)(OrganizationChooser)

export default ThemedOrganizationChooser