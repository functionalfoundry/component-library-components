import React from 'react'
import Theme from 'js-theme'
import {
  Image,
  View,
} from '@workflo/components'
import {
  Colors,
  Spacing,
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

// type ComponentT = {
//   id: string,
//   implementation: any,
//   name: string,
//   // owner: OwnerT,
//   // properties: Array<PropertyT>,
// }

type Props = {
  component: any,
  propMap: any,
  theme: Object,
  backgroundColor: string,
  alignment: {
    horizontal: 'Left' | 'Center' | 'Right',
    vertical: 'Top' | 'Center' | 'Bottom',
  },
}

const defaultProps = {
  componentState: {propKeyValues: {}},
  backgroundColor: 'white',
  alignment: {
    horizontal: 'Center',
    vertical: 'Center',
  },
}

const LivePreview = ({
  Component,
  propMap,
  theme,
}: Props) => (
  <View
    {...theme.livePreview}
  >
    <View
      {...theme.previewContainer}
    >
      {Component &&
       <Component
         {...propMap}
       />}
    </View>
  </View>
)

LivePreview.defaultProps = defaultProps

const defaultTheme = ({
  backgroundColor,
  alignment,
}) => ({
  livePreview: {
    backgroundColor,
    padding: Spacing.small,
    // borderRight: `1px solid ${Colors.grey200}`,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    // flex: '0 1 auto',
    // justifyContent: 'center',
    // alignItems: 'center',

    position: 'relative',
  },
  previewContainer: {
    ...getHorizontalAlignment(alignment.horizontal),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  // image: {
  //   width: '100%',
  //   maxHeight: '100%',
  //   height: 'auto',
  //   objectFit: 'contain',
  // },
})

const getHorizontalAlignment = (horizontalAlignment) => {
  switch (horizontalAlignment) {
    case 'Left':
      return { justifyContent: 'flex-start' }
    case 'Right':
      return { justifyContent: 'flex-end' }
    case 'Center':
      return { justifyContent: 'center' }
  }
}

const ThemedLivePreview = Theme('LivePreview', defaultTheme)(LivePreview)
export default ThemedLivePreview
