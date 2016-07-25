import React from 'react'
import {
  Icon,
  Heading, // Probably shouldn't be using Heading for this. Text?
  View,
  ProfilePhoto,
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
}: Props) => (
  <View
    style={styles.header}
  >
    <ProfileView
      firstName={firstName}
      lastName={lastName}
      image={image}
    />
    <ActionsView
    />
  </View>
)

const ProfileView = ({
  firstName,
  lastName,
  image,
}: Props) => (
  <View
    style={styles.profileView}
  >
    <Heading
      size={3}
      style={styles.profileLabel}
    >
      By
    </Heading>
    <View
      style={styles.profilePhoto}
    >
      <ProfilePhoto
        size='small'
        image={image}
        firstName={firstName}
        lastName={lastName}
      />
    </View>
    <Heading
      size={3}
      style={styles.profileName}
    >
      {`${firstName || ''} ${lastName || ''}`}
    </Heading>
  </View>
)

const ActionsPropsT = {
  isEditorDirty: Boolean,
}

const ActionsView = ({
  isEditorDirty,
}: ActionsPropsT) => (
  <Heading
    size={3}
    style={styles.actions}
  >
    {/* <Icon
      name='layout'
      fill={Colors.aluminum3}
      size='s'
    /> */}
    LAYOUT
  </Heading>
)

const styles = {
  header: {
    backgroundColor: Colors.steel3,
    color: Colors.aluminum6,
    padding: Spacing.small,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: '0 0 34px',
  },
  profileView: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileLabel: {
    ...Fonts.title,
    ...Fonts.base,
    color: Colors.aluminum1,
    paddingRight: Spacing.small/2,
    flex: '0 1',
  },
  profilePhoto: {
    flex: '0 1',
  },
  profileName: {
    ...Fonts.title,
    ...Fonts.base,
    paddingLeft: Spacing.small/2,
    color: Colors.primary,
    flex: '0 1',
  },
  actions: {
    ...Fonts.title,
    ...Fonts.base,
    color: Colors.aluminum3,
    justifyContent: 'flex-end',
  },
}

export default LiveHeader
