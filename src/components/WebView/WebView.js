import React from 'react'
import ComponentTree from '../../modules/ComponentTree'
const ElectronWebView = require('react-electron-web-view')
const Base64 = require('js-base64').Base64

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
  /** Harness element to render the component inside */
  harnessElement: React.Element<any>,
}

/**
 * State
 */

type StateT = {}

/**
 * Boilerplate HTML
 */

const BOILERPLATE_HTML = `
<!DOCTYPE html>
<html>
  <head></head>
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

      window.renderComponentTree = function (data) {
        // Extract data
        const evaluateCommonsChunk = data.evaluateCommonsChunk
        const evaluateBundles = data.evaluateBundles
        const renderTree = data.renderTree
        const commonsChunk = data.commonsChunk
        const bundles = data.bundles
        const harnessElement = data.harnessElement
        const tree = data.tree

        //if (evaluateCommonsChunk) {
          console.log('Evaluate commons chunk')
          eval(commonsChunk) // eslint-disable-line no-eval
        //}

        //if (evaluateBundles) {
          console.log('Evaluate bundles')
          updateImplementations(bundles)
        //}

        //if (renderTree) {
          console.log('Render tree')
          const treeElement = realizeComponentTree(tree, window.implementations)
          const harness = React.cloneElement(harnessElement, {}, treeElement)
          const root = document.getElementById('root')
          ReactDOM.render(harness, root)
        //}
      }

      // Receive render requests
      const { ipcRenderer } = require('electron')
      ipcRenderer.on('render', function (data) {
        console.log('RENDER', data)
        //window.renderComponentTree(data)
      })
    </script>
  </body>
</html>`

const BOILERPLATE_BASE64 = Base64.encode(BOILERPLATE_HTML)

/**
 * WebView component
 */

class WebView extends React.Component {
  props: PropsT
  state: StateT

  _webView = undefined

  handleDidAttach = () => {
    console.log('WebView did attach:', this._webView)

    this._webView.view.addEventListener('console-message', e => {
      console.log('Preview log message:', e.message)
    })

    const { bundles, commonsChunk, harnessElement, tree } = this.props

    this._webView.send('render', {
      bundles,
      // commonsChunk,
      // harnessElement,
      tree,
    })
  }

  render() {
    return (
      <ElectronWebView
        ref={ref => (this._webView = ref)}
        src={`data:text/html;base64,${BOILERPLATE_BASE64}`}
        onDidAttach={this.handleDidAttach}
        nodeintegration={true}
      />
    )
  }
}

export default WebView
