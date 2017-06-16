/** @flow */
'use strict'

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import { PreviewContainer } from '@workflo/components'

import OrganizationSignIn from './OrganizationSignIn'

storiesOf('OrganizationSignIn', module).add('Regular', () => (
  <PreviewContainer>
    <OrganizationSignIn
      organizationName="Airbnb"
      onSignInWithGitHub={action('onSignInWithGitHub')}
      onSignUpWithEmail={action('onSignUpWithEmail')}
    />
  </PreviewContainer>
))
