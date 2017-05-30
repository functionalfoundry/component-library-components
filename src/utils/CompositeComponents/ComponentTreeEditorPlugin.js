/* @flow */

import React from 'react'
import Theme from 'js-theme'
import { Record, Set } from 'immutable'
import {
  AlignedTrigger,
  AutoSuggest,
  EditableText,
  HoverIcon,
  Popover,
  View,
} from '@workflo/components'
import { Colors, Fonts, Spacing } from '@workflo/styles'
import StaggerChildren from '../../components/StaggerChildren'
import {
  AnyPropValueChooser,
  StringPropValueChooser,
} from '../../components/ComponentTreeEditor/PropValueChoosers'
import { type NodeIdentifierT, Component, ComponentTree, Prop } from './ComponentTree'
import type { CompletionDataT, PropCompletionDataT } from './Completion'

const Immutable = require('immutable')
const Slate = require('slate')
const Utils = require('./ComponentTreeUtils')

/**
 * Interaction state
 */

export type InteractionStateT = {
  editingNodeId?: NodeIdentifierT,
}

const InteractionState = Record({
  editingNodeId: null,
})

export { InteractionState }

/**
 * Plugin options
 */

type PluginOptionsT = {
  tree: ComponentTree,
  completionData?: CompletionDataT,
  interactionState: InteractionStateT,
  onChange?: Function,
  onRemoveProp?: Function,
  onRemoveComponent?: Function,
  onChangePropValue?: Function,
  onInsertComponent?: Function,
  onChangeComponentName?: Function,
  onSelectComponent?: Function,
}

/**
 * Mark renderers
 */

