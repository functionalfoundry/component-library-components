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
  Fonts,
  Spacing,
  Shadows,
} from '@workflo/styles'

type Props = {
  name: string,
  theme: Object,
  thumbnail: string,
}

const Component = ({
  name,
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
        src={thumbnail || 'http://placehold.it/250x250'}
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
    </View>
  </Card>
)

const defaultTheme = {
  componentCard: {
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
}

const ThemedComponent = Theme('Component', defaultTheme)(Component)
export default ThemedComponent
