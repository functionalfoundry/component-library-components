import {
  type ComponentTree,
  type Component,
  type Prop,
  Path,
} from '../../../modules/ComponentTree'
import { List, Map, Record } from 'immutable'

const NodePointer = Record({ path: List(), type: '' })
const TraversalMapNode = Record({ previous: NodePointer(), next: NodePointer() })

export type TraversalMapT = Map<Path, TraversalMapNode>

/**
 * Generates a TraversalMap used for looking up a node in the componentTree, and finding
 * the next or previous nodes from that node to be traversed in keyboard navigation.
 *
 * **Also** Includes nodes with Path's that do not exist in the original componentTree,
 * which represents new nodes that should be created as a result of the keyboard traversal.
 */
const generateTraversalMap = (componentTree: ComponentTree): TraversalMapT => {
  const traversalList = List().asMutable()

  const processProp = (propNode: Prop) => {
    const path = propNode.get('path')
    traversalList.push(NodePointer({ path: path.push('name'), type: 'prop' }))
    if (propNode.get('value') !== null) {
      traversalList.push(
        NodePointer({ path: path.push('value').push('value'), type: 'prop-value' })
      )
    }
  }

  const processComponent = (componentNode: Component) => {
    const path = componentNode.get('path')
    const props = componentNode.get('props')
    traversalList.push(NodePointer({ path: path.push('name'), type: 'component' }))
    props.forEach(processProp)
    /** This is the new prop that gets created during keyboard navigation */
    if (!props.last() || props.last().get('value') !== null) {
      traversalList.push(
        NodePointer({
          path: path.push('props').push(props.count()).push('name'),
          type: 'prop',
        })
      )
    }
    traversalList.push(NodePointer({ path: path.push('add-button'), type: null }))
    componentNode.get('children').forEach(processComponent)
  }

  if (componentTree.root) {
    processComponent(componentTree.root)
  }

  return traversalList.asImmutable().reduce((acc, node, index, list) => {
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
}

export default generateTraversalMap
