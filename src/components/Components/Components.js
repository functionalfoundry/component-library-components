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
    renderer={renderer}
    onClickItem={(component) => onClickComponent(component.id)}
    theme={{
      grid: {
        margin: -4,
      },
      item: {
        marginLeft: 4,
        marginRight: 4,
      }
    }}
  />
)

const renderer = (props) => (
  <View
    theme={{
      view: {
        display: 'flex',
        flex: 1,
      }
    }}
  >
    <Component {...props} />
  </View>
)

export default Components
