import React from 'react'
import {
  Image,
  View,
} from '@workflo/components'
import {
  Colors
} from '@workflo/styles'

// type OwnerT = {
//   firstName: string,
//   lastName: string,
//   profilePhoto: string,
// }

// type PropertyT = {
//   name: string,
//   type: string,
//   default: string,
//   description: string,
// }

type ComponentT = {
  id: string,
  implementation: any,
  name: string,
  // owner: OwnerT,
  // properties: Array<PropertyT>,
}

type Props = {
  component: ComponentT,
  propMap: any,
}
const LivePreview = ({
  component,
  propMap,
}: Props) => (
  <View
    style={styles.card}
  >
    {component.implementation &&
     <component.implementation
       {...propMap}
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
    flexDirection: 'row',
    flex: '0 1 auto',
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
