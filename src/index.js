const App = require('./components/App')
const Code = require('./components/Code')
const Configuration = require('./components/Configuration')
const Component = require('./components/Component')
const Components = require('./components/Components')
const ComponentState = require('./components/ComponentState')
const ComponentStates = require('./components/ComponentStates')
const Data = require('./components/Data')
const ErrorView = require('./components/ErrorView')
const Header = require('./components/Header')
const LiveEditor = require('./components/LiveEditor')
const LivePreview = require('./components/LivePreview')
const LiveView = require('./components/LiveView')
const Properties = require('./components/Properties')
const QuickAction = require('./components/QuickAction')
const SubHeader = require('./components/SubHeader')

import actionsPlugin from './utils/ActionsBabelPlugin'
import dataPlugin from './utils/DataBabelPlugin'

const WorkfloComponents = {
  App,
  Code,
  Configuration,
  Component,
  Components,
  ComponentState,
  ComponentStates,
  Data,
  ErrorView,
  Header,
  LiveEditor,
  LivePreview,
  LiveView,
  Properties,
  QuickAction,
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
