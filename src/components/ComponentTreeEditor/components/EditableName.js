/** @#flow */
import React from 'react'
import Theme from 'js-theme'

import { Fonts } from '@workflo/styles'
import { AutoSuggest, EditableText, View } from '@workflo/components'

import { MarkRendererPropsT } from '../types'
import { Helpers } from '../../../modules/ComponentTree'

type EditableNameRendererStateT = {
  filteredNames: Array<string>,
  isEditing: boolean,
  name?: string,
  value: string,
  valueChanged: boolean,
  showMinus: boolean,
}

/**
 * Component name renderer
 */
class EditableNameRenderer extends React.Component {
  props: MarkRendererPropsT
  state: EditableNameRendererStateT
  editableText: EditableText

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      filteredNames: this.getOptions(props),
      value: this.getName(props) || '',
      valueChanged: false,
      showMinus: false,
    }
  }

  getNode = (props: MarkRendererPropsT) =>
    this.props.mark.getIn(['data', 'element', 'node'])

  getName = (props: MarkRendererPropsT) => {
    const node = this.getNode(props)
    return nameRendererImplementations[node.nodeType].getName(props, node)
  }

  getOptions = (props: MarkRendererPropsT) => {
    const node = this.getNode(props)
    return nameRendererImplementations[node.nodeType].getOptions(props, node)
  }

  getSuggestions = value => {
    const escapedValue = value.trim()
    const candidates = this.getOptions(this.props)

    if (escapedValue === '') {
      return candidates
    }

    const regex = new RegExp('^' + escapedValue, 'i')
    return candidates.filter(item => regex.test(item))
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      filteredNames: this.getSuggestions(value),
    })
  }

  onSuggestionsClearRequested = () => {}

  handleChangeName = (event, data) => {
    this.setState({ value: data.suggestionValue })
    const node = this.getNode(this.props)
    nameRendererImplementations[node.nodeType].handleChange(
      this.props,
      node,
      data.suggestionValue
    )
  }

  handleMouseEnter = () => this.setState({ showMinus: true })
  handleMouseLeave = () => this.setState({ showMinus: false })

  handleMinusClick = () => {
    const node = this.getNode(this.props)
    nameRendererImplementations[node.nodeType].handleRemove(this.props, node)
  }

  componentDidMount() {
    const { marks, options } = this.props
    const node = this.getNode(this.props)
    const interactionState = options.interactionState
    const focus = node.id === interactionState.editingNodeId
    if (focus && this.editableText) {
      this.setState({ isEditing: true })
      if (node.nodeType === 'component') {
        if (!marks.filter(mark => mark.type === 'component-open-tag-name').isEmpty()) {
          this.editableText.getWrappedInstance().focusAndSelect()
        }
      } else {
        this.editableText.getWrappedInstance().focusAndSelect()
      }
    }
  }

  shouldRenderSuggestions = newValue => {
    const { options } = this.props
    const { value } = this.state
    const node = this.getNode(this.props)
    const interactionState = options.interactionState
    return (
      this.state.valueChanged ||
      (node.id === interactionState.editingNodeId &&
        (newValue !== value || (node.nodeType === 'component' && newValue === '')))
    )
  }

  render() {
    const { theme } = this.props
    const { filteredNames, showMinus, value } = this.state
    const node = this.getNode(this.props)
    return (
      <View {...theme.nameRenderer} inline onClick={this.handleStartEdit}>
        {node.nodeType === 'prop' &&
          <View
            {...theme.remover}
            inline
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {showMinus &&
              <View onClick={this.handleMinusClick} inline>
                {'-'}
              </View>}
          </View>}
        <AutoSuggest
          suggestions={filteredNames}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderInputComponent={renderInputComponent}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          inputProps={{
            value: value,
            ref: c => {
              this.editableText = c
            },
            isEditing: this.state.isEditing,
            onStopEdit: this.handleStopEdit,
            onChange: this.handleChange,
          }}
          onSuggestionSelected={this.handleChangeName}
          focusInputOnSuggestionClick
        />
      </View>
    )
  }

  handleStartEdit = () => {
    this.setState({ isEditing: true })
    const node = this.getNode(this.props)
    return nameRendererImplementations[node.nodeType].handleSelect(this.props, node)
  }

  handleStopEdit = () => {
    this.setState({ isEditing: false })
  }

  handleChange = value => {
    this.setState({ value, valueChanged: true })
  }
}

const getSuggestionValue = suggestion => suggestion

const renderSuggestion = suggestion => <span>{suggestion}</span>

const nameRendererImplementations = {
  /**
   * Specific logic for editing component names.
   */
  component: {
    getName: (props, node) => node.name,

    getOptions: (props, node) =>
      (props.options &&
        props.options.completionData &&
        props.options.completionData.components) || [],

    handleSelect: (props, node) => {
      const { options } = props
      if (options.onSelectComponent) {
        options.onSelectComponent(node.id)
      }
    },

    handleRemove: (props, node) => {
      console.debug('Handle remove not implemented for components yet') // eslint-disable-line
    },

    handleChange: (props, node, value) => {
      const { options } = props
      const tree = Helpers.setComponentName(options.tree, node.id, value)
      if (options.onChange) {
        options.onChange(tree)
      }
      if (options.onChangeComponentName) {
        options.onChangeComponentName(node.id, value)
      }
    },
  },

  /**
   * Specific logic for editing prop names.
   */
  prop: {
    getName: (props, node) => node.name,

    getOptions: (props, node) => {
      const component = props.mark.getIn(['data', 'element', 'data', 'component'])
      const completionProps = (props.options &&
        props.options.completionData &&
        props.options.completionData.props &&
        props.options.completionData.props[component.name]) || {}
      return Object.keys(completionProps).sort()
    },

    handleSelect: (props, node) => {
      const { options } = props
      if (options.onSelectNode) {
        options.onSelectNode(node.id)
      }
    },

    handleRemove: (props, node) => {
      const { options } = props
      const tree = Helpers.removeProp(options.tree, node.id)
      if (options.onChange) {
        options.onChange(tree)
      }
      if (options.onRemoveProp) {
        options.onRemoveProp(node.id)
      }
    },

    handleChange: (props, node, value) => {
      const { options } = props
      const component = props.mark.getIn(['data', 'element', 'data', 'component'])
      const tree = Helpers.setPropName(options.tree, node.id, value)
      if (options.onChange) {
        options.onChange(tree)
      }
      if (options.onChangePropName) {
        options.onChangePropName(component.id, node.id, value)
      }
    },
  },
}
// Move all of these
const renderInputComponent = props => (
  <EditableText
    {...props}
    theme={{
      text: {
        ...Fonts.code,
        minWidth: '0.65em !important',
      },
    }}
  />
)

const defaultTheme = ({ mark }: MarkRendererPropsT) => ({
  nameRenderer: mark.getIn(['data', 'element', 'node']).nodeType === 'component'
    ? {
        color: '#00719e',
        ...Fonts.code,
      }
    : {
        color: '#009e71',
        position: 'relative',
        marginRight: '0.1em',
        ...Fonts.code,
      },
  remover: {
    cursor: 'pointer',
    top: 0,
    left: '-35px',
    width: 35,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Theme('EditableNameRenderer', defaultTheme)(EditableNameRenderer)
