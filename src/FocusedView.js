import React from 'react'
import Theme from 'js-theme'
import Header from './Header'

import {
  PreviewContainer,
  Preview,
  View,
} from '@workflo/components'

import {
  Spacing,
} from '@workflo/styles'

const FocusedView = ({
  profile,
  theme,
  children,
}) => (
  <View
    {...theme.focusedView}
  >
    <Header
      profile={profile}
      title='Drawer'
      subtitle='Collapsed'
      onClickBack={() => {}}
      search={{
        show: true,
      }}
      subHeaderActions={[
        {
          icon: 'add',
        },
        {
          icon: 'card-like',
        },
        {
          icon: 'layout',
        },
      ]}
    />
    <PreviewContainer
    >
      <Preview>
        {children}
      </Preview>
    </PreviewContainer>
  </View>
)

const defaultTheme = () => ({
  focusedView: {
    marginTop: Spacing.small,
  },
})

export default Theme('FocusedView', defaultTheme)(FocusedView)
