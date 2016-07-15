import React from 'react'
import Title from 'grommet/components/Title'
import Tile from 'grommet/components/Tile'
import Header from 'grommet/components/Header'
import Button from 'grommet/components/Button'
import Image from 'grommet/components/Image'
import Label from 'grommet/components/Label'
import Box from 'grommet/components/Box'

const ComponentState = ({
  name,
  thumbnail,
}) => (
  <div
    style={{
      ...style.section,
      height: 300,
    }}
  >
    <div
      style={{
        ...style.column,
      }}
    >
      <h4>{name}</h4>
    </div>
    <div
      style={{
        ...style.column,
      }}
    >
      <Image src={thumbnail} />
    </div>
    <div
      style={{
        ...style.column,
      }}
    >
      <Actions />
    </div>
  </div>
)

const Actions = ({

}) => (
  <div>
    <Button
      label='Play'
    />
  </div>
)

export default ComponentState

const style = {
  section: {
    display: 'flex',
  },
  column: {
    margin: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
}