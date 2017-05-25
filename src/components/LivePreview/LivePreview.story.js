import React from 'react'
import ReactDOM from 'react-dom'
import { storiesOf } from '@kadira/storybook'
import LivePreview from './LivePreview'

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
    return (
      <div
        style={{
          height: '400px',
          width: '400px',
          border: 'thin solid grey',
          display: 'flex',
          margin: '2em',
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
