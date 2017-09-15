// From https://github.com/ryanseddon/react-frame-component/blob/b4437e082dcf4a8521f1ac4218c0b5d2aed81350/src/Frame.jsx
import React from 'react'
import Theme from 'js-theme'

import ComponentTree from '../../modules/ComponentTree'

type BundlesT = Object<string, string>

type PropsT = {
  /** Background color to use for the frame */
  backgroundColor: string,
  /** Map from tree component IDs to bundle strings */
  bundles: BundlesT,
  /** A chunk with common JS modules for components from the same repo */
  commonsChunk: string,
  /** A unique ID for the iFrame */
  name: string,
  /** Callback invoked if an error is triggered in the iFrame */
  onError?: Function,
  /** Harness element to render the component inside */
  harnessElement: React.Element<any>,
  /**
   * Packages to load into the iFrame from unpkg.com CDN. Must be valid npm
   * packages/ versions. Versions may follow semver rules.
   *
   * If specified, must include a version of 'react' and 'react-dom'. (Defaults to React15)
   *
   * i.e. { react: '15.6.3', react-dom: '15.6.3' } or { react: '15', react-dom: '15' }
   */
  packageVersions: {
    [string]: string,
  },
  /** The theme for the frame */
  theme: Object,
  /**
  * Takes a map from component names to component functions / classes
  * and returns the composite component tree
  */
  tree: ComponentTree,
}

/**
 * State
 */

type StateT = {}

/**
 * Evaluates and renders a React component in isolation given a particular version of
 * React and React DOM.
 */
class Frame extends React.Component {
  props: PropsT
  state: StateT

  static defaultProps = {
    packageVersions: {
      react: '15',
      'react-dom': '15',
    },
  }

  _isFrameDOMLoaded: boolean
  _isMounted: boolean
  _isInitialContentSet: boolean

  constructor(props, context) {
    super(props, context)

    this._isFrameDOMLoaded = false
    this._isMounted = false
    this._isInitialContentSet = false
  }

  componentDidMount() {
    this._isMounted = true
    this.renderFrameContents({
      evaluateCommonsChunk: true,
      evaluateBundles: true,
      renderTree: true,
    })
  }

  componentDidUpdate(prevProps) {
    const evaluateCommonsChunk = prevProps.commonsChunk !== this.props.commonsChunk
    const evaluateBundles = this.bundlesHaveChanged(prevProps.bundles, this.props.bundles)
    const renderTree =
      evaluateCommonsChunk ||
      evaluateBundles ||
      this.componentTreeHasChanged(prevProps.tree, this.props.tree)
    if (evaluateCommonsChunk || evaluateBundles || renderTree) {
      this.renderFrameContents({ evaluateCommonsChunk, evaluateBundles, renderTree })
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  bundlesHaveChanged = (oldBundles, newBundles) => {
    return Object.keys(newBundles).reduce((changed, componentId) => {
      return changed || oldBundles[componentId] !== newBundles[componentId]
    }, false)
  }

  componentTreeHasChanged = (oldTree, newTree) => {
    return !newTree.equals(oldTree)
  }

  /**
   * Returns the iframe element.
   */
  getFrame = props => {
    return window.frames[props.name]
  }

  /**
   * Returns the iFrame's document
   */
  getDocument = () => {
    const node = this._frame
    if (node !== null) {
      return node.contentDocument // eslint-disable-line
    } else {
      return undefined
    }
  }
  /* eslint-disable standard/computed-property-even-spacing */
  getInitialHTML = () => {
    const { packageVersions } = this.props
    const packageNames = Object.keys(packageVersions)
    return `
    <!DOCTYPE html>
    <html >
      <head>
        ${packageNames
          .map(
            packageName =>
              `<script src="https://unpkg.com/${packageName}@${packageVersions[
                packageName
              ]}/dist/${packageName}.min.js"></script>`
          )
          .join('\n')}
      </head>
      <body style="margin:0px; padding:0px;">
        <div id="root" ></div>
        <script>
          // Needed for evaluating bundles
          window.production = 'production'
          window.addEventListener('error', window.handleError)
          window.addEventListener('DOMContentLoaded', window.handleDOMContentLoaded)
        </script>
        <script>
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

            // NOTE: This should only be necessary if 'evaluateCommonsChunk'
            // is true. However, it seems that causes examples to not rerender
            // properly when hot reloading. So for the moment, we're always
            // re-evaluating the commons chunk.
            window.commonsChunk = eval(commonsChunk) // eslint-disable-line no-eval

            if (evaluateBundles) {
              updateImplementations(bundles)
            }

            if (renderTree) {
              try {
                const treeElement = realizeComponentTree(tree, window.implementations)
                const harness = window.React.cloneElement(
                  harnessElement,
                  {},
                  treeElement
                )
                const root = document.getElementById('root')
                window.ReactDOM.render(harness, root)
              } catch (error) {
                window.handleError(new ErrorEvent('RenderError', { error }))
              }
            }
          }

        </script>
      </body>
    </html>`
  }

  handleDOMContentLoaded = () => {
    const frame = this.getFrame(this.props)
    frame.renderComponentTree(true, true, true)
    this._isFrameDOMLoaded = true
  }

  handleError = (...args) => {
    const { onError } = this.props
    if (onError) {
      onError(...args)
    }
  }

  injectData = (frame, props) => {
    const { commonsChunk, bundles, harnessElement, tree } = props

    frame.handleError = this.handleError
    frame.handleDOMContentLoaded = this.handleDOMContentLoaded

    // Inject render data into the frame
    frame.__workflo_data = {
      harnessElement,
      commonsChunk,
      bundles,
      tree,
    }
  }

  renderFrameContents({ evaluateCommonsChunk, evaluateBundles, renderTree }) {
    if (!this._isMounted) {
      return
    }

    const doc = this.getDocument()
    if (doc && doc.readyState === 'complete') {
      if (doc.querySelector('div') === null) {
        this._isInitialContentSet = false
      }

      const frame = this.getFrame(this.props)
      this.injectData(frame, this.props)
      if (!this._isInitialContentSet) {
        doc.open('text/html', 'replace')
        doc.write(this.getInitialHTML())
        doc.close()

        this._isInitialContentSet = true
      }
      // Render the frame if the Frame's DOM has been loaded
      if (this._isFrameDOMLoaded) {
        frame.renderComponentTree(evaluateCommonsChunk, evaluateBundles, renderTree)
      }
    } else {
      setTimeout(
        this.renderFrameContents.bind(this, {
          evaluateCommonsChunk,
          evaluateBundles,
          renderTree,
        }),
        0
      )
    }
  }

  render() {
    const { name, theme } = this.props
    return <iframe ref={c => (this._frame = c)} {...theme.frame} name={name} />
  }
}

const defaultTheme = {
  frame: {
    border: 0,
    borderRadius: 0,
    display: 'block',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
}

const ThemedFrame = Theme('Frame', defaultTheme)(Frame)
export default ThemedFrame
