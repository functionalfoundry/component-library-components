import React from 'react'
import Theme from 'js-theme'
import { ActionT } from '../../types/Action'
import { SearchT } from '../../types/Search'
import {
  View,
  Icon,
  Heading,
  EditableText,
  Search,
  // ProfilePhoto,
} from '@workflo/components'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'
import SubHeader from '../SubHeader'

type EditableTextPropsT = {
  value: string,
  isEditing: boolean,
  disabled: boolean,
  onChange: Function,
  onStartEdit: Function,
  onStopEdit: Function,
}

type Props = {
  profile: Object,
  onClickBack: Function,
  title: EditableTextPropsT,
  subtitle: EditableTextPropsT,
  primaryAction: ActionT,
  secondaryActions: Array<ActionT>,
  quickActions: Array<ActionT>,
  search: SearchT,
  theme: Object,
}

const Header = ({
  profile,
  title,
  subtitle,
  onClickBack,
  primaryAction,
  secondaryActions,
  quickActions,
  search,
  theme,
}: Props) => (
  <View
    {...theme.header}
  >
    <View
      {...theme.titleRow}
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
        <View
          {...theme.title}
        >
          <EditableText
            {...title}
            size='Huge'
          />
        </View>
      </View>
      <View
        {...theme.rightBlock}
      >
        <Actions
          profile={profile}
          search={search}
          theme={theme}
        />
      </View>
    </View>
    <View
      {...theme.row}
    >
      <View
        {...theme.subtitle}
      >
        <EditableText
          {...subtitle}
          size='Large'
        />
      </View>
    </View>
    <View
      {...theme.row}
      {...theme.subHeaderContainer}
    >
      <View
        {...theme.rightBlock}
      >
        <SubHeader
          primaryAction={primaryAction}
          secondaryActions={secondaryActions}
          quickActions={quickActions}
        />
      </View>
    </View>
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
    {actions}
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
    display: 'flex',
    flex: '0 1 auto',
    flexDirection: 'column',
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.micro,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.grey800,
    color: Colors.grey300,
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
    fontSize: 26, // TODO: FIXX
    color: Colors.grey300,
    justifyContent: 'flex-start',
    marginBottom: 0,
  },
  subtitle: {
    ...Fonts.huge,
    color: 'white',
    justifyContent: 'flex-start',
    width: 500,
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
