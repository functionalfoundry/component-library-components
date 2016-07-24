import React from 'react'
import {
  Card,
  Heading,
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
      height={230}
    />
    <View
      style={styles.footer}
    >
      <Heading
        size={2}
        style={styles.name}
      >
        {name}
      </Heading>
      <Heading
        size={3}
        style={styles.owner}
      >
        {owner}
      </Heading>
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
    flex: '0 1 60px',
    padding: `${Spacing.tiny}px ${Spacing.small}px`,
  },
  name: {
    ...Fonts.large,
    ...Fonts.title,
    marginBottom: Spacing.tiny/2,
  },
  owner: {
    ...Fonts.base,
    ...Fonts.title,
  },
}

export default ComponentCard
