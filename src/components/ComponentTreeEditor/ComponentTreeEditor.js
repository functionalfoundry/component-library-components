/* @flow */

import React from 'react'
import Theme from 'js-theme'

/**
 * Props
 */

type PropsT = {
}

const defaultProps = {
}

/**
 * State
 */

type StateT = {
}

/**
 * ComponentTree component
 */

class ComponentTreeEditor extends React.Component {
  props: PropsT
  state: StateT

  static defaultProps = defaultProps

  constructor (props) {
    super(props)
  }

  render () {
    return <div>Component Tree Editor</div>
  }
}

/**
 * Theming
 */

const defaultTheme = {
}

const ThemedComponentTreeEditor =
  Theme('ComponentTreeEditor', defaultTheme)(ComponentTreeEditor)
export default ThemedComponentTreeEditor
