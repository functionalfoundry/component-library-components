import React from 'react'
import Theme from 'js-theme'
import { ActionsT } from '../types/Action'
import { SearchT } from '../types/Search'
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
import Search from './Search'
import SubHeader from './SubHeader'

type Props = {
  profile: Object,
  onClickBack: Function,
  title: string,
  subtitle: string,
  actions: ActionsT,
  subHeaderActions: ActionsT,
  search: SearchT,
  theme: Object,
}

const Header = ({
  profile,
  title,
  subtitle,
  onClickBack,
  actions,
  subHeaderActions,
  search,
  theme,
}: Props) => (
  <View
    {...theme.header}
  >
    <View
      {...theme.topRow}
    >
      <View
        {...theme.leftBlock}
      >
        <Back
          onClickBack={onClickBack}
          theme={theme}
        />
        <View
          {...theme.separator}
          inline
        />
        <Heading
          size='huge'
          {...theme.title}
        >
          {title}
        </Heading>
      </View>
      <View
        {...theme.rightBlock}
      >
        <Actions
          profile={profile}
          actions={actions}
          search={search}
          theme={theme}
        />
      </View>
    </View>
    <View
      {...theme.bottomRow}
    >
      <Heading
        size={2}
        {...theme.subtitle}
      >
        {subtitle}
      </Heading>
    </View>
    <SubHeader
      actions={subHeaderActions}
    />
  </View>
)

type BackPropsT = {
  onClickBack: Function,
  theme: Object,
}

const Back = ({
  onClickBack,
  theme,
}: BackPropsT) => (
  <View
    {...theme.back}
  >
    {onClickBack &&
      <Icon
        name='back'
        size='large'
        {...theme.backButton}
        onClick={onClickBack}
      />}
    {!onClickBack &&
      <Icon
        name='logo'
        size='large'
        {...theme.backButton}
      />}
  </View>
)

type ActionsPropsT = {
  profile: Object,
  actions: ActionsT,
  search: SearchT,
  theme: Object,
}

const Actions = ({
  profile = {},
  actions = [],
  search = {},
  theme,
}: ActionsPropsT) => (
  <View
    {...theme.actions}
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

const LOGO_WIDTH = 60
const SEPARATOR_MARGIN = Spacing.small
const SEPARATOR_WIDTH = SEPARATOR_MARGIN + 1

const defaultTheme = {
  header: {
    color: Colors.aluminum5,
    display: 'flex',
    flexDirection: 'column',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomRow: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  leftBlock: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  rightBlock: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexShrink: 1
  },
  back: {
    padding: Spacing.tiny,
    flex: `0 1 ${LOGO_WIDTH}px`,
  },
  backButton: {
    cursor: 'pointer',
  },
  separator: {
    flex: '0 1 auto',
    borderLeft: `1px solid ${Colors.grey500}`,
    height: 40, // Make line-size height
    marginRight: SEPARATOR_MARGIN,
  },
  title: {
    ...Fonts.large,
    color: Colors.grey300,
    justifyContent: 'flex-start',
    marginBottom: 0,
  },
  subtitle: {
    ...Fonts.huge,
    color: 'white',
    justifyContent: 'flex-start',
    width: 250,
    marginLeft: LOGO_WIDTH + SEPARATOR_WIDTH,
    marginTop: -12,
  },
  actions: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: Spacing.tiny,
  },
}

export default Theme('Header', defaultTheme)(Header)
