import template from 'babel-template'

function actionsBabelPlugin({ types: t }) {
  return {
    visitor: {
      Program (path) {
        path.unshiftContainer('body', buildInit())
        // path.unshiftContainer('body', buildDefineState())
        // path.unshiftContainer('body', buildDefineSetState())
      },
      VariableDeclaration (path) {
        if (isStateOrSetState(path.node)) return
        const variableI = t.identifier(path.node.declarations[0].id.name)
        const lVal = t.memberExpression(getBaseObject(t), variableI)
        const rexpression = !path.node.declarations[0].init.id
          ? path.node.declarations[0].init
          : path.node.declarations[0].init.id.name
        path.insertAfter(
          t.expressionStatement(t.assignmentExpression('=', lVal, rexpression))
        )
      },
    }
  }
}

const isStateOrSetState = (node) =>
  node.declarations[0].id.name === 'state' || node.declarations[0].id.name === 'setState'

const getBaseObject = (t) => {
  const windowI = t.identifier('window')
  const workfloI = t.memberExpression(windowI, t.identifier('workflo'))
  const componentLibraryI = t.memberExpression(workfloI, t.identifier('componentLibrary'))
  const liveViewI = t.memberExpression(componentLibraryI, t.identifier('liveView'))
  const actionsI = t.memberExpression(liveViewI, t.identifier('actions'))
  return actionsI
}

const buildInit = template(`
  window.workflo = window.workflo || {};
  window.workflo.componentLibrary = window.workflo.componentLibrary || {};
  window.workflo.componentLibrary.liveView = window.workflo.componentLibrary.liveView || {};
  window.workflo.componentLibrary.liveView.actions = window.workflo.componentLibrary.liveView.actions || {};

  var state = window.workflo.componentLibrary.liveView.actions.state;
  var setState = window.workflo.componentLibrary.liveView.actions.setState;
`)

export default actionsBabelPlugin
