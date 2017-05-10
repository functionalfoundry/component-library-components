// From https://github.com/ryanseddon/react-frame-component/blob/b4437e082dcf4a8521f1ac4218c0b5d2aed81350/src/Frame.jsx
import React from 'react'
import ReactDOM from 'react-dom'
import Theme from 'js-theme'

type BundleMapT = Map<string, string>
type ImplementationMapT = Map<string, React.Element<any>>

type PropsT = {
  /** Takes a map from component names to component functions / classes and returns the composite component tree */
  realizeComponentTree: ImplementationMapT => React.Element<any>,
  /** Map from component names to bundle strings */
  bundleMap: BundleMapT,
  /** The React object to use inside the iFrame (in the future should this be a string and get evaluated in the iFrame?) */
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
 * Evaluates and renders a React component in isolation given a particular version of
 * React and React DOM.
 */
class Frame extends React.Component {
  props: PropsT

  static initialContent = `
    <!DOCTYPE html><html>
      <head></head>
      <body>
        <div id="root" />
        <script>
          // Needed for evaluating bundles
          window.production = 'production';

          var root = document.getElementById('root')
          function renderComponentTree() {
            var realizeComponentTree = __workflo_data.realizeComponentTree;
            var harnessElement = __workflo_data.harnessElement;
            var bundleMap = __workflo_data.bundleMap;
            var implementationMap = Object.keys(bundleMap).map(function(key) {
              var exported = eval(bundleMap[key])
              if (!exported) return [key, function(){}]
              return [key, exported.default]
            }).reduce(function(acc, val) {
              acc[val[0]] = val[1];
              return acc;
            }, {});
            var element = React.cloneElement(harnessElement, {
              children: realizeComponentTree(implementationMap),
            });
            
            ReactDOM.render(element, root);
          }
          window.renderComponentTree = renderComponentTree;
        </script>
      </body>
    </html>`

  constructor(props, context) {
    super(props, context)
    this._isMounted = false
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
    const { harnessElement, realizeComponentTree, bundleMap } = nextProps
    const frame = window.frames[nextProps.name]
    frame.__workflo_data = {
      harnessElement,
      realizeComponentTree,
      bundleMap,
    }
    frame.renderComponentTree()
  }

  /**
   * Returns the iFrame's document
   */
  getDoc() {
    return ReactDOM.findDOMNode(this).contentDocument // eslint-disable-line
  }

  renderFrameContents() {
    const { name, harnessElement, realizeComponentTree, bundleMap } = this.props
    if (!this._isMounted) {
      return
    }

    const doc = this.getDoc()
    if (doc && doc.readyState === 'complete') {
      if (doc.querySelector('div') === null) {
        this._setInitialContent = false
      }

      const initialRender = !this._setInitialContent

      if (initialRender) {
        doc.open('text/html', 'replace')
        doc.write(Frame.initialContent)
        doc.close()
        this._setInitialContent = true
        const frame = window.frames[name]
        frame.React = React
        frame.ReactDOM = ReactDOM
        frame.__workflo_data = {
          harnessElement,
          realizeComponentTree,
          bundleMap,
        }
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
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // transformOrigin: 'top left',
  },
}

const ThemedFrame = Theme('Frame', defaultTheme)(Frame)
export default ThemedFrame
