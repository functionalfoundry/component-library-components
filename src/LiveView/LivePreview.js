import React from 'react'
import {
  Image,
  View,
} from '@workflo/components'
import {
  Colors
} from '@workflo/styles'

type Props = {
  thumbnail: string,
}
const LivePreview = ({
  thumbnail,
}: Props) => (
  <View
    style={styles.card}
  >
    <Image
      src={thumbnail}
      style={styles.image}
    />
  </View>
)

const styles = {
  card: {
    backgroundColor: 'white',
    border: `1px solid ${Colors.aluminum6}`,
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
  },
}

export default LivePreview
