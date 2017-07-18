export const liveViewState = {
  component: {
    id: 2425,
    name: 'Comment',
    owner: {
      firstName: '',
      lastName: '',
      profilePhoto: '',
    },
    properties: [
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
      {
        name: 'anotherTime',
        type: 'Date',
        default: '',
        description: 'The date the comment was made. Displayed as time ago.',
      },
      {
        name: 'anotherDescription',
        type: 'String',
        default: '',
        description: 'The actual comment text.',
      },
      {
        name: 'moreTopics',
        type: 'Array<Topic>',
        default: '',
        description: 'A list of topic objects to display.',
      },
    ],
  },
  componentState: {
    id: 2535,
    name: 'Regular',
    propKeyValues: [
      {
        key: 'description',
        options: ['description1', 'description2'],
        value: 'description1',
        inputType: 'Radio',
      },
    ],
  },
}
