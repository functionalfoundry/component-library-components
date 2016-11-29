import { configure } from '@kadira/storybook'

function loadStories () {
  require('../src/components/App/App.story.js')
  require('../src/components/Code/Code.story.js')
  require('../src/components/Data/Data.story.js')
  require('../src/components/LiveEditor/LiveEditor.story.js')
  require('../src/components/LiveView/LiveView.story.js')
  require('../src/components/Header/Header.story.js')
  require('../src/components/ComponentState/ComponentState.story.js')
  require('../src/components/Component/Component.story.js')
}

configure(loadStories, module)