const defaultTheme = {
  componentStart: {
    position: 'relative',
  },
  componentRemover: {
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
  componentName: {
    color: '#00719e',
    ...Fonts.code,
  },
  propName: {
    position: 'relative',
    color: '#009e71',
  },
  propRemover: {
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
  propValueEditor: {
    display: 'inline',
    ...Fonts.code,
  },
  propValueChooser: {
    display: 'inline',
    cursor: 'pointer',
    ':hover': {
      background: Colors.grey200,
    },
  },
  propValueContainer: {
    display: 'flex',
    maxWidth: '400px !important',
    textAlign: 'left',
  },
  propValue: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    width: '100%',
  },
  text: {
    position: 'relative',
  },
  textRemover: {
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

  // Component tags

  componentTagEnd: {
    paddingRight: Spacing.tiny,
  },
  componentTagActions: {
    display: 'flex',
    flexDirection: 'row',
    ...Fonts.small,
  },
  componentTagAction: {
    cursor: 'pointer',
    backgroundColor: Colors.grey900,
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: Spacing.tiny / 2,
    marginRight: Spacing.tiny / 2,
    borderRadius: Spacing.tiny / 2,
  },
  componentTagActionLabel: {
    display: 'flex',
    flex: '1 1 auto',
    height: '16px',
  },
}

type MarkRendererPropsT = {
  children: React.Children,
  mark: Slate.Mark,
  marks: Set<Slate.Mark>,
  options: PluginOptionsT,
  theme: any,
}

/**
 * Component tag renderer
 */

class ComponentTagRenderer extends React.Component {
  props: MarkRendererPropsT

  render() {
    const { children, mark, marks, theme } = this.props
    const node = mark.getIn(['data', 'element', 'node'])
    const tree = mark.getIn(['data', 'tree'])
    const markNames = marks.reduce((out, mark) => out.add(mark.get('type')), Set())

    const isRoot = Immutable.is(tree.root, node)
    const showAddChild = markNames.contains('component-open-tag-end')
    const showAddSibling = !isRoot && markNames.contains('component-end')

    return (
      <AlignedTrigger
        position="Right"
        openTriggers={['Mouse enter']}
        closeTriggers={['Mouse leave']}
        portal={
          <View {...theme.componentTagActions}>
            <StaggerChildren direction="Right">
              {showAddChild &&
                <View {...theme.componentTagAction} onClick={this.handleAddChild}>
                  <HoverIcon
                    name="primary-plus"
                    hoverName="primary-plus-hover"
                    theme={{
                      svg: {
                        width: 22,
                        height: 22,
                      },
                    }}
                  />
                  <View {...theme.componentTagActionLabel}>
                    Child
                  </View>
                </View>}
              {showAddSibling &&
                <View {...theme.componentTagAction} onClick={this.handleAddSibling}>
                  <HoverIcon
                    name="primary-plus"
                    hoverName="primary-plus-hover"
                    theme={{
                      svg: {
                        width: 22,
                        height: 22,
                      },
                    }}
                  />
                  <View {...theme.componentTagActionLabel}>
                    Sibling
                  </View>
                </View>}
            </StaggerChildren>
          </View>
        }
      >
        <View {...theme.componentTagEnd} inline>
          <View inline>
            {children}
          </View>
        </View>
      </AlignedTrigger>
    )
  }

  handleAddChild = () => {
    const { options, mark } = this.props
    const { onInsertComponent } = options
    const component = mark.getIn(['data', 'element', 'node'])
    onInsertComponent && onInsertComponent(component.id, 0, Component({}))
  }

  handleSetText = () => {}

  handleAddSibling = () => {
    const { options, mark } = this.props
    const { onInsertComponent } = options
    const element = mark.getIn(['data', 'element'])
    const parent = element.getIn(['data', 'parent'])
    const index = element.getIn(['data', 'index'])
    onInsertComponent && onInsertComponent(parent.id, index + 1, Component({}))
  }
}

const ThemedComponentTagRenderer = Theme('ComponentTagRenderer', defaultTheme)(
  ComponentTagRenderer
)

/**
 * Component start renderer
 */

type ComponentStartRendererStateT = {
  isShowingMinus: boolean,
}

class ComponentStartRenderer extends React.Component {
  props: MarkRendererPropsT
  state: ComponentStartRendererStateT

  constructor(props) {
    super(props)
    this.state = { isShowingMinus: false }
  }

  render() {
    const { children, theme, mark } = this.props
    const { isShowingMinus } = this.state
    const node = mark.getIn(['data', 'element', 'node'])
    const tree = mark.getIn(['data', 'tree'])
    const isRoot = Immutable.is(tree.root, node)

    return (
      <View {...theme.componentStart} inline>
        {!isRoot &&
          <View
            {...theme.componentRemover}
            inline
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {isShowingMinus &&
              <View onClick={this.handleClick} inline>
                {'-'}
              </View>}
          </View>}
        {children}
      </View>
    )
  }

  handleMouseEnter = () => {
    this.setState({ isShowingMinus: true })
  }

  handleMouseLeave = () => {
    this.setState({ isShowingMinus: false })
  }

  handleClick = () => {
    const { mark, options } = this.props
    const component = mark.getIn(['data', 'element', 'node'])
    const tree = Utils.removeComponent(options.tree, component.id)
    options.onChange && options.onChange(tree)
    options.onRemoveComponent && options.onRemoveComponent(component.id)
  }
}

const ThemedComponentStartRenderer = Theme('ComponentStartRenderer', defaultTheme)(
  ComponentStartRenderer
)

/**
 * Component name renderer
 */

type ComponentNameRendererStateT = {
  filteredComponentNames: Array<string>,
  isEditing: boolean,
  name?: string,
  value: string,
}

class ComponentNameRenderer extends React.Component {
  props: MarkRendererPropsT
  state: ComponentNameRendererStateT
  editableText: EditableText

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      filteredComponentNames: this.getOptions(props),
      value: this.getComponent(props).name || '',
    }
  }

  componentDidMount() {
    const { options } = this.props
    const component = this.getComponent(this.props)
    const interactionState = options.interactionState
    const focus = component.id === interactionState.editingComponentId
    if (focus && this.editableText) {
      this.editableText.getWrappedInstance().focusAndSelect()
    }
  }

  getComponent = (props: MarkRendererPropsT) =>
    this.props.mark.getIn(['data', 'element', 'node'])

  getOptions = (props: MarkRendererPropsT) => {
    return (
      (props.options &&
        props.options.completionData &&
        props.options.completionData.components) || []
    )
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
      filteredComponentNames: this.getSuggestions(value),
    })
  }

  onSuggestionsClearRequested = () => {}

  handleChangeComponentName = (event, data) => {
    this.setState({ value: data.suggestionValue })
    const { options } = this.props
    const component = this.getComponent(this.props)
    if (options.onChangeComponentName) {
      options.onChangeComponentName(component.id, data.suggestionValue)
    }
  }

  render() {
    const { theme } = this.props
    const { value, filteredComponentNames } = this.state

    return (
      <View {...theme.componentName} inline>
        <AutoSuggest
          suggestions={filteredComponentNames}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderInputComponent={renderInputComponent}
          shouldRenderSuggestions={() => true}
          inputProps={{
            value: value,
            ref: c => {
              this.editableText = c
            },
            isEditing: this.state.isEditing,
            onStartEdit: this.handleStartEdit,
            onStopEdit: this.handleStopEdit,
            onChange: this.handleChange,
          }}
          onSuggestionSelected={this.handleChangeComponentName}
          focusInputOnSuggestionClick
          id="basic-example"
        />
      </View>
    )
  }

  handleStartEdit = () => {
    this.setState({ isEditing: true })
    const { options } = this.props
    const component = this.getComponent(this.props)
    options.onSelectComponent && options.onSelectComponent(component.id)
  }

  handleStopEdit = () => {
    this.setState({ isEditing: false })
  }

  handleChange = value => {
    this.setState({ value })
  }
}

