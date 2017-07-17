import React from 'react'
import ReactDOM from 'react-dom'
import { storiesOf } from '@kadira/storybook'
import LivePreview from './LivePreview'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'

import { BADGE_URL, LOADER_URL, rawExampleTree } from '../Frame/Frame.story'

class FetchAndRender extends React.Component {
  constructor() {
    super()
    this.state = {
      badge: null,
      loader: null,
      zoom: 100,
    }
  }

  handleChangeZoom = zoom => {
    this.setState(() => ({
      zoom,
    }))
  }

  fetchBadge = () => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.setState({ badge: xhr.responseText })
      }
    }
    xhr.open('GET', BADGE_URL, true)
    xhr.send()
  }

  fetchLoader = () => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.setState({ loader: xhr.responseText })
      }
    }
    xhr.open('GET', LOADER_URL, true)
    xhr.send()
  }

  componentWillMount() {
    this.fetchBadge()
    this.fetchLoader()
  }

  render() {
    const { badge, loader, zoom } = this.state
    const { error } = this.props
    return (
      <div
        style={{
          height: '300px',
          width: '400px',
          border: 'thin solid grey',
          display: 'flex',
          margin: '2em',
          position: 'absolute',
        }}
      >
        <LivePreview
          name="frame-1"
          tree={rawExampleTree}
          bundles={{ badge, loader }}
          React={React}
          ReactDOM={ReactDOM}
          alignment={{
            horizontal: 'Center',
            vertical: 'Center',
          }}
          backgroundColor="cyan"
          zoom={zoom}
          onChangeZoom={this.handleChangeZoom}
          error={error}
        />
      </div>
    )
  }
}

// const MyComponent = () => (
//   <div style={{ backgroundColor: 'magenta', height: 100, display: 'flex' }}>
//     Hello
//   </div>
// )

// class MyFailingComponent extends React.Component {
//   render() {
//     throw Error('This failed')
//   }
// }

// const exampleElement = (
//   <div style={{
//     background: 'white',
//     border: 'thin solid grey',
//     padding: '2em',
//     color: 'black',
//   }}>
//     Some element
//   </div>
// )

// const failingElement = <MyFailingComponent />

// storiesOf('LivePreview', module)
//   .add('Regular', () => (
//     <PreviewContainer>
//       <div
//         style={previewStyle}
//         label='Regular'
//       >
//         <LivePreview
//           element={exampleElement}
//           alignment='Center'
//           backgroundColor='cyan'
//         />
//       </div>
//     </PreviewContainer>
//   ))

//   .add('No props', () => (
//     <PreviewContainer>
//       <div
//         style={previewStyle}
//         label='Failing component'
//       >
//         <LivePreview />
//       </div>
//     </PreviewContainer>
//   ))

// const previewStyle = {
//   height: 300,
//   backgroundColor: 'cyan',
//   display: 'flex',
//   flexDirection: 'column',
// }

storiesOf('LivePreview', module)
  .add('Default', () => <FetchAndRender />)
  .add('With error', () => (
    <FetchAndRender
      error={{
        message: "Cannot read property 'length' of undefined and other errors happening",
        stacktrace: `TypeError: Cannot read property 'length' of undefined
at Steps.render (eval at evaluateBundle (:6:31), <anonymous>:13079:29)
at p._renderValidatedComponentWithoutOwnerOrContext (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:10750)
at p._renderValidatedComponent (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:10877)
at performInitialMount (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:6696)
at p.mountComponent (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:5742)
at Object.mountComponent (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:92:18733)
at performInitialMount (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:6856)
at p.mountComponent (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:5742)
at Object.mountComponent (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:92:18733)
at h.mountChildren (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:92:15330)
at h._createInitialChildren (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:19457)
at h.mountComponent (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:17601)`,
      }}
    />
  ))
// .add('Failing component', () => (
//   <PreviewContainer>
//     <div style={previewStyle} label="Failing component">
//       <LivePreview element={failingElement} alignment="Center" backgroundColor="cyan" />
//     </div>
//   </PreviewContainer>
// ))
