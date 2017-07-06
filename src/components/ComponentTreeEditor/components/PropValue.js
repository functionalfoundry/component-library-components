/** @flow */
import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'

import { EditableText, Popover, View } from '@workflo/components'

import { Helpers } from '../../../modules/ComponentTree'
import { MarkRendererPropsT } from '../types'
import getPropValueTypeBoundaries from '../utils/getPropValueTypeBoundaries'

type State = {
  displayValue: string,
  isFocused: boolean,
  isHovering: boolean,
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
      displayValue: this.getDisplayValue(props, ({}: any)),
      isFocused: false,
      isHovering: false,
    }
  }

  getDisplayValue(props: MarkRendererPropsT, state: State) {
    const { mark } = props
    const propValueNode = mark.getIn(['data', 'element', 'node'])
    if (!state.isFocused) {
      const { open, close } = getPropValueTypeBoundaries(propValueNode)
      return `${open}${propValueNode.value}${close}`
    } else {
      return propValueNode.value
    }
  }

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
        displayValue: this.getDisplayValue(this.props, { isFocused: true }),
      }),
      () => {
        if (shouldFocusAndSelect) {
          this.editableText.refs.wrappedInstance.focusAndSelect()
        }
      }
    )
  }

  /** We only show the ending characters in the displayValue when the user is done editing */
  handleStopEdit = () =>
    this.setState({
      displayValue: this.getDisplayValue(this.props, { isFocused: false }),
      isFocused: false,
    })

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
      >
        <EditableText
          onStopEdit={this.handleStopEdit}
          ref={this.saveRefToEditableText}
          theme={editableTextTheme}
          value={this.state.displayValue}
        />
      </span>
    )
  }

  handleChange = (value: string) => {
    const { mark, options } = this.props
    const prop = mark.getIn(['data', 'element', 'data', 'prop'])
    const propValue = mark.getIn(['data', 'element', 'node'])
    const tree = Helpers.setPropValue(
      options.tree,
      prop.id,
      propValue.set('value', value)
    )
    options.onChange && options.onChange(tree)
    options.onChangePropValue && options.onChangePropValue(prop.id, value)
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
