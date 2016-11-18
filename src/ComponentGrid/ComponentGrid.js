import React from 'react'
import ComponentCard from '../ComponentCard'
import {
  Grid,
  View,
} from '@workflo/components'
import {
  Spacing,
} from '@workflo/styles'

type Props = {
  components: Object,
  onClickComponent: Function,
}

const ComponentGrid = ({
  components,
  onClickComponent,
}: Props) => (
  <Grid
    size='base'
    data={components}
    renderer={ComponentCard}
    onClickItem={(component) => onClickComponent(component.id)}
    theme={{
      item: {
        marginLeft: Spacing.tiny,
        marginRight: Spacing.tiny,
      }
    }}
  />
)

export default ComponentGrid
