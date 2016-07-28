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
import Search from '../Search'

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
      style={styles.topRow}
    >
      <View
        style={styles.leftBlock}
      >
        <Back
          onClickBack={onClickBack}
        />
        <Separator />
        <Heading
          size={1}
          style={styles.title}
        >
          {title}
        </Heading>
      </View>
      <View
        style={styles.rightBlock}
      >
        <Actions
          profile={profile}
          actions={actions}
          search={search}
        />
      </View>
    </View>
    <View
      style={styles.bottomRow}
    >
      <Heading
        size={2}
        style={styles.subtitle}
      >
        {subtitle}
      </Heading>
    </View>

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
    <Search
      {...search}
    />

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
    flexDirection: 'column',
  },
  topRow: {
    display: 'flex',
    flex: '1',
    justifyContent: 'space-between',

  },
  bottomRow: {
    display: 'flex',
    flex: '1',
    alignContent: 'space-between',
  },
  leftBlock: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: '1',
  },
  rightBlock: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: '1',
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
    borderLeft: `1px solid ${Colors.steel6}`,
    marginLeft: Spacing.base,
    marginRight: Spacing.base,
    height: 40, // Make line-size height
  },
  title: {
    ...Fonts.large,
    color: Colors.aluminum3,
    justifyContent: 'flex-start',
    marginBottom: 0,
  },
  subtitle: {
    ...Fonts.huge,
    color: Colors.aluminum6,
    justifyContent: 'flex-start',
    width: 250,
    marginTop: -7,
    marginLeft: 116,
  },
  actions: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: Spacing.tiny,
  },
}

export default Header
