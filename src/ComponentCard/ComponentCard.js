import React from 'react'
import Title from 'grommet/components/Title'
import Tile from 'grommet/components/Tile'
import Header from 'grommet/components/Header'
import Footer from 'grommet/components/Footer'
import Image from 'grommet/components/Image'
import Label from 'grommet/components/Label'
import Box from 'grommet/components/Box'

const ComponentCard = ({
  name,
  owner,
  thumbnail,
}) => (
  <Tile
    style={{
      backgroundColor: 'white',
      border: '1px solid #efefef'
    }}
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
  </Tile>
)

export default ComponentCard
