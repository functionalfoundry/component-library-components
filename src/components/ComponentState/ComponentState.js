/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'
import { Checkbox, Icon, View } from '@workflo/components'
import { Colors, Fonts, Spacing } from '@workflo/styles'
import Heading from '@workflo/components/lib/Heading'
import { Power2, TweenMax } from 'gsap'
import LivePreview from '../LivePreview'
import StaggerChildren from '../StaggerChildren'
import RotateFade from '../RotateFade'

/**
 * Prop types
 */

type HorizontalAlignmentT = 'Left' | 'Center' | 'Right'
type VerticalAlignmentT = 'Top' | 'Center' | 'Right'
type SizeT = 'Tiny' | 'Small' | 'Base' | 'Large'

type ComponentStateT = {
  name: string,
}

type HarnessT = {
  id: string,
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

type BundlesT = Object

type PropsT = {
  harnessCard: {
    element: ?React.Element<*>,
    tree: Object,
    bundles: BundlesT,
    React: any,
    ReactDOM: any,
    harness: HarnessT,
    actions: Array<React.Element<*>>,
    isSelected: boolean,
    forceShowActions: boolean,
    extraProps?: any,
  },
  onClickTitle: Function,
  onChangeIsSelected: Function,
  onMouseEnter: Function,
  onMouseLeave: Function,
  isHovering: ?boolean,
  theme: Object,
}

/**
 * Default props
 */

const defaultProps = {
  harnessCard: {
    tree: null,
    bundles: {},
    React,
    ReactDOM,
    harness: {
      componentState: {
        name: '',
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
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  isHovering: false,
}

/**
 * ComponentStateContainer implementation
 */

type StateContainerStateT = {
  isHovering?: boolean,
}

export default class ComponentStateContainer extends React.Component {
  props: PropsT
  state: StateContainerStateT

  constructor(props: PropsT) {
    super(props)
    this.state = {
      isHovering: false,
    }
  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
  }

  render() {
    return (
      <ThemedComponentState
        {...this.props}
        isHovering={this.state.isHovering}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    )
  }
}

/**
 * ComponentState implementation
 */

class ComponentState extends React.Component {
  props: PropsT
  numOpenPopups: number
  iconRefs: Array<any>
  harnessCard: ?React.Element<any>

  static defaultProps = defaultProps

  constructor(props: PropsT) {
    super(props)
    // We're using a number instead of a boolean to track
    // whether to force show quick actions while a quickaction popover is open
    // since sliding to an adjacent icon will open the next popover before
    // the previous popover is closed. Therefore we add one on open and decrement
    // on close and compare against 0
    // We're not using state for numOpenPopups because we need it to update
    // faster than a render cycle
    this.numOpenPopups = 0
    this.iconRefs = []
  }

  storeRef = (name, c) => (this[name] = c)

  handleOpenPopup = () => {
    this.numOpenPopups = this.numOpenPopups + 1
    this.forceUpdate()
  }

  handleClosePopup = () => {
    this.numOpenPopups = this.numOpenPopups - 1
    this.forceUpdate()
  }

  handleMouseEnter = () => {
    this.props.onMouseEnter()
    // console.log('show the icons :)')
  }

  handleMouseLeave = () => {
    if (!this.getForceShowActions()) {
      // console.log('hide these icons: ', this.iconRefs)
    }
    this.props.onMouseLeave()
  }

  componentDidMount() {
    this.animateSelectionChange(this.props.harnessCard.isSelected)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.harnessCard.isSelected !== nextProps.harnessCard.isSelected) {
      this.animateSelectionChange(nextProps.harnessCard.isSelected)
    }
  }

  handleChangeIsSelected = isSelected => {
    this.animateSelectionChange(isSelected, () => {
      setTimeout(() => {
        this.props.onChangeIsSelected(isSelected)
      }, 0)
    })
  }

  animateSelectionChange = (isSelected, onComplete?: Function) => {
    const { clientWidth, clientHeight } = this.harnessCard

    let to

    if (isSelected) {
      const margin = 15
      const desiredWidth = clientWidth - 2 * margin
      const desiredHeight = clientHeight - 2 * margin
      const xFactor = desiredWidth / clientWidth
      const yFactor = desiredHeight / clientHeight
      to = {
        transform: `scaleX(${xFactor}) scaleY(${yFactor})`,
        ease: Power2.easeIn,
        onComplete,
      }
    } else {
      to = {
        transform: 'scale(1)',
        ease: Power2.easeIn,
        onComplete,
      }
    }
    TweenMax.to(this.harnessCard, 0.13, to)
  }

  getForceShowActions = () => this.numOpenPopups > 0

  storeHarnessCard = c => (this.harnessCard = c)

  render() {
    const { harnessCard, onClickTitle, isHovering, theme } = this.props

    const forceShowActions = this.getForceShowActions()

    return (
      <div
        {...theme.harnessCard}
        key={harnessCard.harness.id}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={this.storeHarnessCard}
        {...harnessCard.extraProps}
      >
        <View {...theme.section}>
          <div style={{ display: 'flex' }}>
            <View {...theme.titleContainer}>
              {shouldShowCheckbox(isHovering, harnessCard.isSelected) &&
                <Checkbox
                  checked={harnessCard.isSelected}
                  onChange={() => this.handleChangeIsSelected(!harnessCard.isSelected)}
                  theme={{ checkbox: { marginTop: 2 } }}
                />}
              <Heading {...theme.title} size={'Base'} onPress={() => onClickTitle()}>
                {harnessCard.harness.componentState.name}
              </Heading>
            </View>
          </div>
          <View {...theme.preview}>
            <LivePreview
              name={harnessCard.harness.id}
              tree={harnessCard.tree}
              bundles={harnessCard.bundles}
              React={harnessCard.React}
              ReactDOM={harnessCard.ReactDOM}
              backgroundColor={harnessCard.harness.theme.patterns.colors.background}
              alignment={harnessCard.harness.alignment}
            />
          </View>
        </View>
      </div>
    )
  }
}

const shouldShowCheckbox = (isHovering, isSelected) => isHovering || isSelected

const defaultTheme = ({ harnessCard, isHovering }) => ({
  harnessCard: {
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
    width: 'inherit', // FIX
    height: 320, // FIX
    flex: '1',
    background: harnessCard.harness.theme.patterns.colors.background,
  },
  section: {
    position: 'relative',
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
  },
  actions: {
    backgroundColor: harnessCard.harness.theme.patterns.colors.background,
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
    ...Fonts.large,
    fontSize: 24, // BIG HACK. HEADING BASE?
    transform: shouldShowCheckbox(isHovering, harnessCard.isSelected)
      ? `translate3d(${Spacing.tiny + Spacing.micro}px, 0, 0)`
      : `translate3d(0, 0, 0)`,
    WebkitTransform: shouldShowCheckbox(isHovering, harnessCard.isSelected)
      ? `translate3d(${Spacing.tiny + Spacing.micro}px, 0, 0)`
      : `translate3d(0, 0, 0)`,
    color: Colors.grey800,
    display: 'inline',
    transition: '0.3s transform cubic-bezier(0.19, 1, 0.22, 1)',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline',
    },
  },
})

const ThemedComponentState = Theme('ComponentState', defaultTheme)(ComponentState)
