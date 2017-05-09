import React from 'react'
import ReactDOM from 'react-dom'
import { storiesOf } from '@kadira/storybook'
import LivePreview from './LivePreview'
import { Preview, PreviewContainer } from '@workflo/components'

class FetchAndRender extends React.Component {
  constructor() {
    super()
    this.state = {
      bundle: '',
      zoom: 100,
    }
  }

  componentWillMount() {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        this.setState({ bundle: xhr.responseText })
      }
    }
    /** We need a bundle that has CORS enabled. I've created a ticket to do this with
     *  Google cloud storage. For now this needs to be served locally.
     */
    xhr.open(
      'GET',
      'https://storage.googleapis.com/component-bundles/157e1b3ed5f3d585906fbc5f40f78f3656eae31889769c8221a021c227d0149a.Loader.js',
      true
    )
    xhr.send()
  }

  handleChangeZoom = zoom => {
    this.setState(() => ({
      zoom,
    }))
  }

  render() {
    const { bundle, zoom } = this.state
    const realizeComponentTree = implementationMap => {
      if (bundle === '') return <div />
      return <implementationMap.Loader />
    }

    return (
      <LivePreview
        name="frame-1"
        realizeComponentTree={realizeComponentTree}
        bundleMap={{ Loader: bundle }}
        React={React}
        ReactDOM={ReactDOM}
        alignment="Center"
        backgroundColor="cyan"
        zoom={zoom}
        onChangeZoom={this.handleChangeZoom}
      />
    )
  }
}

// const MyComponent = () => (
//   <div style={{ backgroundColor: 'magenta', height: 100, display: 'flex' }}>
//     Hello
//   </div>
// )

// class MyFailingComponent extends React.Component {
//   render () {
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
//   .add('Failing component', () => (
//     <PreviewContainer>
//       <div
//         style={previewStyle}
//         label='Failing component'
//       >
//         <LivePreview
//           element={failingElement}
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

storiesOf('LivePreview', module).add('Default', () => <FetchAndRender />)
