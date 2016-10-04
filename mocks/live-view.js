export const liveViewState = {
  component: {
    owner: {
      name: '',
      profilePhoto: '',
    },
    thumbnail: 'http://res.cloudinary.com/workflo/image/upload/v1469299730/comment-regular_yexhv7.png',
    props: [
      {
        name: 'title',
        type: 'String',
        default: '',
        description: 'The comment title that renders with a link',
      },
      {
        name: 'time',
        type: 'Date',
        default: '',
        description: 'The date the comment was made. Displayed as time ago.',
      },
      {
        name: 'description',
        type: 'String',
        default: '',
        description: 'The actual comment text.',
      },
      {
        name: 'topics',
        type: 'Array<Topic>',
        default: '',
        description: 'A list of topic objects to display.',
      },
    ],
  },
  componentState: {
    code: "<Comment\n  comment={comment}\n  description={description}\n  size=\'medium\'\n  likeCount={21}\n/>",
    propKeyValues: [
      {
        prop: 'auto',
        value: true,
      }
    ],
  },
}
