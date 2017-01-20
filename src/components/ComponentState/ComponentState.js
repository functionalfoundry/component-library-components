/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Card,
  Checkbox,
  Icon,
  View,
} from '@workflo/components'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'
import Heading from '@workflo/components/lib/Heading'
import LivePreview from '../LivePreview'

type HorizontalAlignmentT = 'Left' | 'Center' | 'Right'
type VerticalAlignmentT = 'Top' | 'Center' | 'Right'
type SizeT = 'Tiny' | 'Small' | 'Base' | 'Large'

type ComponentStateT = {
  name: string,
  propMap: Object,
}

type HarnessT = {
  componentState: ComponentStateT,
  alignment: {
    horizontal: HorizontalAlignmentT,
    vertical: VerticalAlignmentT,
  },
  size: {
    horizontal: SizeT,
    vertical: SizeT,
  },
  theme: {
    id: string,
    name: string,
    patterns: {
      colors: {
        background: string,
      },
    },
  },
}

type ComponentT = {
  implementation: any
}

type HarnessCardT = {
  harness: HarnessT,
  actions: Array<React.Element>,
  isSelected: boolean,
  forceShowActions: boolean
}

type PropsT = {
  component: ComponentT,
  harnessCard: HarnessCardT,
  onClickTitle: Function,
  onChangeIsSelected: Function,
  theme: Object,
}

const defaultComponent = () => <div />

const defaultProps = {
  component: {
    implementation: defaultComponent,
  },
  harnessCard: {
    harness: {
      componentState: {
        name: '',
        propMap: {},
      },
      alignment: {
        horizontal: 'Center',
        vertical: 'Center',
      },
      theme: {
        patterns: {
          colors: {},
        },
      },
    },
    actions: [],
    isSelected: false,
    forceShowActions: false,
  },
  onClickTitle: () => {},
  onChangeIsSelected: () => {},
}

class ComponentState extends React.Component {
  props: PropsT

  constructor (props) {
    super(props)
    this.state = {
      isHovering: false,
      forceShowActions: false,
    }
  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
  }

  render () {
    const {
      component,
      harnessCard,
      onChangeIsSelected,
      onClickTitle,
      theme,
    } = this.props

    return (
      <Card
        {...theme.harnessCard}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        flush
      >
        <View
          {...theme.section}
        >
          <TopBar
            harnessCard={harnessCard}
            onClickTitle={onClickTitle}
            onChangeIsSelected={onChangeIsSelected}
            actions={harnessCard.actions}
            patterns={harnessCard.harness.theme.patterns}
            isHovering={this.state.isHovering}
            isSelected={harnessCard.isSelected}
            forceShowActions={this.state.forceShowActions}
            isShowingCheckbox={shouldShowCheckbox(this.state.isHovering, harnessCard.isSelected)}
            onOpenPopup={() => this.setState({ forceShowActions: true })}
            onClosePopup={() => this.setState({ forceShowActions: false })}
          />
          <View
            {...theme.preview}
          >
            <LivePreview
              Component={component.implementation}
              propMap={harnessCard.harness.componentState.propMap}
              backgroundColor={harnessCard.harness.theme.patterns.colors.background}
              alignment={harnessCard.harness.alignment}
            />
          </View>
        </View>
      </Card>
    )
  }
}

const Actions = ({
  harnessCard,
  onClickTitle,
  actions,
  isHovering,
  isSelected,
  isShowingCheckbox,
  onChangeIsSelected,
  forceShowActions,
  theme,
  onOpenPopup,
  onClosePopup,
}) => (
  <div style={{ display: 'flex' }}>
    <View
      {...theme.titleContainer}
    >
      {isShowingCheckbox &&
        <Checkbox
          checked={harnessCard.isSelected}
          onChange={() => onChangeIsSelected(!harnessCard.isSelected)}
        />}
      <Heading
        {...theme.title}
        size={'base'}
        onPress={() => onClickTitle()}
      >
        {harnessCard.harness.componentState.name}
      </Heading>
    </View>
    <View
      {...theme.actions}
    >
      {((isHovering && !isSelected) || forceShowActions) &&
        transformActions(actions, onOpenPopup, onClosePopup)}
      {(!isHovering && !isSelected && !forceShowActions) &&
        <Icon
          name='more-horizontal'
          size='large'
          fill={Colors.grey700}
          stroke={Colors.grey700}
        />}
    </View>
  </div>
)

const transformActions = (actions, onOpenPopup, onClosePopup) => {
  return actions.map((action) => React.cloneElement(action, {
    ...action.props,
    onOpen: onOpenPopup,
    onClose: onClosePopup,
  }))
}

const shouldShowCheckbox = (isHovering, isSelected) =>
  isHovering || isSelected

const defaultActionsTheme = ({
  patterns,
  isShowingCheckbox,
}) => ({
  actions: {
    backgroundColor: patterns.colors.background,
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: Spacing.small - 4,
    right: 0,
    paddingRight: Spacing.small,
    zIndex: 100,
    color: Colors.grey800,
  },
  titleContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    top: Spacing.small - 2,
    left: Spacing.small,
    zIndex: 10,
  },
  title: {
    ...Fonts.title,
    ...Fonts.large,
    marginLeft: isShowingCheckbox ? Spacing.tiny + Spacing.micro : 0,
    fontSize: 24, // BIG HACK. HEADING BASE?
    color: Colors.grey800,
    display: 'inline',
    cursor: 'pointer',
  },
})

const TopBar = Theme('ComponentStateActions', defaultActionsTheme)(Actions)

const defaultTheme = ({
  harnessCard,
}) => ({
  harnessCard: {
    ...getScaledStyle(harnessCard.isSelected),
    transition: 'all .4s ease',
    position: 'relative',
    overflow: 'hidden',
    width: 'inherit', // FIX
    height: 320, // FIX
    flex: '1',
  },
  section: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    zIndex: -0,
    // height: 200,
    // maxWidth: '100%',
    // display: 'flex',
    // flexDirection: 'row',
    // flex: '0 1 auto;',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
})

const getScaledStyle = (isSelected) => {
  if (isSelected) {
    return {
      transform: 'scale(.93)',
    }
  }
}

ComponentState.defaultProps = defaultProps

const ThemedComponentState = Theme('ComponentState', defaultTheme)(ComponentState)
export default ThemedComponentState
