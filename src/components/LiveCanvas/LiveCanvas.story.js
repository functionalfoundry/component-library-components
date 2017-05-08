import React from 'react'
import ReactDOM from 'react-dom'
import { storiesOf } from '@kadira/storybook'
import { Preview, PreviewContainer } from '@workflo/components'
import LiveCanvas from './LiveCanvas'
import Components from '../Components'
import { components } from '../../../mocks/components'

storiesOf('LiveCanvas', module)
  .add('Default', () => <Container />)
  .add('50 Zoom', () => <Container zoom={50} />)
  .add('125 Zoom', () => <Container zoom={125} panY={100} />)

class Container extends React.Component {
  constructor(props) {
    super()
    this.state = {
      bundle: '',
      zoom: props.zoom,
    }
  }

  handleChangeZoom = zoom => {
    this.setState(() => ({
      zoom,
    }))
  }

  render() {
    const { bundle, zoom, panX, panY } = this.state

    return (
      <LiveCanvas
        zoom={zoom}
        onChangeZoom={this.handleChangeZoom}
        panX={panX}
        panY={panY}
      >
        <Components components={components} />
      </LiveCanvas>
    )
  }
}
