/** @flow */
import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'
import { EditableText, Popover } from '@workflo/components'

import type { CompletionOptionT } from '../../../types/Completion'
import type { PropValue } from '../../../modules/ComponentTree'

// import { Helpers } from '../../../modules/ComponentTree'
// import getPropValueTypeBoundaries from '../utils/getPropValueTypeBoundaries'
// import stripQuotes from '../utils/stripQuotes'
import PropValueChooser from './PropValueChooser'

type Props = {
  completionOptions: Array<CompletionOptionT>,
  propValueNode: PropValue,
  theme: Object,
}

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
  props: Props
  state: State
  /** refs */
  editableText: any
  container: any

  // constructor(props) {
  //   super(props)
  // this.state = {
  //   displayValue: this.getDisplayValue(props, { isFocused: false }) || '',
  //   isFocused: false,
  //   isHovering: false,
  //   value: this.getValue(props) || '',
  // }
  // }

  // getDisplayValue(props: Props, state: any) {
  //   const propValueNode = this.getNode(props)
  //   if (!state.isFocused || propValueNode.type === 'string') {
  //     const { open, close } = getPropValueTypeBoundaries(propValueNode)
  //     return `${open}${stripQuotes(propValueNode.value)}${close}`
  //   } else {
  //     return propValueNode.value
  //   }
  // }

  // getNode = props => {
  //   const { mark } = props
  //   return mark.getIn(['data', 'element', 'node'])
  // }

  // getValue = props => {
  //   return this.getNode(props).get('value')
  // }

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
    // const shouldFocusAndSelect = !this.state.isFocused
    // this.setState(
    //   prevState => ({
    //     isFocused: true,
    //     displayValue: this.getDisplayValue(this.props, { isFocused: true }) || '',
    //   }),
    //   () => {
    //     if (shouldFocusAndSelect) {
    //       this.editableText.refs.wrappedInstance.focusAndSelect()
    //     }
    //   }
    // )
  }

  /**
   * We call onChange when the user has finished editing, updating the value and type
   * of the PropValue node.
   */
  handleStopEdit = () => {
    // const { mark, options } = this.props
    // const prop = mark.getIn(['data', 'element', 'data', 'prop'])
    // const propValue = this.getNode(this.props)
    // const tree = Helpers.setPropValue(
    //   options.tree,
    //   prop.id,
    //   propValue
    //     .set('value', this.state.value)
    //     .set('type', this.resolveValueType(this.state.value))
    // )
    // options.onChange && options.onChange(tree)
    // options.onChangePropValue && options.onChangePropValue(prop.id, this.state.value)
  }

  saveRefToEditableText = ref => (this.editableText = ref)

  saveRefToContainer = ref => (this.container = ref)

  // toggleHover = () => this.setState(prevState => ({ isHovering: !prevState.isHovering }))
  toggleHover = () => {}

  render() {
    const { completionOptions, propValueNode, theme } = this.props
    // const prop = mark.getIn(['data', 'element', 'data', 'prop'])
    // const component = mark.getIn(['data', 'element', 'data', 'component'])

    return (
      <span
        {...theme.propValueContainer}
        onClick={this.handleClick}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        ref={this.saveRefToContainer}
      >
        <EditableText
          inline
          onChange={this.handleChange}
          onStopEdit={this.handleStopEdit}
          ref={this.saveRefToEditableText}
          theme={editableTextTheme}
          value={propValueNode.get('value')}
        />
        <Popover
          closeTriggers={[]}
          horizontalOffset={5}
          openTriggers={['Click inside']}
          portal={
            <PropValueChooser
              propValueNode={propValueNode}
              // value={this.state.value}
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
