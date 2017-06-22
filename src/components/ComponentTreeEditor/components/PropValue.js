/** @flow */
import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'

import { Popover, View } from '@workflo/components'

import { MarkRendererPropsT } from '../types'
import { AnyPropValueChooser, StringPropValueChooser } from '../PropValueChoosers'
import type { PropCompletionDataT } from '../../../types/Completion'
import { Helpers, Prop } from '../../../modules/ComponentTree'

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

/** Component used for rendering prop values in the ComponentTreeEditor */
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
}

export default Theme('PropValueRenderer', defaultTheme)(PropValueRenderer)
