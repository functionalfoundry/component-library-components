export const components = [
  {
    id: 1,
    name: 'Comment',
    owner: 'Yaniv Tal',
    profilePhoto: 'http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg',
    thumbnail: 'http://res.cloudinary.com/workflo/image/upload/v1469299730/comment-regular_yexhv7.png',
  },
  {
    id: 2,
    name: 'Discussion Feed',
    owner: 'Jannis Pohlman',
    profilePhoto: 'http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg',
    thumbnail: 'http://res.cloudinary.com/workflo/image/upload/v1469299730/discussion-feed-regular_keicrt.png',
  },
  {
    id: 3,
    name: 'Calendar',
    owner: 'Yaniv Tal',
    profilePhoto: 'http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg',
    thumbnail: 'http://res.cloudinary.com/workflo/image/upload/v1469299730/calendar-regular_kucscj.png',
  },
  {
    id: 4,
    name: 'Dropdown Menu',
    owner: 'Jannis Pohlman',
    profilePhoto: 'http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg',
    thumbnail: 'http://res.cloudinary.com/workflo/image/upload/v1469816905/dropdown-menu-double-icon-left-right_tujd6v.png',
  },
  {
    id: 5,
    name: 'Popover',
    owner: 'Jannis Pohlman',
    profilePhoto: 'http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg',
    thumbnail: 'http://res.cloudinary.com/workflo/image/upload/v1469816906/popover-success_dfgcda.png',
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
    thumbnail: 'http://res.cloudinary.com/workflo/image/upload/v1469299730/comment-regular_yexhv7.png',
  },
  {
    id: 24,
    name: 'With Publisher',
    thumbnail: 'http://res.cloudinary.com/workflo/image/upload/v1469299730/comment-with-publisher_tu9k8u.png',
  },
  {
    id: 25,
    name: 'With Attachment',
    thumbnail: 'http://res.cloudinary.com/workflo/image/upload/v1469299730/comment-with-attachment_cuiwpi.png',
  },
  {
    id: 26,
    name: 'With Replies',
    thumbnail: 'http://res.cloudinary.com/workflo/image/upload/v1469299730/comment-with-replies_nxbf5x.png',
  },
]
