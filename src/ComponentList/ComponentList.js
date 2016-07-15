import React from 'react'
import Tiles from 'grommet/components/Tiles'
import ComponentCard from '../ComponentCard'

const ComponentList = ({
  components,
}) => (
  <Tiles
    justify='center'
    flush={false}
    size='large'
  >
    {components.map((component, index) => (
      <ComponentCard
        {...component}
        key={index}
      />
    ))}
  </Tiles>
)

export default ComponentList
