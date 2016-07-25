export const components = [
  {
    id: 1,
    name: 'Listing Card',
    owner: 'Yaniv Tal',
    thumbnail: 'http://placehold.it/500x500',
  },
  {
    id: 2,
    name: 'Listing List',
    owner: 'Yaniv Tal',
    thumbnail: 'http://placehold.it/500x500',
  },
  {
    id: 3,
    name: 'Host View',
    owner: 'Jannis Pohlman',
    thumbnail: 'http://placehold.it/500x500',
  },
  {
    id: 4,
    name: 'Host Settings',
    owner: 'Jannis Pohlman',
    thumbnail: 'http://placehold.it/500x500',
  },
  {
    id: 5,
    name: 'Host List',
    owner: 'Jannis Pohlman',
    thumbnail: 'http://placehold.it/500x500',
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

export const states = [
  {
    id: 23,
    name: 'Regular',
    thumbnail: 'http://placehold.it/300x200',
  },
  {
    id: 24,
    name: 'About to sell out',
    thumbnail: 'http://placehold.it/300x200',
  },
  {
    id: 25,
    name: 'Preferred',
    thumbnail: 'http://placehold.it/300x200',
  },
  {
    id: 26,
    name: 'Unverified',
    thumbnail: 'http://placehold.it/300x200',
  },
]
