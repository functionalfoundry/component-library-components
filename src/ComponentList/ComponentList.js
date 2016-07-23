import React from 'react'
import ComponentCard from '../ComponentCard'
import {
  Grid,
} from '@workflo/components'

type Props = {
  components: Object,
}

const ComponentList = ({
  components,
}: Props) => (
  <Grid
    size='medium'
    data={components}
    renderer={ComponentCard}
  />
)

export default ComponentList
