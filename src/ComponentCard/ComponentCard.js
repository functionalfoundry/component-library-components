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
    <View
      style={styles.imageContainer}
    >
      <Image
        src={thumbnail}
        style={styles.image}
      />
    </View>
    <View
      style={styles.footer}
      className='component-footer'
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
    margin: 20,
    cursor: 'pointer',
    ':hover .component-footer': {
      // HACK
      backgroundColor: '#e6e6e6',
    }
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
    height: 230,
    position: 'relative',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 1 65px',
    padding: `${Spacing.tiny}px ${Spacing.small}px`,
    backgroundColor: '#f4f4f4',
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
