/** @#flow */
import React from 'react'
import Theme from 'js-theme'

import { View } from '@workflo/components'

import { MarkRendererPropsT } from '../types'
import { Helpers } from '../../../modules/ComponentTree'

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
    const tree = Helpers.setComponentText(options.tree, component.id, null)
    options.onChange && options.onChange(tree)
  }
}

const defaultTheme = {
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
}

export default Theme('TextRenderer', defaultTheme)(TextRenderer)
