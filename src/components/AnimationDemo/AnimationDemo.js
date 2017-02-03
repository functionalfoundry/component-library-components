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

type Props = {
}

const AnimationDemo = ({
  ...props,
}: Props) => (
  <Card
    style={styles.card}
    size='medium'
  >
    <Icons />
  </Card>
)

const Icons = () => (
  <View style={styles.icons}>
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

const styles = {
  card: {
    color: 'black',
    height: 80,
    alignItems: 'flex-end',
  },
  icons: {
    flexDirection: 'row',
  },
}

export default AnimationDemo
