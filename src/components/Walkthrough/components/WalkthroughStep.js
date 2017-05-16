import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import shallowEqualObjects from 'shallow-equal/objects'
import Align from '@workflo/components/lib/Align'
import getAlignment from '@workflo/components/lib/Align/modules/getAlignment'
import Portal from '@workflo/components/lib/Portal'

import TimelineMax from '../../../../vendor/greensock/commonjs-flat/TimelineMax'
import WalkthroughBloop from './WalkthroughBloop'
import WalkthroughDialog from '../../WalkthroughDialog'

type PositionT =
  | 'Top'
  | 'Top Right'
  | 'Right'
  | 'Bottom Right'
  | 'Bottom'
  | 'Bottom Left'
  | 'Left'
  | 'Top Left'

type GravityT = 'Top' | 'Right' | 'Bottom' | 'Left' | 'Corner'

type HintT = {
  /** Gravity prop to pass into Align component used to render WalkthroughBloop */
  gravity: GravityT,
  horizontalOffset: number,
  /** Position prop to pass into Align component used to render WalkthroughBloop */
  position: PositionT,
  /** A DOM selector for the target where the hint will be anchored */
  targetSelector: string,
  verticalOffset: number,
}

type Props = {
  /** Gravity prop to pass into Align component used to render WalkthroughDialog */
  gravity: GravityT,
  hints: Array<HintT>,
  horizontalOffset: number,
  /** Boolean determines whether or not to render the WalkthroughStep */
  isActive: boolean,
  message: string,
  onBack: ?Function,
  onDismiss: ?Function,
  onForward: ?Function,
  /** Position prop to pass into Align component used to render WalkthroughDialog */
  position: PositionT,
  /** A DOM selector for the target where the dialog will be anchored */
  targetSelector: string,
  title: string,
  /** The type of WalkthroughDialog to render */
  type: 'Basic' | 'Success',
  verticalOffset: number,
}

type DefaultProps = {
  gravity: GravityT,
  hints: Array<HintT>,
  horizontalOffset: number,
  isActive: boolean,
  message: ?string,
  onBack: ?Function,
  onDismiss: ?Function,
  onForward: ?Function,
  position: string,
  targetSelector: ?string,
  title: ?string,
  type: string,
  verticalOffset: number,
}

/**
 * Displays a single Walkthrough Step. When receiving new props it handles animating
 * the transition to the new props.
 */
export default class WalkthroughStep extends React.Component {
  props: Props
  state: Props
  _dialogRef: any
  _isUpdating: boolean
  _timeline: Object

  static defaultProps: DefaultProps = {
    gravity: 'Corner',
    hints: [],
    horizontalOffset: 0,
    isActive: true,
    message: null,
    onBack: null,
    onDismiss: null,
    onForward: null,
    position: 'Bottom Right',
    targetSelector: null,
    title: null,
    type: 'Basic',
    verticalOffset: 0,
  }

  static childContextTypes = {
    observableWalkthroughState: PropTypes.object,
  }

  static shallowEqualObjects = shallowEqualObjects

  constructor(props: Props) {
    super(props)
    this.state = props
    this._isUpdating = false
  }

