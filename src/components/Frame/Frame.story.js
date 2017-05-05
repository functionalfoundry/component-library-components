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
      if (xhr.readyState == XMLHttpRequest.DONE) {
        this.setState({ bundle: xhr.responseText })
      }
    }
    /** We need a bundle that has CORS enabled. I've created a ticket to do this with
     *  Google cloud storage. For now this needs to be served locally.
     */
    xhr.open('GET', 'http://127.0.0.1:8080/comment.js', true)
    xhr.send()
  }

  render() {
    const { bundle } = this.state

    return <Frame name="frame-1" bundle={bundle} React={React} ReactDOM={ReactDOM} />
  }
}
