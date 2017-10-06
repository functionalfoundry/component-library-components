import React from 'react'
import { action, storiesOf } from '@kadira/storybook'
import { Preview, PreviewContainer } from '@workflo/components'
import Frame from './Frame'

import { Helpers as ComponentTreeHelpers } from '../../modules/ComponentTree'

// storiesOf('Frame', module).add('New frame', () => <FetchAndRender />)

export const rawExampleTree = {
  id: 'badge',
  name: 'Badge',
  props: [
    {
      id: '1',
      name: 'count',
      value: {
        value: 50,
        type: 'number',
      },
    },
  ],
  children: [
    {
      id: 'loader',
      name: 'Loader',
      props: [
        {
          id: '2',
          name: 'color',
          value: {
            value: 'Secondary',
            type: 'union',
          },
        },
      ],
    },
  ],
}

export const exampleTree = ComponentTreeHelpers.createTree(rawExampleTree)

export const BADGE_URL = 'https://storage.googleapis.com/component-bundles/Badge.js'
export const LOADER_URL = 'https://storage.googleapis.com/component-bundles/Loader.js'
export const SLIDER_URL = 'https://storage.googleapis.com/component-bundles/Slider.js'

class FetchAndRender extends React.Component {
  constructor() {
    super()
    this.state = {
      badge: null,
      loader: null,
    }
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
    const { badge, loader } = this.state
    return (
      <PreviewContainer>
        <Preview title="Frame">
          {badge &&
            loader &&
            <Frame
              bundles={badge && loader ? { badge, loader } : null}
              harnessElement={<HarnessComponent />}
              onError={action('onError')}
              name="frame-1"
              tree={exampleTree}
            />}
        </Preview>
      </PreviewContainer>
    )
  }
}

type HarnessComponentPropsT = {
  children: React.Children,
}

const HarnessComponent = ({ children }: HarnessComponentPropsT) =>
  <div>
    {children}
  </div>
