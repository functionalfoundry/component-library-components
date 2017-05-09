import template from 'babel-template'

function dataBabelPlugin({ types: t }) {
  return {
    visitor: {
      Program(path) {
        path.unshiftContainer('body', buildInit())
      },
      VariableDeclaration(path) {
        const name = path.node.declarations[0].id.name
        const parentType = path.parent.type

        // only create window.workflo.componentLibrary.liveView.data.<name>
        // declarations for global variables
        if (name && parentType === 'Program') {
          const variableI = t.identifier(path.node.declarations[0].id.name)
          const lVal = t.memberExpression(getBaseObject(t), variableI)
          const rexpression = !path.node.declarations[0].init.id
            ? path.node.declarations[0].init
            : path.node.declarations[0].init.id.name
          const baseDeclaration = t.expressionStatement(
            t.assignmentExpression('=', lVal, rexpression)
          )
          path.insertAfter(baseDeclaration)

          // don't traverse children of this variable declaration
          path.skip()
        }
      },
    },
  }
}

const getBaseObject = t => {
  const windowI = t.identifier('window')
  const workfloI = t.memberExpression(windowI, t.identifier('workflo'))
  const componentLibraryI = t.memberExpression(workfloI, t.identifier('componentLibrary'))
  const liveViewI = t.memberExpression(componentLibraryI, t.identifier('liveView'))
  const dataI = t.memberExpression(liveViewI, t.identifier('data'))
  return dataI
}

const buildInit = template(`
  window.workflo = window.workflo || {};
  window.workflo.componentLibrary = window.workflo.componentLibrary || {};
  window.workflo.componentLibrary.liveView = window.workflo.componentLibrary.liveView || {};
  window.workflo.componentLibrary.liveView.data = window.workflo.componentLibrary.liveView.data || {};
`)

export default dataBabelPlugin
