/** @flow */
import React, { PureComponent } from 'react'

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
  path: string | Array<string>,
  /** The current value of the node attribute */
  value: string,
}

class EditableNodeAttribute extends PureComponent {
  props: Props

  computeIsFocused = ({ interactionState, nodeId }: Props) =>
    interactionState.focusedNodeId === nodeId

  handleChange = (value: string) => {
    const { nodeId, onChangeNode, path } = this.props
    onChangeNode({ nodeId, path, value })
  }

  handleFocusNext = () => {
    const { nodeId, onFocusNext } = this.props
    onFocusNext && onFocusNext(nodeId)
  }

  render() {
    return (
      <EditableField
        {...this.props}
        isFocused={this.computeIsFocused(this.props)}
        onChange={this.handleChange}
        onFocusNext={this.handleFocusNext}
      />
    )
  }
}

export default EditableNodeAttribute
