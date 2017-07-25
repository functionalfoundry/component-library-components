/** @flow */
import React, { PureComponent } from 'react'
import { is } from 'immutable'

import { Path } from '../../../modules/ComponentTree'
import type { InteractionStateT } from '../types'
import EditableField from './EditableField'

type Props = {
  focusNextNode: Function,
  /**
   * An optional function to be applied to value before rendering. It is passed `value`
   * and `isFocused` as named parameters.
   */
  formatValue: Function,
  /** Contains information as to which node in the componentTree should be focused */
  interactionState: InteractionStateT,
  onBlur: Function,
  /** A callback for updating*/
  onChangeNode: Function,
  onFocus: Function,
  /**
   * Fired to indicate that the "next" node in the ComponentTree should be selected.
   * Called with the current nodeId as a parameter.
   */
  onFocusNext: Function,
  /**
   * Fired to indicate that the "previous" node in the ComponentTree should be selected.
   * Called with the current nodeId as a parameter.
   */
  onFocusPrevious: Function,
  options?: Array<any>,
  optionRenderer: Function,
  /** The ID of the componentTree node being modififed */
  nodeId: string,
  /** The path of the attribute being modified within the componentTree node (may be nested) */
  path: Path,
  /** The current value of the node attribute */
  value: string,
}

class EditableNodeAttribute extends PureComponent {
  props: Props

  computeIsFocused = ({ interactionState, path }: Props) =>
    is(interactionState.focusedNodePath, path)

  handleBlur = () => this.props.onBlur && this.props.onBlur(this.props.path)

  handleChange = (value: string) => {
    const { onChangeNode, path } = this.props
    onChangeNode({ path, value })
  }

  handleFocus = () => this.props.onFocus && this.props.onFocus(this.props.path)

  handleFocusNext = () => {
    const { path, onFocusNext } = this.props
    onFocusNext && onFocusNext(path)
  }

  handleFocusPrevious = () => {
    const { path, onFocusPrevious } = this.props
    onFocusPrevious && onFocusPrevious(path)
  }

  render() {
    return (
      <EditableField
        {...this.props}
        isFocused={this.computeIsFocused(this.props)}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onFocusNext={this.handleFocusNext}
        onFocusPrevious={this.handleFocusPrevious}
      />
    )
  }
}

export default EditableNodeAttribute
