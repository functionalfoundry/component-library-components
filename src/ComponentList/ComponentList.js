import React from 'react'
import ComponentCard from '../ComponentCard'
import {
  Grid,
  View,
} from '@workflo/components'
import {
  Colors,
  Spacing,
} from '@workflo/styles'

type Props = {
  components: Object,
}

const ComponentList = ({
  components,
}: Props) => (
  <View
    style={styles.container}
  >
    <Grid
      size='base'
      data={components}
      renderer={ComponentCard}
    />
  </View>
)

const styles = {
  container: {
    marginRight: Spacing.base,
    marginLeft: Spacing.base,
  },
}

export default ComponentList
