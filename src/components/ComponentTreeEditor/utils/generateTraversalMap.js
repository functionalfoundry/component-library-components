import { type ComponentTree, Helpers, Path } from '../../../modules/ComponentTree'
import { List, Map, Record } from 'immutable'

const TraversalMapNode = Record({ previous: null, next: null })

export type TraversalMapT = Map<Path, TraversalMapNode>

/**
 * Generates a TraversalMap used for looking up a node in the componentTree, and finding
 * the next or previous nodes from that node to be traversed in keyboard navigation.
 *
 * Returns an Immuatable Map where the values are TraversalMapNode's and the keys
 * are Path's (Immutable list).
 *
 * **Also** Includes nodes with Path's that do not exist in the original componentTree,
 * which represents new nodes that should be created as a result of the keyboard traversal.
 */
const generateTraversalMap = (componentTree: ComponentTree): TraversalMapT => {
  const traversalResult = Helpers.traverse(componentTree, List(), (ctx, type) => {
    const nodeType = ctx.node.nodeType
    if (type !== 'post') {
      let path = ctx.node.path
      if (nodeType === 'component' || nodeType === 'prop') {
        path = path.push('name')
      }
      if (nodeType === 'prop-value') {
        path = path.push('value')
      }
      const data = ctx.data.push({ path: path, type: nodeType })
      return ctx.set('data', data)
    }
    return ctx
  })

  const traversalList = traversalResult.get('data')
  /**
   * Add nodes representing new props as necessary.
   */
  const finalTraversalList = traversalList.reduce((acc, node, index) => {
    /** Don't want to do this logic for the root component */
    if (index === 0) {
      return acc.push(node)
    }
    /** All other components should have a "new node" as well as an "add-button" injected before them in the list */
    if (node.type === 'component') {
      const previousNode = acc.last()
      /** previous node will either be a component or a prop value */
      const newPropPath = previousNode.type === 'component'
        ? /** previousNode.path looks like:  ['root', 'children', 0, 'name']*/
          previousNode.path.pop().push('props').push(0).push('name')
        : /**
           * Sets a path as the last sibling of the previous prop node.
           * In this case previousNode.path looks like: ['root',..., 'props', 0, 'value', 'value']
           */
          previousNode.path
            .pop()
            .pop()
            .pop()
            .push(previousNode.path.pop().pop().last() + 1)
            .push('name')

      const newAddButtonPath = previousNode.type === 'component'
        ? previousNode.path.pop().push('add-button')
        : previousNode.path.pop().pop().pop().pop().push('add-button')
      return (
        acc
          .push({ type: 'prop', path: newPropPath })
          /** Null type here indicates it will not be an 'actual' node in the componentTree */
          .push({ type: null, path: newAddButtonPath })
          .push(node)
      )
    }
    return acc.push(node)
  }, List())

  const traversalMap = finalTraversalList.reduce((acc, node, index, list) => {
    const previousNode = index === 0 ? null : list.get(index - 1, null)
    const nextNode = list.get(index + 1, null)
    return acc.set(
      node.path,
      TraversalMapNode({
        previous: previousNode,
        next: nextNode,
      })
    )
  }, Map())
  return traversalMap
}

export default generateTraversalMap
