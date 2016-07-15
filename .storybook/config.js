import { configure } from '@kadira/storybook'
import './grommet.css'
import './draft.css'
import './prism.css'
import './editor.css'


function loadStories () {
  require('../src/ComponentCard/ComponentCard.story.js')
  require('../src/ComponentList/ComponentList.story.js')
  require('../src/App/App.story.js')
  require('../src/LiveView/LiveView.story.js')
}

configure(loadStories, module)
