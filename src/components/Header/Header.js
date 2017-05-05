import React from 'react'
import Theme from 'js-theme'
import { ActionT, ActionsT } from '../../types/Action'
import { View, Icon, HoverIcon, EditableText } from '@workflo/components'
import { Colors, Fonts, Spacing } from '@workflo/styles'
import SubHeader from '../SubHeader'
import BulkActionBar from '../BulkActionBar'

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
  search?: React.Element,
  bulkActions?: {
    quickActions: Array<React.Element>,
    numberSelected: Number,
    onClearSelection: Function,
  },
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
  bulkActions,
  search,
  theme,
}: Props) => (
  <View {...theme.header}>
    <View {...theme.titleRow}>
      <View {...theme.leftBlock}>
        <Back onClickBack={onClickBack} theme={theme} />
        <View {...theme.separator} inline />
        <View {...theme.title}>
          <EditableText {...title} size="Huge" />
        </View>
      </View>
      <View {...theme.rightBlock}>
        <Actions profile={profile} search={search} theme={theme} />
      </View>
    </View>
    <View {...theme.row}>
      <View {...theme.subtitle}>
        <EditableText {...subtitle} size="Large" />
      </View>
    </View>
    <View {...theme.row} {...theme.subHeaderContainer}>
      {bulkActions &&
        <BulkActionBar
          numberSelected={bulkActions.numberSelected}
          onClearSelection={bulkActions.onClearSelection}
        >
          {bulkActions.quickActions}
        </BulkActionBar>}
      {!bulkActions &&
        <View {...theme.rightBlock}>
          <SubHeader
            primaryAction={primaryAction}
            secondaryActions={secondaryActions}
            quickActions={quickActions}
          />
        </View>}
    </View>
  </View>
)

type BackPropsT = {
  onClickBack: Function,
  theme: Object,
}

const Back = ({ onClickBack, theme }: BackPropsT) => (
  <View {...theme.back}>
    {onClickBack &&
      <HoverIcon
        name="back"
        hoverName="back-hover"
        size="large"
        {...theme.backButton}
        onClick={onClickBack}
      />}
    {!onClickBack && <Icon name="logo" size="large" {...theme.backButton} />}
  </View>
)

type ActionsPropsT = {
  profile: Object,
  actions: ActionsT,
  search?: React.Element,
  theme: Object,
}

const Actions = ({ profile = {}, actions = [], search, theme }: ActionsPropsT) => (
  <View {...theme.actions}>
    {search}
    {actions}
    {}
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
    backgroundColor: Colors.grey900,
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
    justifyContent: 'flex-end',
    backgroundColor: Colors.grey800,
    color: Colors.grey300,
    height: 56,
  },
  leftBlock: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    flex: '3 1 auto',
  },
  rightBlock: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: '0 auto',
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
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: Colors.grey500,
    height: 40, // Make line-size height
    marginRight: SEPARATOR_MARGIN,
  },
  title: {
    ...Fonts.large,
    flex: '0 auto',
    fontSize: 26, // TODO: FIXX
    color: Colors.grey300,
    justifyContent: 'flex-start',
    marginBottom: 0,
    marginTop: Spacing.tiny,
  },
  subtitle: {
    ...Fonts.large,
    flex: '0 auto',
    color: 'white',
    marginLeft: LOGO_WIDTH + SEPARATOR_WIDTH,
    height: 45,
  },
  actions: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: Spacing.tiny,
  },
}

export default Theme('Header', defaultTheme)(Header)
