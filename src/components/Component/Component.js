/* @flow */
import React from 'react'
import Theme from 'js-theme'
import mergeProps from 'js-theme/lib/mergeProps'
import {
  Avatar,
  Card,
  Heading,
  Image,
  View,
} from '@workflo/components'
import {
  Colors,
  Corners,
  Fonts,
  Spacing,
  Shadows,
} from '@workflo/styles'

type Props = {
  name: string,
  owner: string,
  theme: Object,
  thumbnail: string,
  profilePhoto: string,
}

const Component = ({
  name,
  owner,
  profilePhoto,
  theme,
  thumbnail,
  ...props,
}: Props) => (
  <Card
    {...theme.componentCard}
    {...props}
    size='medium'
    flush
  >
    <View
      {...theme.imageContainer}
    >
      <Image
        {...theme.image}
        src={'http://placehold.it/250x250'}
      />
    </View>
    <View
      {...theme.footer}
    >
      <Heading
        {...theme.name}
        size='Base'
      >
        {name}
      </Heading>
      <Avatar
        image={profilePhoto}
        firstName={'Yaniv'}
        lastName={'Tal'}
        size='small'
        backgroundShade='Light'
        showName
      />
    </View>
  </Card>
)

const defaultTheme = {
  componentCard: {
    ...Corners.round,
    ...Shadows.small,
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    ':hover': {
      ...Shadows.large,
    },
  },
  thumbnail: {
    flex: 1,
    display: 'flex',
  },
  image: {
    width: '100%',
    maxHeight: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  imageContainer: {
    flex: 1,
    height: 250,
    position: 'relative',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 1',
    padding: Spacing.tiny,
  },
  name: {
    ...Fonts.base,
    color: Colors.grey800,
  },
  owner: {
    ...Fonts.base,
    // color: Colors.steel3,
  },
}

const ThemedComponent = Theme('Component', defaultTheme)(Component)
export default ThemedComponent
