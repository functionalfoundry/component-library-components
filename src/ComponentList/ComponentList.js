import React from 'react'
import Tiles from 'grommet/components/Tiles'
import ComponentCard from '../ComponentCard'

const ComponentList = ({
  components,
}) => (
  <Tiles
    justify='around'
    flush={false}
    size='medium'
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
