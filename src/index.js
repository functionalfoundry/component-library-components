const App = require('./components/App')
const Code = require('./components/Code')
const Configuration = require('./components/Configuration')
const Component = require('./components/Component')
const Components = require('./components/Components')
const ComponentEntrance = require('./components/ComponentEntrance')
const ComponentExit = require('./components/ComponentExit')
const ComponentState = require('./components/ComponentState')
const ComponentStates = require('./components/ComponentStates')
const ComponentTreeEditor = require('./components/ComponentTreeEditor')
const Data = require('./components/Data')
const ErrorView = require('./components/ErrorView')
const Header = require('./components/Header')
const LiveEditor = require('./components/LiveEditor')
const LivePreview = require('./components/LivePreview')
const LiveView = require('./components/LiveView')
const Properties = require('./components/Properties')
const QuickAction = require('./components/QuickAction')
const RotateFade = require('./components/RotateFade')
const Search = require('./components/Search')
const StaggerIcons = require('./components/StaggerIcons')
const SubHeader = require('./components/SubHeader')

import actionsPlugin from './utils/ActionsBabelPlugin'
import dataPlugin from './utils/DataBabelPlugin'


const WorkfloComponents = {
  App,
  Code,
  Configuration,
  Component,
  Components,
  ComponentEntrance,
  ComponentExit,
  ComponentState,
  ComponentStates,
  ComponentTreeEditor,
  Data,
  ErrorView,
  Header,
  LiveEditor,
  LivePreview,
  RotateFade,
  LiveView,
  Properties,
  QuickAction,
  Search,
  StaggerIcons,
  SubHeader,
}

module.exports = WorkfloComponents

window.workflo = window.workflo || {}
window.workflo.componentLibrary = window.workflo.componentLibrary || {}
window.workflo.componentLibrary.liveView = window.workflo.componentLibrary.liveView || {}
window.workflo.componentLibrary.liveView.babelPlugins = {
  actionsPlugin,
  dataPlugin,
}
