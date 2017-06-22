// From https://github.com/ryanseddon/react-frame-component/blob/b4437e082dcf4a8521f1ac4218c0b5d2aed81350/src/Frame.jsx
import React from 'react'
import Theme from 'js-theme'

import ComponentTree from '../../modules/ComponentTree'

type BundlesT = Object<string, string>

type PropsT = {
  /**
   * Takes a map from component names to component functions / classes
   * and returns the composite component tree
   */
  tree: ComponentTree,
  /** Map from tree component IDs to bundle strings */
  bundles: BundlesT,
  /**
   * The React object to use inside the iFrame (in the future should
   * this be a string and get evaluated in the iFrame?)
   */
  React?: any,
  /** The ReactDOM object to use inside the iFrame */
  ReactDOM?: any,
  /** A unique ID for the iFrame */
  name: string,
  /** Harness element to render the component inside */
  harnessElement: React.Element<any>,
  /** Background color to use for the frame */
  backgroundColor: string,
  /** The theme for the frame */
  theme: Object,
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

  _isMounted: boolean
  _isInitialContentSet: boolean

  static initialContent = `
    <!DOCTYPE html>
    <html>
      <head></head>
      <body style="margin:0px; padding:0px;">
        <div id="root" />
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
                console.log('Bundle for', name, 'changed')
                implementations[name] = evaluateBundle(newBundles[name])
                bundles[name] = newBundles[name]
              }
            })

            window.bundles = bundles
            window.implementations = implementations
          }

          window.renderComponentTree = function () {
            const bundles = __workflo_data.bundles
            const harnessElement = __workflo_data.harnessElement
            const tree = __workflo_data.tree

            window.React = React
            window.ReactDOM = ReactDOM

            updateImplementations(bundles)

            const treeElement = realizeComponentTree(tree, window.implementations)
            const harness = React.cloneElement(harnessElement, {}, treeElement)
            const root = document.getElementById('root')
            ReactDOM.render(harness, root)
          }
        </script>
      </body>
    </html>`

  constructor(props, context) {
    super(props, context)

    this._isMounted = false
    this._isInitialContentSet = false
  }

  componentDidMount() {
    this._isMounted = true
    this.renderFrameContents()
  }

  componentDidUpdate() {
    this.renderFrameContents()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentWillReceiveProps(nextProps) {
    const frame = this.getFrame(nextProps)
    this.injectData(frame, nextProps)
    frame.renderComponentTree()
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

  injectData = (frame, props) => {
    const { bundles, harnessElement, React, ReactDOM, tree } = props

    // Inject React and React DOM into the frame
    frame.React = React
    frame.ReactDOM = ReactDOM

    // Inject render data into the frame
    frame.__workflo_data = {
      harnessElement,
      bundles,
      tree,
    }
  }

  renderFrameContents() {
    const { backgroundColor } = this.props

    if (!this._isMounted) {
      return
    }

    const doc = this.getDocument()
    if (doc && doc.readyState === 'complete') {
      if (doc.querySelector('div') === null) {
        this._isInitialContentSet = false
      }

      if (!this._isInitialContentSet) {
        doc.open('text/html', 'replace')
        doc.write(Frame.initialContent)
        doc.close()

        this._isInitialContentSet = true
      }

      const frame = this.getFrame(this.props)
      this.injectData(frame, this.props)

      // Render the frame ASAP
      frame.renderComponentTree()
    } else {
      setTimeout(this.renderFrameContents.bind(this), 0)
    }
  }

  render() {
    const { name, backgroundColor, theme } = this.props
    return <iframe ref={c => (this._frame = c)} {...theme.frame} name={name} />
  }
}

const defaultTheme = {
  frame: {
    border: 'none',
    borderRadius: 0,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
}

const ThemedFrame = Theme('Frame', defaultTheme)(Frame)
export default ThemedFrame
