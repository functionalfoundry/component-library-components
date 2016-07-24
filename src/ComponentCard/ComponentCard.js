import React from 'react'
import {
  Card,
  Image,
  View,
} from '@workflo/components'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'

type Props = {
  name: String,
  owner: String,
  thumbnail: String,
}

const ComponentCard = ({
  name,
  owner,
  thumbnail,
}: Props) => (
  <Card
    size='medium'
    flush
    style={styles.card}
  >
  <Image
    src={thumbnail}
    style={styles.image}
    height={200}
  />
    <View
      style={styles.footer}
    >
      <View
        style={styles.name}
      >
        {name}
      </View>
      <View
        style={styles.owner}
      >
        {owner}
      </View>
    </View>
  </Card>
)

const styles = {
  card: {
    color: Colors.steel2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  thumbnail: {
    flex: 1,
    display: 'flex',
  },
  image: {
    flex: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 72px'
  },
  name: {
    ...Fonts.large,
  },
  owner: {
    ...Fonts.base,
  },
}

export default ComponentCard
