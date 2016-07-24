import React from 'react'
import {
  Icon,
  View,
  ProfilePhoto,
} from '@workflo/components'
import {
  Spacing,
  Colors,
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
    <View
      style={styles.profileLabel}
    >
      By
    </View>
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
    <View
      style={styles.profileName}
    >
      {`${firstName || ''} ${lastName || ''}`}
    </View>
  </View>
)

const ActionsPropsT = {
  isEditorDirty: Boolean,
}

const ActionsView = ({
  isEditorDirty,
}: ActionsPropsT) => (
  <View
    style={styles.actions}
  >
    {/* <Icon
      name='layout'
      fill={Colors.aluminum3}
      size='s'
    /> */}
    LAYOUT
  </View>
)

const styles = {
  header: {
    backgroundColor: Colors.steel3,
    color: Colors.aluminum6,
    padding: Spacing.small,
    display: 'flex',
    justifyContent: 'space-between',
  },
  profileView: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  profileLabel: {
    color: Colors.aluminum1,
    paddingRight: Spacing.small/2,
    fontSize: 14,
    flex: '0 1',
  },
  profilePhoto: {
    flex: '0 1',
  },
  profileName: {
    paddingLeft: Spacing.small/2,
    color: Colors.primary,
    fontWeight: 200,
    fontSize: 14,
    flex: '0 1',
  },
  actions: {
    color: Colors.aluminum3,
    fontSize: 14,
    justifyContent: 'flex-end',
  },
}

export default LiveHeader
