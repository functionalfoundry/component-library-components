import { configure } from '@kadira/storybook'

function loadStories () {
  require('../src/App/App.story.js')
  // require('../src/ComponentList/ComponentList.story.js')
  // require('../src/ComponentStateList/ComponentStateList.story.js')
  // require('../src/LiveView/LiveView.story.js')
  // require('../src/ComponentStateCard/ComponentStateCard.story.js')
  // require('../src/ComponentCard/ComponentCard.story.js')
}

configure(loadStories, module)
