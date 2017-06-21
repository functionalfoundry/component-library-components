const App = require('./components/App')
const App2 = require('./components/App2')
const AppShell = require('./components/AppShell')
const BulkActionBar = require('./components/BulkActionBar')
const Code = require('./components/Code')
const Configuration = require('./components/Configuration')
const Component = require('./components/Component')
const Components = require('./components/Components')
const ComponentsLeftNav = require('./components/ComponentsLeftNav')
const ComponentEntrance = require('./components/ComponentEntrance')
const ComponentExit = require('./components/ComponentExit')
const ComponentLibraryHeader = require('./components/ComponentLibraryHeader')
const ComponentState = require('./components/ComponentState')
const ComponentStates = require('./components/ComponentStates')
const ComponentTreeEditor = require('./components/ComponentTreeEditor')
const Data = require('./components/Data')
const ErrorView = require('./components/ErrorView')
const Header = require('./components/Header')
const LiveEditor = require('./components/LiveEditor')
const LivePreview = require('./components/LivePreview')
const MultiPropertiesTable = require('./components/MultiPropertiesTable')
const OrganizationChooser = require('./components/OrganizationChooser')
const Preferences = require('./components/Preferences')
const RepoPreferences = require('./components/RepoPreferences')
const ThemePreferences = require('./components/ThemePreferences')
const Properties = require('./components/Properties')
const QuickAction = require('./components/QuickAction')
const RepositoryChooser = require('./components/RepositoryChooser')
const RotateFade = require('./components/RotateFade')
const Search = require('./components/Search')
const StaggerChildren = require('./components/StaggerChildren')
const SubHeader = require('./components/SubHeader')
const WalkthroughStep = require('./components/WalkthroughStep')

// Components forwarded from @workflo/components
const Button = require('./components/Button')

import actionsPlugin from './utils/ActionsBabelPlugin'
import dataPlugin from './utils/DataBabelPlugin'

const WorkfloComponents = {
  App,
  App2,
  AppShell,
  BulkActionBar,
  Button,
  Code,
  Configuration,
  Component,
  Components,
  ComponentsLeftNav,
  ComponentEntrance,
  ComponentExit,
  ComponentLibraryHeader,
  ComponentState,
  ComponentStates,
  ComponentTreeEditor,
  Data,
  ErrorView,
  Header,
  LiveEditor,
  LivePreview,
  RotateFade,
  MultiPropertiesTable,
  OrganizationChooser,
  Preferences,
  RepoPreferences,
  ThemePreferences,
  Properties,
  QuickAction,
  RepositoryChooser,
  Search,
  StaggerChildren,
  SubHeader,
  WalkthroughStep,
}

module.exports = WorkfloComponents

window.workflo = window.workflo || {}
window.workflo.componentLibrary = window.workflo.componentLibrary || {}
window.workflo.componentLibrary.liveView = window.workflo.componentLibrary.liveView || {}
window.workflo.componentLibrary.liveView.babelPlugins = {
  actionsPlugin,
  dataPlugin,
}
