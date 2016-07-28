import React from 'react'
import {
  Card,
  Heading,
  Image,
  View,
  ProfilePhoto,
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
  profilePhoto: String,
}

const ComponentCard = ({
  name,
  owner,
  profilePhoto,
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
      <ProfilePhoto
        image={profilePhoto}
        firstName={'Yaniv'}
        lastName={'Tal'}
        size='small'
        showName
      />
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
      backgroundColor: '#f4f4f4',
      borderRadius: '0px 0px 3px 3px', // TODO: Sync with Card
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
    flex: '0 1 50px',
    padding: `${Spacing.tiny}px ${Spacing.small}px ${Spacing.tiny + 2}px`,
  },
  name: {
    ...Fonts.base,
    marginBottom: Spacing.tiny/2 - 2,
  },
  owner: {
    ...Fonts.base,
    color: Colors.steel3,
  },
}

export default ComponentCard
