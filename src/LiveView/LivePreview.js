/* @flow */
import React from 'react'
import Tile from 'grommet/components/Tile'
import Image from 'grommet/components/Image'
import { Colors } from '@workflo/styles'

const LivePreview = ({
  thumbnail,
}) => (
  <Tile
    style={styles.card}
  >
    <Image
      src={thumbnail}
    />
  </Tile>
)

const styles = {
  card: {
    backgroundColor: 'white',
    border: `1px solid ${Colors.aluminum6}`,
  },
}

export default LivePreview
