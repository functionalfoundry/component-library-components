import React from 'react'
import ReactDOM from 'react-dom'
import { storiesOf } from '@kadira/storybook'
import { Preview, PreviewContainer } from '@workflo/components'
import Frame from './Frame'

storiesOf('Frame', module).add('New frame', () => <FetchAndRender />)

class FetchAndRender extends React.Component {
  constructor() {
    super()
    this.state = {
      bundle: '',
    }
  }

  componentWillMount() {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
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

  render() {
    const { bundle } = this.state
    const realizeComponentTree = implementationMap => {
      if (bundle === '') return <div />
      return <implementationMap.Loader />
    }

    return (
      <PreviewContainer>
        <Preview title="Frame">
          <Frame
            name="frame-1"
            realizeComponentTree={realizeComponentTree}
            bundleMap={{ Loader: bundle }}
            React={React}
            ReactDOM={ReactDOM}
            harnessElement={<HarnessComponent />}
          />
        </Preview>
      </PreviewContainer>
    )
  }
}

type HarnessComponentPropsT = {
  children: React.Children,
}

const HarnessComponent = ({ children }: HarnessComponentPropsT) => <div>{children}</div>
