/** @flow */
import React from 'react'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'

import { EditableText, Popover, View } from '@workflo/components'

import { Helpers } from '../../../modules/ComponentTree'
import { MarkRendererPropsT } from '../types'
import getPropValueTypeBoundaries from '../utils/getPropValueTypeBoundaries'

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

  render() {
    const { children, mark, options, theme } = this.props
    const prop = mark.getIn(['data', 'element', 'data', 'prop'])
    const component = mark.getIn(['data', 'element', 'data', 'component'])
    const propValueNode = mark.getIn(['data', 'element', 'node'])

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

    const { open, close } = getPropValueTypeBoundaries(propValueNode)

    return (
      <span {...theme.propValueContainer}>
        <EditableText
          theme={editableTextTheme}
          value={`${open}${propValueNode.value}${close}`}
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
