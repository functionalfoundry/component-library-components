/* @flow */
import React from 'react'
import Theme from 'js-theme'
import { Checkbox, View } from '@workflo/components'
import { Colors, Fonts, Spacing } from '@workflo/styles'
import Heading from '@workflo/components/lib/Heading'
import { Power2, TweenMax } from 'gsap'
import LivePreview from '../LivePreview'

/**
 * Prop types
 */

type SizeT = 'Tiny' | 'Small' | 'Base' | 'Large'

type ComponentStateT = {
  name: string,
}

type HarnessT = {
  id: string,
  componentState: ComponentStateT,
  size: {
    horizontal: SizeT,
    vertical: SizeT,
  },
}

type BundlesT = Object

type PropsT = {
  harnessCard: {
    element: ?React.Element<*>,
    tree: Object,
    commonsChunk: string,
    bundles: BundlesT,
    harness: HarnessT,
    /** Not implemented */
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
    commonsChunk: '',
    bundles: {},
    harness: {
      componentState: {
        name: '',
      },
    },
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
  }

  handleMouseLeave = () => {
    this.props.onMouseLeave()
  }

  componentDidMount() {
    // this.animateSelectionChange(this.props.harnessCard.isSelected)
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

  storeHarnessCard = c => (this.harnessCard = c)

  render() {
    const { harnessCard, onClickTitle, isHovering, theme } = this.props

    return (
      <div
        {...theme.componentState}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div {...theme.selectionContainer}>
          <div {...theme.titleContainer}>
            {shouldShowCheckbox(isHovering, harnessCard.isSelected) &&
              <div {...theme.checkboxContainer}>
                <Checkbox
                  checked={harnessCard.isSelected}
                  onChange={() => this.handleChangeIsSelected(!harnessCard.isSelected)}
                  theme={{ checkbox: { marginTop: 2 } }}
                />
              </div>}
            <div {...theme.title} onClick={() => onClickTitle()}>
              {harnessCard.harness.componentState.name}
            </div>
          </div>
          <div
            {...theme.harnessCard}
            key={harnessCard.harness.id}
            ref={this.storeHarnessCard}
            {...harnessCard.extraProps}
          >
            <LivePreview
              name={harnessCard.harness.id}
              tree={harnessCard.tree}
              commonsChunk={harnessCard.commonsChunk}
              bundles={harnessCard.bundles}
            />
          </div>
        </div>
      </div>
    )
  }
}

const shouldShowCheckbox = (isHovering, isSelected) => isHovering || isSelected

const defaultTheme = ({ harnessCard, isHovering }) => ({
  checkboxContainer: {
    transform: 'scale(0.75)',
    paddingBottom: Spacing.tiny,
  },
  componentState: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  harnessCard: {
    display: 'flex',
    overflow: 'hidden',
    flexGrow: 1,
  },
  selectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingTop: 10,
  },
  titleContainer: {
    alignItems: 'center',
    display: 'flex',
    flexBasis: 25,
    flexDirection: 'row',
  },
  title: {
    ...Fonts.base,
    transform: shouldShowCheckbox(isHovering, harnessCard.isSelected)
      ? `translate3d(${Spacing.tiny + Spacing.micro}px, 0, 0)`
      : `translate3d(0, 0, 0)`,
    WebkitTransform: shouldShowCheckbox(isHovering, harnessCard.isSelected)
      ? `translate3d(${Spacing.tiny + Spacing.micro}px, 0, 0)`
      : `translate3d(0, 0, 0)`,
    color: Colors.grey200,
    display: 'inline',
    transition: '0.3s transform cubic-bezier(0.19, 1, 0.22, 1)',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline',
    },
  },
})

const ThemedComponentState = Theme('ComponentState', defaultTheme)(ComponentState)
