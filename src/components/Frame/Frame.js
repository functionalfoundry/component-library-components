// From https://github.com/ryanseddon/react-frame-component/blob/b4437e082dcf4a8521f1ac4218c0b5d2aed81350/src/Frame.jsx
import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'

import { ComponentTree } from '../../utils/CompositeComponents/ComponentTree'

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
  /** The theme for the frame */
  theme: Object,
}

/**
 * State
 */

type StateT = {
  isMounted: boolean,
  isInitialContentSet: boolean,
}

/**
 * Evaluates and renders a React component in isolation given a particular version of
 * React and React DOM.
 */
class Frame extends React.Component {
  props: PropsT
  state: StateT

  static initialContent = `
    <!DOCTYPE html><html>
      <head></head>
      <body style="margin:0px; padding:0px">
        <div id="root" />
        <script>
          // Needed for evaluating bundles
          window.production = 'production'

          function evaluateBundles (bundles) {
            return Object.keys(bundles).reduce(function (out, key) {
              const evaluated = eval(bundles[key] || '') // eslint-disable-line no-eval
              const result = (evaluated && (evaluated.default || evaluated)) || null
              out[key] = result
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
              return component.children.map(function (child) {
                return realizeComponent(child)
              })
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

          window.renderComponentTree = function () {
            const bundles = __workflo_data.bundles
            const harnessElement = __workflo_data.harnessElement
            const tree = __workflo_data.tree

            window.React = React
            window.ReactDOM = ReactDOM

            const implementations = evaluateBundles(bundles)
            const treeElement = realizeComponentTree(tree, implementations)
            const harness = React.cloneElement(harnessElement, {
              children: treeElement,
            })
            const root = document.getElementById('root')
            ReactDOM.render(harness, root)
          }
        </script>
      </body>
    </html>`

  constructor(props, context) {
    super(props, context)
    this.state = {
      isMounted: false,
      isInitialContentSet: false,
    }
  }

  componentDidMount() {
    this.setState({ isMounted: true })
    this.renderFrameContents()
  }

  componentDidUpdate() {
    this.renderFrameContents()
  }

  componentWillUnmount() {
    this.setState({ isMounted: false })
  }

  componentWillReceiveProps(nextProps) {
    const { bundles, harnessElement, React, ReactDOM, tree } = nextProps

    const frame = window.frames[nextProps.name]

    // Inject React and React DOM into the frame
    frame.React = React
    frame.ReactDOM = ReactDOM

    // Inject render data into the frame
    frame.__workflo_data = {
      harnessElement,
      bundles,
      tree,
    }

    frame.renderComponentTree()
  }

  /**
   * Returns the iFrame's document
   */
  getDocument() {
    const node = ReactDOM.findDOMNode(this)
    if (node !== null) {
      return node.contentDocument // eslint-disable-line
    } else {
      return undefined
    }
  }

  renderFrameContents() {
    const { bundles, harnessElement, name, React, ReactDOM, tree } = this.props
    const { isMounted } = this.state
    let { isInitialContentSet } = this.state

    if (!isMounted) {
      return
    }

    const doc = this.getDocument()
    if (doc !== undefined && doc.readyState === 'complete') {
      if (doc.querySelector('div') === null) {
        isInitialContentSet = false
      }

      if (!isInitialContentSet) {
        doc.open('text/html', 'replace')
        doc.write(Frame.initialContent)
        doc.close()

        this.setState({ isInitialContentSet: true })

        const frame = window.frames[name]

        // Inject React and React DOM into the frame
        frame.React = React
        frame.ReactDOM = ReactDOM

        // Inject render data into the frame
        frame.__workflo_data = {
          harnessElement,
          bundles,
          tree,
        }

        // Render the frame ASAP
        setTimeout(() => {
          frame.renderComponentTree()
        })
      }
    } else {
      setTimeout(this.renderFrameContents.bind(this), 0)
    }
  }

  render() {
    const { name, theme } = this.props
    return <iframe {...theme.frame} name={name} />
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
