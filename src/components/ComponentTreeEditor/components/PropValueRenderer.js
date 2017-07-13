/** @flow */
import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'
import { EditableText, Popover } from '@workflo/components'

import type { CompletionOptionT } from '../../../types/Completion'
import {
  type ComponentTree,
  Helpers,
  type PropValue,
  type Prop,
} from '../../../modules/ComponentTree'

import getPropValueTypeBoundaries from '../utils/getPropValueTypeBoundaries'
import stripQuotes from '../utils/stripQuotes'
import PropValueChooser from './PropValueChooser'

type Props = {
  completionOptions: Array<CompletionOptionT>,
  componentTree: ComponentTree,
  onChange: Function,
  onChangePropValue: Function,
  propNode: Prop,
  propValueNode: PropValue,
  theme: Object,
}

type State = {
  displayValue: string,
  isFocused: boolean,
  value: string,
}

const editableTextTheme = {
  text: {
    ...Fonts.code,
    textAlign: 'left',
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
}

/** Component used for rendering prop values in the ComponentTreeEditor */
class PropValueRenderer extends React.Component {
  props: Props
  state: State
  /** refs */
  editableText: any
  container: any

  constructor(props) {
    const { propValueNode } = props
    super(props)
    this.state = {
      displayValue: this.getDisplayValue(props, { isFocused: false }) || '',
      isFocused: false,
      value: propValueNode.get('value') || '',
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.propValueNode !== this.props.propValueNode) {
      this.setState({
        displayValue: this.getDisplayValue(nextProps, { isFocused: false }),
      })
    }
  }

  getDisplayValue(props: Props, state: any) {
    const { propValueNode } = props
    if (!state.isFocused || propValueNode.type === 'string') {
      const { open, close } = getPropValueTypeBoundaries(propValueNode)
      return `${open}${stripQuotes(propValueNode.value)}${close}`
    } else {
      return propValueNode.value
    }
  }

  resolveValueType = valueString => {
    let type = 'expression'
    try {
      type = typeof eval(valueString) // eslint-disable-line
    } catch (e) {}
    return type
  }

  handleChange = (value: string) => this.setState({ value: value })

  /**
   * When user focuses, we change the display value and highlight the text
   */
  handleClick = () => {
    /**
     * Only highlight the field the first time the user selects the field since the
     * last time they were focused on the field.
     */
    const shouldFocusAndSelect = !this.state.isFocused
    this.setState(
      prevState => ({
        isFocused: true,
        displayValue: this.getDisplayValue(this.props, { isFocused: true }) || '',
      }),
      () => {
        if (shouldFocusAndSelect) {
          this.editableText.refs.wrappedInstance.focusAndSelect()
        }
      }
    )
  }

  /**
   * We call onChange when the user has finished editing, updating the value and type
   * of the PropValue node.
   */
  handleStopEdit = () => {
    const {
      componentTree,
      onChange,
      onChangePropValue,
      propNode,
      propValueNode,
    } = this.props
    const tree = Helpers.setPropValue(
      componentTree,
      propNode.get('id'),
      propValueNode
        .set('value', this.state.value)
        .set('type', this.resolveValueType(this.state.value))
    )
    this.setState({ isFocused: false })
    onChange && onChange(tree)
    onChangePropValue && onChangePropValue(propNode.get('id'), this.state.value)
  }

  saveRefToEditableText = ref => (this.editableText = ref)

  saveRefToContainer = ref => (this.container = ref)

  render() {
    const { completionOptions, propValueNode, theme } = this.props

    return (
      <span
        {...theme.propValueContainer}
        onClick={this.handleClick}
        ref={this.saveRefToContainer}
      >
        <EditableText
          inline
          onChange={this.handleChange}
          onStopEdit={this.handleStopEdit}
          ref={this.saveRefToEditableText}
          theme={editableTextTheme}
          value={this.state.displayValue}
        />
        <Popover
          closeTriggers={[]}
          openTriggers={['Click inside']}
          portal={
            <PropValueChooser
              propValueNode={propValueNode}
              value={this.state.value}
              completionOptions={completionOptions}
              onChange={value => {
                this.handleChange(value)
                this.handleStopEdit()
              }}
            />
          }
          position="Bottom"
          targetRef={this.container}
          verticalOffset={2}
        />
      </span>
    )
  }
}

const defaultTheme = {
  propValueContainer: {
    color: Colors.yellow200,
    display: 'inline',
    textAlign: 'left',
  },
}

export default Theme('PropValueRenderer', defaultTheme)(PropValueRenderer)
