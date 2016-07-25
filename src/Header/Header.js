import React from 'react'
import { ActionsT } from '../../types/Action'
import { SearchT } from '../../types/Search'
import {
  View,
  Icon,
  Heading,
  // ProfilePhoto,
} from '@workflo/components'
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
  actions: ActionsT,
  search: SearchT,
}

const Header = ({
  profile,
  title,
  subtitle,
  onClickBack,
  actions,
  search,
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
      actions={actions}
      search={search}
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
  actions: ActionsT,
  search: SearchT,
}

const Actions = ({
  profile = {},
  actions = [],
  search = {},
}: ActionsPropsT) => (
  <View
    style={styles.actions}
  >
    {search.show &&
      <Icon
        name='search'
        style={styles.icon}
      />}

    {actions.map((action, index) => (
      <Icon
        key={index}
        name={action.icon}
        onClick={action.onClick}
      />
    ))}
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
