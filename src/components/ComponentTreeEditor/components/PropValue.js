/** @flow */
import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'

import { AlignedPointer, EditableText, Popover, View } from '@workflo/components'

import { Helpers } from '../../../modules/ComponentTree'
import { MarkRendererPropsT } from '../types'
import getPropValueTypeBoundaries from '../utils/getPropValueTypeBoundaries'
import stripQuotes from '../utils/stripQuotes'
import PropValueChooser from './PropValueChooser'

type State = {
  displayValue: string,
  isFocused: boolean,
  isHovering: boolean,
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
  props: MarkRendererPropsT
  state: State
  editableText: any

  constructor(props) {
    super(props)
    this.state = {
      displayValue: this.getDisplayValue(props, { isFocused: false }) || '',
      isFocused: false,
      isHovering: false,
      value: this.getValue(props) || '',
    }
  }

  getDisplayValue(props: MarkRendererPropsT, state: any) {
    const propValueNode = this.getNode(props)
    if (!state.isFocused || propValueNode.type === 'string') {
      const { open, close } = getPropValueTypeBoundaries(propValueNode)
      return `${open}${stripQuotes(propValueNode.value)}${close}`
    } else {
      return propValueNode.value
    }
  }

  getNode = props => {
    const { mark } = props
    return mark.getIn(['data', 'element', 'node'])
  }

  getValue = props => {
    return this.getNode(props).get('value')
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
    const { mark, options } = this.props
    const prop = mark.getIn(['data', 'element', 'data', 'prop'])
    const propValue = this.getNode(this.props)
    const tree = Helpers.setPropValue(
      options.tree,
      prop.id,
      propValue
        .set('value', this.state.value)
        .set('type', this.resolveValueType(this.state.value))
    )
    options.onChange && options.onChange(tree)
    options.onChangePropValue && options.onChangePropValue(prop.id, this.state.value)
  }

  saveRefToEditableText = ref => (this.editableText = ref)

  toggleHover = () => this.setState(prevState => ({ isHovering: !prevState.isHovering }))

  render() {
    const { mark, options, theme } = this.props
    const prop = mark.getIn(['data', 'element', 'data', 'prop'])
    const component = mark.getIn(['data', 'element', 'data', 'component'])

    const propCompletionData = (options &&
      options.completionData &&
      options.completionData.props &&
      options.completionData.props[component.name] &&
      options.completionData.props[component.name][prop.name]) || {
      type: 'any',
      options: [],
    }

    const globalOptions =
      options && options.completionData && options.completionData.globalOptions

    return (
      <span
        {...theme.propValueContainer}
        onClick={this.handleClick}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        name={'foo'}
      >
        <Popover
          position="Right"
          horizontalOffset={5}
          openTriggers={['Click inside']}
          closeTriggers={[]}
          verticalOffset={2}
          portal={
            <PropValueChooser
              prop={prop}
              value={this.state.value}
              completionData={propCompletionData}
              options={globalOptions}
              onChange={value => {
                console.log('changing to value: ', value)
                this.handleChange(value)
                this.handleStopEdit()
              }}
            />
          }
        >
          <EditableText
            onChange={this.handleChange}
            onStopEdit={this.handleStopEdit}
            ref={this.saveRefToEditableText}
            theme={editableTextTheme}
            value={this.state.displayValue}
          />
        </Popover>
      </span>
    )
  }
}

const defaultTheme = {
  propValueContainer: {
    display: 'inline-block',
    maxWidth: '80%',
    textAlign: 'left',
  },
}

export default Theme('PropValueRenderer', defaultTheme)(PropValueRenderer)
