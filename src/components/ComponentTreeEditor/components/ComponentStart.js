import React from 'react'
const Immutable = require('immutable')
import Theme from 'js-theme'

import { View } from '@workflo/components'

import { MarkRendererPropsT } from '../types'
import { Helpers } from '../../../modules/ComponentTree'

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
    const tree = Helpers.removeComponent(options.tree, component.id)
    options.onChange && options.onChange(tree)
    options.onRemoveComponent && options.onRemoveComponent(component.id)
  }
}

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
}

export default Theme('ComponentStartRenderer', defaultTheme)(ComponentStartRenderer)
