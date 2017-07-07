const ActionButton = require('./components/ActionButton')
const App = require('./components/App')
const App2 = require('./components/App2')
const AppShell = require('./components/AppShell')
const BranchDropdown = require('./components/BranchDropdown')
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
import Layout from './components/Layout'
const LiveEditor = require('./components/LiveEditor')
const LivePreview = require('./components/LivePreview')
const MultiPropertiesTable = require('./components/MultiPropertiesTable')
const OrganizationChooser = require('./components/OrganizationChooser')
const OrganizationSignIn = require('./components/OrganizationSignIn')
const Panel = require('./components/Panel')
const PanelHeader = require('./components/PanelHeader')
const PanelContent = require('./components/PanelContent')
const Preferences = require('./components/Preferences')
const RepoPreferences = require('./components/RepoPreferences')
const ThemePreferences = require('./components/ThemePreferences')
const ProjectPane = require('./components/ProjectPane')
const Properties = require('./components/Properties')
const QuickAction = require('./components/QuickAction')
const QuickActionButton = require('./components/QuickActionButton')
const QuickActionSelection = require('./components/QuickActionSelection')
const RepositoryChooser = require('./components/RepositoryChooser')
const RotateFade = require('./components/RotateFade')
const ScrollableContent = require('./components/ScrollableContent')
const Search = require('./components/Search')
const StaggerChildren = require('./components/StaggerChildren')
const SubHeader = require('./components/SubHeader')
const WalkthroughStep = require('./components/WalkthroughStep')

// Components forwarded from @workflo/components
const Button = require('./components/Button')

import actionsPlugin from './utils/ActionsBabelPlugin'
import dataPlugin from './utils/DataBabelPlugin'

const WorkfloComponents = {
  ActionButton,
  App,
  App2,
  AppShell,
  BranchDropdown,
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
  Layout,
  LiveEditor,
  LivePreview,
  RotateFade,
  MultiPropertiesTable,
  OrganizationChooser,
  Panel,
  PanelHeader,
  PanelContent,
  ProjectPane,
  OrganizationSignIn,
  Preferences,
  RepoPreferences,
  ThemePreferences,
  Properties,
  QuickAction,
  QuickActionButton,
  QuickActionSelection,
  RepositoryChooser,
  ScrollableContent,
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
