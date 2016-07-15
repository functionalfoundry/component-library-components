export const components = [
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
]

export const properties = [
  {
    name: 'listing',
    type: 'object',
    default: '{}',
    description: 'The listing entity',
  },
  {
    name: 'host',
    type: 'object',
    default: '{}',
    description: 'The host object with id, name, profilePhoto',
  }
]