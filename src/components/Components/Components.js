import React from 'react'
import Component from '../Component'
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

const Components = ({
  components,
  onClickComponent,
}: Props) => (
  <Grid
    size='base'
    data={components}
    renderer={Component}
    onClickItem={(component) => onClickComponent(component.id)}
    theme={{
      item: {
        marginLeft: Spacing.tiny,
        marginRight: Spacing.tiny,
      }
    }}
  />
)

export default Components
