import React from 'react'
import Footer from 'grommet/components/Footer'
import Image from 'grommet/components/Image'
import Box from 'grommet/components/Box'
import {
  Card,
} from '@workflo/components'

const ComponentCard = ({
  name,
  owner,
  thumbnail,
}) => (
  <Card
    size='medium'
    flush
  >
    <Image src={thumbnail} />
    <Footer
      size='small'
      pad={{horizontal: 'small'}}
      align='start'
      alignContent='start'
    >
      <Box
        pad={{horizontal: 'small'}}
        justify='start'
      >
        <span style={{ fontSize: 20, marginTop: 8 }}>{name}</span>
        <span style={{ marginTop: 8, marginBottom: 8 }}>{owner}</span>
      </Box>
    </Footer>
  </Card>
)

export default ComponentCard
