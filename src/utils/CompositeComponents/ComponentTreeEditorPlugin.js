/* @flow */

import React from 'react'
import Theme from 'js-theme'
import { Set } from 'immutable'
import { Popover, Trigger, View } from '@workflo/components'
import { Colors } from '@workflo/styles'
import {
  AnyPropValueChooser,
} from '../../components/ComponentTreeEditor/PropValueChoosers'
import { ComponentTree, Prop, PropValue } from './ComponentTree'
import type {
  CompletionDataT,
  GlobalOptionsDataT,
  PropCompletionDataT,
} from './Completion'

const Slate = require('slate')
const Utils = require('./ComponentTreeUtils')

/**
 * Plugin options
 */

type PluginOptionsT = {
  tree: ComponentTree,
  completionData?: CompletionDataT,
  onChange?: Function,
  onRemoveProp?: Function,
  onChangePropValue?: Function,
}

/**
 * Mark renderers
 */

const defaultTheme = {
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
    display: 'inline-block',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  propValueChooser: {
    display: 'inline',
    cursor: 'pointer',
    ':hover': {
      background: Colors.grey200,
    }
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
    display: 'inline-block',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
 * Property renderer
 */

type PropNameRendererStateT = {
  isShowingMinus: boolean,
}

class PropNameRenderer extends React.Component {
  props: MarkRendererPropsT
  state: PropNameRendererStateT

  constructor (props) {
    super(props)
    this.state = { isShowingMinus: false }
  }

  render () {
    const { children, theme } = this.props
    const { isShowingMinus } = this.state
    return (
      <View
        {...theme.propName}
        inline
      >
        <Trigger
          triggerOn={['Hover', 'Mouse leave']}
          onTrigger={this.handleTrigger}
        >
          <View
            {...theme.propRemover}
            inline
          >
            {isShowingMinus &&
              <View onClick={this.handleClick} inline>
                {'-'}
              </View>}
          </View>
        </Trigger>
        {children}
      </View>
    )
  }

  handleTrigger = () => {
    this.setState({ isShowingMinus: !this.state.isShowingMinus })
  }

  handleClick = () => {
    const { mark, options } = this.props
    const prop = mark.getIn(['data', 'element', 'data', 'prop'])
    const tree = Utils.removeProp(options.tree, prop.id)
    options.onChange && options.onChange(tree)
    options.onRemoveProp && options.onRemoveProp(prop.id)
  }
}

const ThemedPropNameRenderer =
  Theme('PropNameRenderer', defaultTheme)(PropNameRenderer)

/**
 * Property value renderer
 */

const propValueChooserImplementations = {
  'any': AnyPropValueChooser,
}

const getPropValueRenderer = (
  prop: Prop,
  propCompletionData: PropCompletionDataT
) => {
  if (propCompletionData) {
    return propValueChooserImplementations[propCompletionData.type]
        || propValueChooserImplementations['any']
  } else {
    return propValueChooserImplementations['any']
  }
}

class PropValueRenderer extends React.Component {
  props: MarkRendererPropsT

  constructor (props) {
    super(props)
  }

  render () {
    const { children, mark, marks, options, theme } = this.props
    const prop = mark.getIn(['data', 'element', 'data', 'prop'])
    const component = mark.getIn(['data', 'element', 'data', 'component'])
    const value = mark.getIn(['data', 'element', 'node'])

    const propCompletionData =
      options
      && options.completionData
      && options.completionData.props
      && options.completionData.props[component.name]
      && options.completionData.props[component.name][prop.name]

    const globalOptions =
      options
      && options.completionData
      && options.completionData.globalOptions

    const Chooser = getPropValueRenderer(prop, propCompletionData)

    return (
      <View
        {...theme.propValueChooser}
        inline
      >
        <Popover
          position='Right'
          horizontalOffset={5}
          verticalOffset={2}
          portal={(
            <Chooser
              prop={prop}
              value={value}
              completionData={propCompletionData}
              options={globalOptions}
              onChange={this.handleChange}
            />
          )}
        >
          <span>
            {children}
          </span>
        </Popover>
      </View>
    )
  }

  handleChange = (value) => {
    const { mark, options } = this.props
    const prop = mark.getIn(['data', 'element', 'data', 'prop'])
    const propValue = mark.getIn(['data', 'element', 'node'])
    const tree = Utils.setPropValue(
      options.tree, prop.id, propValue.set('value', value)
    )
    options.onChange && options.onChange(tree)
    options.onChangePropValue && options.onChangePropValue(prop.id, value)
  }
}

const ThemedPropValueRenderer =
  Theme('PropValueRenderer', defaultTheme)(PropValueRenderer)

/**
 * Component text renderer
 */

type TextRendererStateT = {
  isShowingMinus: boolean,
}

class TextRenderer extends React.Component {
  props: MarkRendererPropsT
  state: TextRendererStateT

  constructor (props) {
    super(props)
    this.state = { isShowingMinus: false }
  }

  render () {
    const { children, theme } = this.props
    const { isShowingMinus } = this.state
    return (
      <View
        {...theme.text}
        inline
      >
        <Trigger
          triggerOn={['Hover', 'Mouse leave']}
          onTrigger={this.handleTrigger}
        >
          <View
            {...theme.textRemover}
            inline
          >
            {isShowingMinus &&
              <View onClick={this.handleClick} inline>
                {'-'}
              </View>}
          </View>
        </Trigger>
        {children}
      </View>
    )
  }

  handleTrigger = () => {
    this.setState({ isShowingMinus: !this.state.isShowingMinus })
  }

  handleClick = () => {
    const { mark, options } = this.props
    const component = mark.getIn(['data', 'element', 'node'])
    const tree = Utils.setComponentText(options.tree, component.id, null)
    options.onChange && options.onChange(tree)
  }
}

const ThemedTextRenderer =
  Theme('TextRenderer', defaultTheme)(TextRenderer)

/**
 * ComponentTreeEditorPlugin implementation
 */

const ComponentTreeEditorPlugin = (options: PluginOptionsT) => ({
  schema: {
    marks: {
      'prop-name': (props: Object) => (
        <ThemedPropNameRenderer
          {...props}
          options={options}
        />
      ),
      'prop-value': (props: Object) => (
        <ThemedPropValueRenderer
          {...props}
          options={options}
        />
      ),
      'text': (props: Object) => (
        <ThemedTextRenderer
          {...props}
          options={options}
        />
      )
    },
  },
})

export default ComponentTreeEditorPlugin