const getSuggestionValue = suggestion => suggestion

const renderSuggestion = suggestion => <span>{suggestion}</span>

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

const ThemedComponentNameRenderer = Theme('ComponentNameRenderer', defaultTheme)(
  ComponentNameRenderer
)

/**
 * Property name renderer
 */

type PropNameRendererStateT = {
  isShowingMinus: boolean,
}

class PropNameRenderer extends React.Component {
  props: MarkRendererPropsT
  state: PropNameRendererStateT

  constructor(props: MarkRendererPropsT) {
    super(props)
    this.state = { isShowingMinus: false }
  }

  render() {
    const { children, theme } = this.props
    const { isShowingMinus } = this.state
    return (
      <View {...theme.propName} inline>
        <View
          {...theme.propRemover}
          inline
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {isShowingMinus &&
            <View onClick={this.handleClick} inline>
              {'-'}
            </View>}
        </View>
        {children}
      </View>
    )
  }

  handleMouseEnter = () => {
    this.setState({ isShowingMinus: true })
  }

  handleMouseLeave = () => {
    this.setState({ isShowingMinus: false })
  }

  handleClick = () => {
    const { mark, options } = this.props
    const prop = mark.getIn(['data', 'element', 'data', 'prop'])
    const tree = Utils.removeProp(options.tree, prop.id)
    options.onChange && options.onChange(tree)
    options.onRemoveProp && options.onRemoveProp(prop.id)
  }
}

const ThemedPropNameRenderer = Theme('PropNameRenderer', defaultTheme)(PropNameRenderer)

/**
 * Property value renderer
 */

const propValueChooserImplementations = {
  any: AnyPropValueChooser,
  array: AnyPropValueChooser,
  boolean: AnyPropValueChooser,
  custom: AnyPropValueChooser,
  element: AnyPropValueChooser,
  enum: AnyPropValueChooser,
  function: AnyPropValueChooser,
  literal: AnyPropValueChooser,
  node: AnyPropValueChooser,
  number: AnyPropValueChooser,
  object: AnyPropValueChooser,
  string: StringPropValueChooser,
  symbol: AnyPropValueChooser,
  tuple: AnyPropValueChooser,
  union: AnyPropValueChooser,
  unknown: AnyPropValueChooser,
  void: AnyPropValueChooser,
}

