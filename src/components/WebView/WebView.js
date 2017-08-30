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
 * Boilerplate HTML
 */

const BOILERPLATE_HTML = `
  <body style="margin:0px; padding:0px">
    <div id="preview"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.js"></script>
    <script>
      // Needed for evaluating bundles
      window.production = 'production'

      function evaluateBundle (bundle) {
        const evaluated = eval(bundle || '') // eslint-disable-line no-eval
        return (evaluated && (evaluated.default || evaluated)) || null
      }

      function evaluateBundles (bundles) {
        return Object.keys(bundles).reduce(function (out, name) {
          out[name] = evaluateBundle(bundles[name])
          return out
        }, {})
      }

      function realizeComponentTree (tree, implementations) {
        function realizeProps (component) {
          return component.props.reduce(function (props, prop) {
            props[prop.name] = prop.value.value
            return props
          }, {})
        }

        function realizeChildren (component) {
          if (component.children.isEmpty()) {
            return null
          } else {
            return component.children.map(function (child) {
              return realizeComponent(child)
            })
          }
        }

        function realizeComponent (component) {
          const implementation = implementations[component.id]
          if (implementation) {
            const props = realizeProps(component)
            const children = realizeChildren(component) || component.text
            return React.createElement(implementation, props, children)
          }
        }

        if (tree.root) {
          return realizeComponent(tree.root)
        } else {
          return null
        }
      }

      function updateImplementations (newBundles) {
        bundles = window.bundles || {}
        implementations = window.implementations || {}

        Object.keys(newBundles).forEach(function (name) {
          if (bundles[name] !== newBundles[name]) {
            implementations[name] = evaluateBundle(newBundles[name])
            bundles[name] = newBundles[name]
          }
        })

        window.bundles = bundles
        window.implementations = implementations
      }

      window.renderComponentTree = function (
        evaluateCommonsChunk, evaluateBundles, renderTree
      ) {
        const commonsChunk = __workflo_data.commonsChunk
        const bundles = __workflo_data.bundles
        const harnessElement = __workflo_data.harnessElement
        const tree = __workflo_data.tree

        window.React = React
        window.ReactDOM = ReactDOM

        if (evaluateCommonsChunk) {
          eval(commonsChunk) // eslint-disable-line no-eval
        }

        if (evaluateBundles) {
          updateImplementations(bundles)
        }

        if (renderTree) {
          const treeElement = realizeComponentTree(tree, window.implementations)
          const harness = React.cloneElement(harnessElement, {}, treeElement)
          const root = document.getElementById('root')
          ReactDOM.render(harness, root)
        }
      }
    </script>
  </body>`

/**
 * WebView component
 */

class WebView extends React.Component {
  props: PropsT
  state: StateT

  _webView = undefined

  componentDidMount() {
    console.log('WebView did mount:', this._webView)
  }

  render() {
    return (
      <ElectronWebView
        ref={ref => (this._webView = ref)}
        src={`data:text/html,${BOILERPLATE_HTML}`}
      />
    )
  }
}

export default WebView
