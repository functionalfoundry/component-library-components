const properties = [
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

export const components = [
  {
    id: 1,
    name: 'Comment',
    owner: {
      firstName: 'Yaniv',
      lastName: 'Tal',
      profilePhoto: 'http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg',

    },
    properties,
  },
  {
    id: 2,
    name: 'Discussion Feed (w/ thumbnail)',
    owner: {
      firstName: 'Jannis',
      lastName: 'Pohlman',
      profilePhoto: 'http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg',
    },
    thumbnail: 'http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg',
    properties,
  },
  {
    id: 3,
    name: 'Calendar',
    owner: {
      firstName: 'Yaniv',
      lastName: 'Tal',
      profilePhoto: 'http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg',

    },
    properties,
  },
  {
    id: 4,
    name: 'Dropdown Menu',
    owner: {
      firstName: 'Jannis',
      lastName: 'Pohlman',
      profilePhoto: 'http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg',
    },
    properties,
  },
  {
    id: 5,
    name: 'Popover',
    owner: {
      firstName: 'Jannis',
      lastName: 'Pohlman',
      profilePhoto: 'http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg',
    },
    properties,
  },
]

export const dataCode =
`const user = {
  firstName: 'Brenda',
  lastName: 'Jenner',
}

const comment = {
  description: 'Something good',
}

const responders = [
  {
    firstName: 'Brenda',
    lastName: 'Jenner',
  },
  {
    firstName: 'Jenna',
    lastName: 'Doe',
  },
]`

export const actionsCode =
`const handleClick = () => {
  setState({ clicked: true })
}`

export const propKeyValues = [
  {
    key: 'comment',
    value: {
      type: 'JavaScript',
      value: 'comment',
    },
    options: [
      'comment',
      'description',
      'user',
    ],
    input: {
      type: 'Radio',
    },
  },
  {
    key: 'description',
    value: {
      type: 'JavaScript',
      value: 'description',
    },
    input: {
      type: 'TextInput',
    },
  },
  {
    key: 'size',
    value: {
      type: 'JavaScript',
      value: 'Base',
    },
    options: [
      'Tiny',
      'Small',
      'Base',
      'Large',
      'Huge',
    ],
    input: {
      type: 'Radio',
    },
  },
  {
    key: 'likeCount',
    value: {
      type: 'JavaScript',
      value: 2,
    },
    input: {
      type: 'Slider',
      start: 0,
      end: 100,
      step: 10,
    },
  },
]

export const componentStates = [
  {
    id: 23,
    name: 'Regular',
    propKeyValues,
    propMap: {
      comment: 'comment',
      description: 'description',
      size: 'base',
    },
  },
  {
    id: 24,
    name: 'With Publisher',
    propKeyValues,
    propMap: {
      comment: 'comment',
      description: 'description',
      size: 'base',
    },
  },
  {
    id: 25,
    name: 'With Attachment',
    propKeyValues,
    propMap: {
      comment: 'comment',
      description: 'description',
      size: 'base',
    },
  },
  {
    id: 26,
    name: 'With Replies',
    propKeyValues,
    propMap: {
      comment: 'comment',
      description: 'description',
      size: 'base',
    },
  },
]
