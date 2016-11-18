import React from 'react'
import Theme from 'js-theme'
import {
  Icon,
  Heading, // Probably shouldn't be using Heading for this. Text?
  View,
  Avatar,
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
    <Heading
      {...theme.profileLabel}
      size={3}
    >
      By
    </Heading>
    <View
      {...theme.profilePhoto}
    >
      <Avatar
        size='small'
        image={image}
        firstName={firstName}
        lastName={lastName}
      />
    </View>
    <Heading
      {...theme.profileName}
      size={3}
    >
      {`${firstName || ''} ${lastName || ''}`}
    </Heading>
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
    {/* <Icon
      name='layout'
      fill={Colors.aluminum3}
      size='s'
    /> */}
    LAYOUT
  </Heading>
)

const defaultTheme = {
  header: {
    backgroundColor: Colors.grey800,
    color: Colors.grey200,
    padding: Spacing.small,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: '0 0 34px',
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
    justifyContent: 'flex-end',
  },
}

export default Theme('LiveHeader', defaultTheme)(LiveHeader)
