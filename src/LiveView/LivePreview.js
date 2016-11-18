import React from 'react'
import {
  Image,
  View,
} from '@workflo/components'
import {
  Colors
} from '@workflo/styles'

type Props = {
  component: any,
  properties: Object,
}
const LivePreview = ({
  component,
  properties,
}: Props) => (
  <View
    style={styles.card}
  >
    {component.implementation &&
     <component.implementation
       {...properties}
     />}
  </View>
)

LivePreview.defaultProps = {
  componentState: {propKeyValues: {}}
}

const styles = {
  card: {
    backgroundColor: 'white',
    borderRight: `1px solid ${Colors.grey200}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    maxHeight: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
}

export default LivePreview
