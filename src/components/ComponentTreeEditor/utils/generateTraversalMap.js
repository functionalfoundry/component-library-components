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
    if (type !== 'post') {
      const data = ctx.data.push({ path: ctx.path, type: ctx.node.nodeType })
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
    /** All other components should have a "new node" injected before them in the list */
    if (node.type === 'component') {
      const previousNode = acc.last()
      /** previous node will either be a component or a prop value */
      const newPath = previousNode.type === 'component'
        ? previousNode.path.push('props').push(0)
        : previousNode.path.pop().pop().push(previousNode.path.pop().last() + 1)
      return acc.push({ type: 'prop', path: newPath }).push(node)
    }
    return acc.push(node)
  }, List())

  const traversalMap = finalTraversalList.reduce((acc, node, index, list) => {
    const previousNode = index === 0 ? null : list.get(index - 1, null)
    const nextNode = list.get(index + 1, null)
    return acc.set(
      node.path,
      TraversalMapNode({
        previous: previousNode && previousNode.path,
        next: nextNode && nextNode.path,
      })
    )
  }, Map())
  return traversalMap
}

export default generateTraversalMap
