import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ComponentList from '.'

const components = [
  {
    name: 'Listing Card',
    owner: 'Yaniv Tal',
    thumbnail: 'http://placehold.it/380x380',
  },
  {
    name: 'Listing List',
    owner: 'Yaniv Tal',
    thumbnail: 'http://placehold.it/380x380',
  },
  {
    name: 'Host View',
    owner: 'Jannis Pohlman',
    thumbnail: 'http://placehold.it/380x380',
  },
  {
    name: 'Host View',
    owner: 'Jannis Pohlman',
    thumbnail: 'http://placehold.it/380x380',
  },
  {
    name: 'Host View',
    owner: 'Jannis Pohlman',
    thumbnail: 'http://placehold.it/380x380',
  },
]

storiesOf('Component List', module)
  .add('Regular', () => (
    <ComponentList
      components={components}
    />
  ))
