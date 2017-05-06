import React from 'react'
import PropTypes from 'prop-types'
import Align from '@workflo/components/lib/Align'

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
  onBack?: Function,
  onDismiss?: Function,
  onForward?: Function,
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
  hints: Array<HintT>,
  isActive: boolean,
  position: string,
}

export default class WalkthroughStep extends React.Component {
  props: Props

  static defaultProps: DefaultProps = {
    hints: [],
    isActive: true,
    position: 'Bottom Right',
  }

  static childContextTypes = {
    observableWalkthroughState: PropTypes.object,
  }

  render() {
    const {
      hints,
      horizontalOffset,
      isActive,
      message,
      onBack,
      onDismiss,
      onForward,
      position,
      targetSelector,
      title,
      type,
      verticalOffset,
    } = this.props
    return (
      <div>
        {isActive
          ? <Align
              horizontalOffset={horizontalOffset}
              isOpen
              portal={
                <WalkthroughDialog
                  message={message}
                  onBack={onBack}
                  onDismiss={onDismiss}
                  onForward={onForward}
                  title={title}
                  type={type}
                />
              }
              position={position}
              targetSelector={targetSelector}
              verticalOffset={verticalOffset}
            />
          : null}
        {hints.map(hint => (
          <Align
            isOpen
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
