// From https://github.com/ryanseddon/react-frame-component/blob/b4437e082dcf4a8521f1ac4218c0b5d2aed81350/src/Frame.jsx
import React from 'react'
import ReactDOM from 'react-dom'

type PropsT = {
  /* A packaged bundle that evaluates to an ES6 Module with a single default export for the React component */
  bundle: string,
  /* The React object to use inside the iFrame (in the future should this be a string and get evaluated in the iFrame?) */
  React?: any,
  /* The ReactDOM object to use inside the iFrame */
  ReactDOM?: any,
  /* A unique ID for the iFrame */
  name: String,
}

/**
 * Evaluates and renders a React component in isolation given a particular version of
 * React and React DOM.
 */
export default class Frame extends React.Component {
  props: PropsT

  static initialContent = `
    <!DOCTYPE html><html>
      <head></head>
      <body>
        <div id="root" />
        <script>
          var root = document.getElementById('root')
          function updateBundle(bundle) {
            var evaluated = eval(bundle)
            var Component = evaluated.default || evaluated
            var element = React.createElement(Component, {})
            ReactDOM.render(element, root)
          }
          // If the bundle is ready immediately the iframe needs to wait a tick
          function renderInitialBundle(bundle) {
            setTimeout(function(){updateBundle(bundle)})
          }
          window.updateBundle = updateBundle
          window.renderInitialBundle = renderInitialBundle
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
    if (nextProps.bundle !== this.props.bundle) {
      const frame = window.frames[nextProps.name]
      frame.updateBundle(nextProps.bundle)
    }
  }

  /**
   * Returns the iFrame's document
   */
  getDoc() {
    return ReactDOM.findDOMNode(this).contentDocument // eslint-disable-line
  }

  renderFrameContents() {
    const { name, bundle } = this.props
    if (!this._isMounted) {
      return
    }

    const doc = this.getDoc()
    if (doc && doc.readyState === 'complete') {
      if (doc.querySelector('div') === null) {
        this._setInitialContent = false
      }

      const win = doc.defaultView || doc.parentView
      const initialRender = !this._setInitialContent

      if (initialRender) {
        doc.open('text/html', 'replace')
        doc.write(Frame.initialContent)
        doc.close()
        this._setInitialContent = true
        const frame = window.frames[name]
        frame.React = React
        frame.ReactDOM = ReactDOM
        if (bundle) {
          frame.renderInitialBundle(bundle)
        }
      }
    } else {
      setTimeout(this.renderFrameContents.bind(this), 0)
    }
  }

  render() {
    const { name } = this.props
    return (
      <iframe
        name={name}
        style={{
          border: 'none',
          borderRadius: 0,
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
        }}
      />
    )
  }
}
