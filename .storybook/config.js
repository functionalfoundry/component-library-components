import { configure } from '@kadira/storybook'
import './grommet.css'
import './draft.css'
import './prism.css'
import './editor.css'

function loadStories () {
  require('../src/ComponentList/ComponentList.story.js')
  require('../src/ComponentStateList/ComponentStateList.story.js')
  // require('../src/ComponentStateCard/ComponentStateCard.story.js')
  // require('../src/ComponentCard/ComponentCard.story.js')
  require('../src/LiveView/LiveView.story.js')
  require('../src/Header/Header.story.js')
  require('../src/App/App.story.js')
}

configure(loadStories, module)
