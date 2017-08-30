import React from 'react'
import ComponentTree from '../../modules/ComponentTree'
const ElectronWebView = require('react-electron-web-view')

/**
 * Props
 */

type BundlesT = Object<string, string>

type PropsT = {
  /** The component tree to render */
  tree: ComponentTree,
  /** A chunk with common JS modules for components from the same repo */
  commonsChunk: string,
  /** Map from tree component IDs to bundle strings */
  bundles: BundlesT,
}

/**
 * State
 */

type StateT = {}

/**
 * WebView component
 */

class WebView extends React.Component {
  props: PropsT
  state: StateT

  render() {
    return (
      <ElectronWebView
        src="data:text/html,<html><body>Web view body</body></html>"
        autosize={false}
        nodeintegration={false}
        plugins={false}
        preload="file:./boilerplate.js"
      />
    )
  }
}

export default WebView
