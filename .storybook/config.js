import { configure } from '@kadira/storybook'

function loadStories () {
  // require('../src/App/App.story.js')
  require('../src/ComponentGrid/ComponentGrid.story.js')
  require('../src/ComponentStateList/ComponentStateList.story.js')
  require('../src/LiveEditor/LiveEditor.story.js')
  require('../src/LiveView/LiveView.story.js')
  require('../src/ComponentCard.story.js')
  require('../src/ComponentStateCard.story.js')
  require('../src/Search.story.js')
  require('../src/Header.story.js')
  require('../src/Code/Code.story.js')
  require('../src/Data/Data.story.js')
  require('../src/FocusedView.story.js')
}

configure(loadStories, module)
