import React from 'react'
import Theme from 'js-theme'
import {
  Button,
  Icon,
  Heading, // Probably shouldn't be using Heading for this. Text?
  View,
} from '@workflo/components'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'

type Props = {
  firstName: string,
  lastName: string,
  image: string,
}

const LiveHeader = ({
  firstName,
  lastName,
  image,
  theme,
}: Props) => (
  <View
    {...theme.header}
  >
    <ProfileView
      firstName={firstName}
      lastName={lastName}
      image={image}
      theme={theme}
    />
    <Actions
      theme={theme}
    />
    <PrimaryAction />
  </View>
)

const ProfileView = ({
  firstName,
  lastName,
  image,
  theme,
}: Props) => (
  <View
    {...theme.profileView}
  >

  </View>
)

const ActionsPropsT = {
  isEditorDirty: Boolean,
}

const Actions = ({
  isEditorDirty,
  theme,
}: ActionsPropsT) => (
  <Heading
    {...theme.actions}
    size={3}
  >
    <Icon
      name='card-like'
      fill={Colors.grey100}
      size='base'
    />
  </Heading>
)

const PrimaryAction = () => (
  <div style={{ display: 'flex', alignSelf: 'stretch', backgroundColor: 'red' }}>
    <Button
      label='Save'
      theme={{
        button: {
          borderRadius: 0,
          height: 'auto',
          ...Fonts.small,
          letterSpacing: 2,
        },
      }}
    />
  </div>
)

const defaultTheme = {
  header: {
    backgroundColor: '#1C1C1C', // grey850
    color: Colors.grey200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: '0 0 60px',
  },
  profileView: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileLabel: {
    ...Fonts.title,
    ...Fonts.base,
    color: Colors.grey300,
    paddingRight: Spacing.small/2,
    flex: '0 1',
  },
  profilePhoto: {
    flex: '0 1',
    width: 'auto',
    minWidth: 'auto',
  },
  profileName: {
    ...Fonts.title,
    ...Fonts.base,
    paddingLeft: Spacing.small/2,
    color: Colors.primary,
    flex: '1 1',
  },
  actions: {
    ...Fonts.title,
    ...Fonts.base,
    color: Colors.grey300,
    display: 'flex',
    padding: Spacing.small,
    justifyContent: 'flex-end',
  },
}

export default Theme('LiveHeader', defaultTheme)(LiveHeader)
