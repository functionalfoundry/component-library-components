/* @flow */
import React from 'react'
import {
  Card,
  Icon,
  View,
} from '@workflo/components'
import {
  Colors,
  Corners,
  Fonts,
  Spacing,
  Shadows,
} from '@workflo/styles'
import Theme from 'js-theme'

type Props = {
  theme: Object,
}

const AnimationDemo = ({
  theme,
  ...props,
}: Props) => (
  <Card
    {...theme.card}
    size='medium'
  >
    <Icons theme={theme} />
  </Card>
)

type IconsPropsT = {
  theme: Object,
}

const Icons = ({ theme }: IconsPropsT) => (
  <View {...theme.icons}>
    <Icon
      name='alignment'
      size='large'
      stroke='black'
    />
    <Icon
      name='theme'
      size='large'
      stroke='black'
    />
    <Icon
      name='size'
      size='large'
      stroke='black'
    />
  </View>
)

const defaultTheme = {
  card: {
    color: 'black',
    height: 80,
    alignItems: 'flex-end',
  },
  icons: {
    flexDirection: 'row',
  },
}

const ThemedAnimationDemo = Theme('AnimationDemo', defaultTheme)(AnimationDemo)
export default ThemedAnimationDemo