  componentDidMount() {
    const { isActive } = this.props
    const timeline = new TimelineMax()
    timeline.add(this._dialogRef.hide())
    this.alignDialog(this.props).then(timeline => {
      if (isActive) {
        timeline.add(this._dialogRef.animateEnter())
      }
    })
  }
  /**
   * We mirror props with state to act as a sort of buffer, so that animations
   * have a chance to complete before WalkthroughDialog is rendered with new props.
   *
   * We use the following algorithm:
   * 1. When receiving new props, hide dialog immediately if necessary.
   * 2. Set state to mirror props.
   * 3. When state and props are equal, show the dialog if it should be shown.
   *
   * We use the _isUpdating flag to track whether props and state are in sync and
   * the component is likely still animating, and we ignore prop changes that occur
   * while the component is updating. In the future it might be better to buffer these
   * additional prop changes and perhaps interrupt some animations accordingly... Let's
   * wait until React Fiber priorities are available and see what sort abstraction makes
   * sense here.
   */
  componentWillReceiveProps(nextProps: Props) {
    const { isActive, targetSelector } = nextProps
    const timeline = new TimelineMax()
    if (this._isUpdating) {
      return
    } else if (!shallowEqualObjects(this.state, nextProps)) {
      this._isUpdating = true
      if (this.props.targetSelector !== targetSelector || !isActive) {
        timeline.add(this._dialogRef.animateExit())
      }

      timeline.add(() => {
        this.setState(() => nextProps)
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    /**
     * We should only perform animations when props and state are in sync.
     * When props are out of sync with state, indicates that we have not yet triggered
     * a render of the dialog with the new valid inputs.
     */
    if (shallowEqualObjects(this.state, this.props)) {
      const timeline = new TimelineMax()
      /**
       * We hide the dialog again immediately here to avoid flickering when the
       * WalkthroughDialog renders w/ new props.
       */
      timeline.add(this._dialogRef.hide())
      /** We clear the transform property to not clash w/ the getAlignment logic */
      timeline.add(this._dialogRef.clearTransform())
      timeline.add(() => {
        this.alignDialog(this.props).then(timeline => {
          if (this.state.isActive) {
            timeline.add(this._dialogRef.animateEnter())
          }
          timeline.addCallback(() => {
            this._isUpdating = false
          })
        })
      })
    }
  }

  alignDialog(props) {
    const { gravity, horizontalOffset, position, targetSelector, verticalOffset } = props
    const onRealign = () => {}
    const targetNode = document.querySelector(targetSelector)
    const sourceNode = ReactDOM.findDOMNode(this._dialogRef)

    /**
     * getAlignment doesn't work correctly unless at least one tick in the event loop
     * has passed since render completed.
     */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        /**
         * We create a new timeline inside the callback because greensock timelines
         * do not stay active through separate ticks in the event loop.
         */
        const timeline = new TimelineMax()
        const offsetStyle = getAlignment(sourceNode, targetNode, {
          gravity,
          horizontalOffset: horizontalOffset || 0,
          onRealign,
          position,
          targetSelector,
          verticalOffset: verticalOffset || 0,
        })

        timeline.set(sourceNode, { ...offsetStyle, position: 'absolute' })
        resolve(timeline)
      }, 0)
    })
  }

  handleBack = (...args) => {
    if (!this._isUpdating) {
      this.state.onBack(...args)
    }
  }

  /**
   * We don't permit the user to interact w/ the dialog buttons while animation is occuring,
   * so we wrap the WalkthroughStep callbacks to do this check.
   */
  handleDismiss = (...args) => {
    if (!this._isUpdating) {
      this.state.onDismiss(...args)
    }
  }

  handleForward = (...args) => {
    if (!this._isUpdating) {
      this.state.onForward(...args)
    }
  }

  saveDialogRef = (ref: any) => {
    this._dialogRef = ref
  }

  render() {
    const { hints, message, onBack, onDismiss, onForward, title, type } = this.state
    return (
      <div style={{ height: 0, width: 0 }}>
        <Portal
          isOpened
          onCreateNode={this.savePortalRef}
          theme={{
            portal: {
              left: 0,
              position: 'absolute',
              top: 0,
            },
          }}
        >
          <WalkthroughDialog
            dialogRef={this.saveDialogRef}
            message={message}
            onBack={onBack && this.handleBack}
            onDismiss={onDismiss && this.handleDismiss}
            onForward={onForward && this.handleForward}
            title={title}
            type={type}
          />
        </Portal>
        {hints.map((hint, index) => (
          <Align
            isOpen
            key={index}
            gravity={hint.gravity || 'Corner'}
            horizontalOffset={hint.horizontalOffset}
            portal={<WalkthroughBloop />}
            position={hint.position || 'Bottom Right'}
            targetSelector={hint.targetSelector}
            verticalOffset={hint.verticalOffset}
          />
        ))}
      </div>
    )
  }
}
