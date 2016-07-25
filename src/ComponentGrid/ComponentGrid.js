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
  <View
    style={styles.container}
  >
    <Grid
      size='base'
      data={components}
      renderer={ComponentCard}
      onClickItem={(component) => onClickComponent(component.id)}
    />
  </View>
)

const styles = {
  container: {
    marginRight: Spacing.base,
    marginLeft: Spacing.base,
  },
}

export default ComponentGrid
