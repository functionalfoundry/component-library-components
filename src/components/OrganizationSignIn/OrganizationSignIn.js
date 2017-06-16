import React from 'react'
import { Button, Icon, Image, Heading } from '@workflo/components'
import { BreakPoints, Colors, Fonts, Spacing } from '@workflo/styles'
import Theme from 'js-theme'
import PieceOfPraise from './PieceOfPraise'
import HorizontalSeparator from '../HorizontalSeparator'
import VerticalSeparator from '../VerticalSeparator'

type PropsT = {
  /* The org's display name */
  organizationName: string,
  /* The image URL for the org logo */
  organizationLogo: string,
  /* Called when the user clicks the Sign In with GitHub button */
  onSignInWithGitHub: Function,
  /* Called when the user clicks the Sign Up with Email button */
  onSignUpWithEmail: Function,
  /* JS Theme */
  theme: object,
}

const OrganizationSignIn = ({
  theme,
  organizationName,
  onSignInWithGitHub,
  onSignUpWithEmail,
}: PropsT) => (
  <div {...theme.organizationSignIn}>
    <div {...theme.headline}>
      <Heading size="Large">
        {`${posessionize(organizationName)} Component Library`}
      </Heading>
    </div>
    <div {...theme.logos}>
      <Icon name="logo" size="large" {...theme.workfloLogo} />
      <VerticalSeparator marginLeft={Spacing.base} marginRight={Spacing.base} />
      <Image src="https://luna1.co/c05e6e.png" height={37} />
    </div>
    <div {...theme.loginNotice}>
      {`You must be logged in to view your components`}
    </div>
    <Button kind="hero" ghost onClick={onSignInWithGitHub}>
      <Icon
        name="github"
        fill="white"
        theme={{
          icon: {
            marginRight: 12,
            marginTop: -3,
          },
          svg: {
            width: 28,
            height: 28,
          },
        }}
      />
      {'Sign in with GitHub'}
    </Button>
    <div {...theme.noGitHub}>
      <div {...theme.noGitHubText}>
        {`Don't have GitHub?`}
      </div>
      <Button onClick={onSignUpWithEmail}>Sign up with email</Button>
    </div>
    <HorizontalSeparator marginTop={Spacing.base} marginBottom={Spacing.large} />
    <div {...theme.praise}>
      <PieceOfPraise
        description="This is fucking sick!"
        name="Kent C. Dodds"
        username="@kentc"
        photo="https://pbs.twimg.com/profile_images/759557613445001216/6M2E1l4q_400x400.jpg"
      />
      {praiseSeparator}
      <PieceOfPraise
        description="What on earth are these people smoking and how do I get some?"
        name="Dan Abramov"
        username="@dannyboi"
        photo="https://d2eip9sf3oo6c2.cloudfront.net/instructors/avatars/000/000/032/bio/9VsY9i09.jpeg?1444932586"
      />
      {praiseSeparator}
      <PieceOfPraise
        description="This totally changed how we do UI development and increased the number of components we can comfortably share"
        name="Mark Dalgleish"
        username="@markymark"
        photo="https://pbs.twimg.com/profile_images/754886061872979968/BzaOWhs1_400x400.jpg"
      />
    </div>
  </div>
)

const praiseSeparator = (
  <HorizontalSeparator
    width={80}
    theme={{
      horizontalSeparator: {
        '@media (min-width: 800px)': {
          display: 'none',
        },
      },
    }}
  />
)

// This is a naive implementation. TODO: Make more robust
const posessionize = name => `${name}\'s`

const defaultTheme = {
  organizationSignIn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  logos: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: Spacing.small,
  },
  workfloLogo: {},
  organizationLogo: {
    // scale: ''
  },
  loginNotice: {
    ...Fonts.base,
    maxWidth: 400,
    margin: Spacing.small,
  },
  noGitHub: {
    ...Fonts.base,
    margin: Spacing.large,
  },
  noGitHubText: {
    marginBottom: Spacing.tiny,
  },
  praise: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    [`@media (max-width: ${BreakPoints.tablet}px)`]: {
      flexDirection: 'column',
    },
  },
}

export default Theme('OrganizationSignIn', defaultTheme)(OrganizationSignIn)
