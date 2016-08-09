export const liveViewState = {
  component: {
    owner: {
      name: '',
      profilePhoto: '',
    },
    thumbnail: 'http://res.cloudinary.com/workflo/image/upload/v1469299730/comment-regular_yexhv7.png',
    props: [
      {
        name: 'auto',
        type: 'Boolean',
        default: 'true',
        description: 'If true, the dropdown will open up or down depending on the position in the screen.',
      }
    ],
  },
  componentState: {
    propKeyValues: [
      {
        prop: 'auto',
        value: true,
      }
    ],
  },
}
