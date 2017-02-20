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

export const componentTree = {
  id: 'example-component',
  name: 'ExampleComponent',
  props: [
    {
      name: 'comment',
      value: {
        value: 'comment',
      },
    },
    {
      name: 'description',
      value: {
        value: 'description',
      },
    },
    {
      name: 'size',
      value: {
        value: 'Base',
        type: 'string',
      }
    },
    {
      name: 'likeCount',
      value: {
        value: 2,
        type: 'number',
      },
    },
  ]
}

export const componentStates = [
  {
    id: 23,
    name: 'Regular',
    componentTree,
    propMap: {
      comment: 'comment',
      description: 'description',
      size: 'base',
    },
  },
  {
    id: 24,
    name: 'With Publisher',
    componentTree,
    propMap: {
      comment: 'comment',
      description: 'description',
      size: 'base',
    },
  },
  {
    id: 25,
    name: 'With Attachment',
    componentTree,
    propMap: {
      comment: 'comment',
      description: 'description',
      size: 'base',
    },
  },
  {
    id: 26,
    name: 'With Replies',
    componentTree,
    propMap: {
      comment: 'comment',
      description: 'description',
      size: 'base',
    },
  },
]
