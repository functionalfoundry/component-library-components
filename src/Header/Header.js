import React from 'react'
import {
  View,
  Icon,
  // ProfilePhoto,
} from '@workflo/components'
import Heading from '@workflo/components/lib/Heading' // TODO: Fix
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'

type Props = {
  profile: Object,
  onClickBack: Function,
  title: String,
  subtitle: String,
}

const Header = ({
  profile,
  title,
  subtitle,
  onClickBack,
}: Props) => (
  <View
    style={styles.container}
  >
    <View
      style={styles.leftBlock}
    >
      <Back
        onClickBack={onClickBack}
      />
      <Separator />
      <Titles
        title={title}
        subtitle={subtitle}
      />
    </View>
    <Actions
      profile={profile}
    />
  </View>
)

type BackPropsT = {
  onClickBack: Function,
}

const Back = ({
  onClickBack,
}: BackPropsT) => (
  <View
    style={styles.back}
  >
    {onClickBack && <Icon
      name='back'
      size='m'
      style={styles.backButton}
      onClick={onClickBack}
    />}
    {!onClickBack && <Icon
      name='logo'
      size='m'
      style={styles.backButton}
    />}
  </View>
)

const Separator = () => (
  <View
    style={styles.separator}
  />
)

type TitlesPropsT = {
  title: string,
  subtitle: string,
}

const Titles = ({
  title,
  subtitle,
}: TitlesPropsT) => (
  <View
    style={styles.titles}
  >
    <Heading
      size={1}
      style={styles.title}
    >
      {title}
    </Heading>
    <Heading
      size={2}
      style={styles.subtitle}
    >
      {subtitle}
    </Heading>
  </View>
)

type ActionsPropsT = {
  profile: Object,
}

const Actions = ({
  profile,
}: ActionsPropsT) => (
  <View
    style={styles.actions}
  >
    <Icon
      name='search'
      style={styles.icon}
    />
    <Icon
      name='widget-feed'
    />
    {/* <ProfilePhoto
      size='medium'
      image={profile.image}
      firstName={profile.firstName}
      lastName={profile.lastName}
    />*/}
  </View>
)

const styles = {
  container: {
    color: Colors.aluminum5,
    display: 'flex',
    alignContent: 'space-between',
    alignItems: 'baseline'
  },
  leftBlock: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,
  },
  back: {
    padding: Spacing.tiny,
    flex: '0 1',
  },
  backButton: {
    cursor: 'pointer',
  },
  separator: {
    flex: '0 1',
    borderLeft: `1px solid ${Colors.aluminum5}`,
    marginTop: 12,
    marginLeft: Spacing.base,
    height: Spacing.large, // Make line-size height
  },
  titles: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginLeft: Spacing.base + Spacing.tiny,
    paddingTop: 18,
  },
  title: {
    ...Fonts.title,
    ...Fonts.large,
    color: Colors.aluminum3,
    justifyContent: 'flex-start',
    marginBottom: 0,
  },
  subtitle: {
    ...Fonts.title,
    ...Fonts.huge,
    color: Colors.aluminum6,
    justifyContent: 'flex-start',
    width: 250,
    marginTop: 0,
  },
  actions: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: Spacing.tiny,
  },
  icon: {
    marginRight: Spacing.small,
  },
}

export default Header
