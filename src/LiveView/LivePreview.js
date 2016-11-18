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
  componentState: any,
}
const LivePreview = ({
  component,
  componentState,
}: Props) => (
  <View
    style={styles.card}
  >
    {component.implementation &&
     <component.implementation
       {...componentState.propKeyValues}
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
