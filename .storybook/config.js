import { configure } from '@kadira/storybook'

function loadStories() {
  require('../src/components/App/App.story.js')
  require('../src/components/App2/App2.story.js')
  require('../src/components/AnimationDemo/AnimationDemo.story.js')
  require('../src/components/BulkActionBar/BulkActionBar.story.js')
  require('../src/components/Code/Code.story.js')
  require('../src/components/Data/Data.story.js')
  require('../src/components/ErrorView/ErrorView.story.js')
  require('../src/components/Frame/Frame.story.js')
  require('../src/components/LiveCanvas/LiveCanvas.story.js')
  require('../src/components/LiveEditor/LiveEditor.story.js')
  require('../src/components/LiveView/LiveView.story.js')
  require('../src/components/LivePreview/LivePreview.story.js')
  require('../src/components/Header/Header.story.js')
  require('../src/components/ComponentEntrance/ComponentEntrance.story.js')
  require('../src/components/ComponentExit/ComponentExit.story.js')
  require('../src/components/ComponentState/ComponentState.story.js')
  require('../src/components/Component/Component.story.js')
  require('../src/components/Components/Components.story.js')
  require('../src/components/ComponentStates/ComponentStates.story.js')
  require('../src/components/ComponentTreeEditor/ComponentTreeEditor.story.js')
  require('../src/components/QuickAction/QuickAction.story.js')
  require('../src/components/MultiPropertiesTable/MultiPropertiesTable.story.js')
  require('../src/components/RotateFade/RotateFade.story.js')
  require('../src/components/StaggerChildren/StaggerChildren.story.js')
  require('../src/components/Configuration/Configuration.story.js')
  require('../src/components/OrganizationChooser/OrganizationChooser.story.js')
  require('../src/components/RepositoryChooser/RepositoryChooser.story.js')
  require('../src/components/Preferences/Preferences.story.js')
  require('../src/components/WalkthroughDialog/WalkthroughDialog.story.js')
}

configure(loadStories, module)