const getPropValueRenderer = (prop: Prop, propCompletionData: PropCompletionDataT) => {
  if (propCompletionData) {
    return propValueChooserImplementations[propCompletionData.type]
  } else {
    return propValueChooserImplementations['any']
  }
}

class PropValueRenderer extends React.Component {
  props: MarkRendererPropsT

  render() {
    const { children, mark, options, theme } = this.props
    const prop = mark.getIn(['data', 'element', 'data', 'prop'])
    const component = mark.getIn(['data', 'element', 'data', 'component'])
    const value = mark.getIn(['data', 'element', 'node'])

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

    const Chooser = getPropValueRenderer(prop, propCompletionData)

    if (Chooser === StringPropValueChooser) {
      return (
        <View {...theme.propValueEditor} inline>
          <Chooser
            prop={prop}
            value={value}
            completionData={propCompletionData}
            options={globalOptions}
            onChange={this.handleChange}
          />
        </View>
      )
    } else {
      return (
        <View {...theme.propValueChooser} inline>
          <Popover
            position="Right"
            horizontalOffset={5}
            verticalOffset={2}
            portal={
              <Chooser
                prop={prop}
                value={value}
                completionData={propCompletionData}
                options={globalOptions}
                onChange={this.handleChange}
              />
            }
          >
            <span {...theme.propValueContainer}>
              <div {...theme.propValue}>
                {children}
              </div>
            </span>
          </Popover>
        </View>
      )
    }
  }

  handleChange = value => {
    const { mark, options } = this.props
    const prop = mark.getIn(['data', 'element', 'data', 'prop'])
    const propValue = mark.getIn(['data', 'element', 'node'])
    const tree = Utils.setPropValue(options.tree, prop.id, propValue.set('value', value))
    options.onChange && options.onChange(tree)
    options.onChangePropValue && options.onChangePropValue(prop.id, value)
  }
}

const ThemedPropValueRenderer = Theme('PropValueRenderer', defaultTheme)(
  PropValueRenderer
)

/**
 * Component text renderer
 */

type TextRendererStateT = {
  isShowingMinus: boolean,
}

class TextRenderer extends React.Component {
  props: MarkRendererPropsT
  state: TextRendererStateT

  constructor(props) {
    super(props)
    this.state = { isShowingMinus: false }
  }

  render() {
    const { children, theme } = this.props
    const { isShowingMinus } = this.state
    return (
      <View {...theme.text} inline>
        <View
          {...theme.textRemover}
          inline
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {isShowingMinus &&
            <View onClick={this.handleClick} inline>
              {'-'}
            </View>}
        </View>
        {children}
      </View>
    )
  }

  handleMouseEnter = () => {
    this.setState({ isShowingMinus: true })
  }

  handleMouseLeave = () => {
    this.setState({ isShowingMinus: false })
  }

  handleClick = () => {
    const { mark, options } = this.props
    const component = mark.getIn(['data', 'element', 'node'])
    const tree = Utils.setComponentText(options.tree, component.id, null)
    options.onChange && options.onChange(tree)
  }
}

const ThemedTextRenderer = Theme('TextRenderer', defaultTheme)(TextRenderer)

/**
 * ComponentTreeEditorPlugin implementation
 */

const ComponentTreeEditorPlugin = (options: PluginOptionsT) => ({
  schema: {
    marks: {
      'component-start': (props: Object) => (
        <ThemedComponentStartRenderer {...props} options={options} />
      ),
      'component-open-tag-end': (props: Object) => (
        <ThemedComponentTagRenderer {...props} options={options} />
      ),
      'component-name': (props: Object) => (
        <ThemedComponentNameRenderer {...props} options={options} />
      ),
      'component-end': (props: Object) => (
        <ThemedComponentTagRenderer {...props} options={options} />
      ),
      'prop-name': (props: Object) => (
        <ThemedPropNameRenderer {...props} options={options} />
      ),
      'prop-value': (props: Object) => (
        <ThemedPropValueRenderer {...props} options={options} />
      ),
      text: (props: Object) => <ThemedTextRenderer {...props} options={options} />,
    },
  },
})

export { ComponentTreeEditorPlugin }
