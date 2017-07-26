/** @flow */
import React from 'react'
import Theme from 'js-theme'
import { List } from 'immutable'

import { Colors, Fonts } from '@workflo/styles'

import type { CompletionDataT } from '../../types/Completion'
import {
  type ComponentTree,
  Helpers,
  Path,
  type TraverseContext,
} from '../../modules/ComponentTree'
import ComponentRenderer from './components/ComponentRenderer'
import type { InteractionStateT } from './types'
import generateTraversalMap, { type TraversalMapT } from './utils/generateTraversalMap'
import { ADD_CHILD, ADD_SIBLING, ADD_PROP } from './constants/addPropNode'

/**
 * Props
 */

type PropsT = {
  tree: ComponentTree,
  completionData: CompletionDataT,
  nodeIdGenerator: Function,
  onChange?: Function,
  onRemoveProp?: Function,
  onRemoveComponent?: Function,
  onInsertComponent?: Function,
  onChangePropName?: Function,
  // onChangePropValue?: Function,
  onChangeComponentName?: Function,
  onSelectComponent?: Function,
  theme: Object,
}

/**
 * State
 */

type StateT = {
  componentTree: ComponentTree,
  interactionState: InteractionStateT,
  traversalMap: TraversalMapT,
}

/**
 * ComponentTree component
 */

class ComponentTreeEditor extends React.Component {
  props: PropsT
  state: StateT
  blurTimeoutId: ?number

  constructor(props: PropsT) {
    const { tree } = props
    super(props)
    this.state = {
      componentTree: tree,
      interactionState: {
        focusedNodePath: null,
      },
      traversalMap: generateTraversalMap(tree),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { tree } = nextProps
    if (tree !== this.props.tree) {
      this.setState({ componentTree: tree, traversalMap: generateTraversalMap(tree) })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.interactionState.focusedNodePath !==
      prevState.interactionState.focusedNodePath
    ) {
      this.clearEmptyNodes()
    }
  }

  render() {
    const { completionData, theme } = this.props
    const { componentTree, interactionState } = this.state
    const rootNode = componentTree.get('root')

    return (
      rootNode &&
      <div {...theme.componentTreeEditor}>
        <ComponentRenderer
          isRootComponent
          onChangeNode={this.handleChangeNode}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onFocusNext={this.handleFocusNext}
          onFocusPrevious={this.handleFocusPrevious}
          onInsertNode={this.handleInsertNode}
          completionData={completionData}
          componentNode={rootNode}
          componentTree={componentTree}
          interactionState={interactionState}
        />
      </div>
    )
  }

  /** Deletes empty nodes that are currently not in focus */
  clearEmptyNodes = () => {
    const { onChange } = this.props
    const { componentTree, interactionState } = this.state
    const focusedNodePath = interactionState.focusedNodePath
    /** Find empty nodes */
    const traverseResult = Helpers.traverse(
      componentTree,
      List(),
      (ctx: TraverseContext, type) => {
        const node = ctx.node
        const path = ctx.path
        /** We never remove the root node */
        if (type === 'post' || path.last() === 'root') {
          return ctx
        }
        if (
          (node.nodeType === 'prop' && !node.get('name')) ||
          (node.nodeType === 'component' && !node.get('name'))
        ) {
          return ctx.set('data', ctx.data.push(node.path))
        }
        return ctx
      }
    )

    const nodesToRemove = traverseResult.data

    /** Only clear empty nodes if they are not currently being edited */
    const modifiedComponentTree = nodesToRemove.reduce(
      (tree, nodePath) =>
        nodePath.isSubset(focusedNodePath)
          ? tree
          : Helpers.removeNodeByPath(tree, nodePath),
      componentTree
    )

    onChange && onChange(modifiedComponentTree)
    this.setState({ componentTree: modifiedComponentTree })
  }

  focusNodeAttribute(path: Path, type?: string) {
    const { componentTree } = this.state
    const targetNode = componentTree.getIn(path.pop(), null)

    /**
     *  If a blur event is immediately followed by a focus event, we cancel the
     *  blur timeout callback from firing, since it is redundant and can cause
     *  extra intermediate updates which can cause perceived bugginess in UI.
     */
    if (this.blurTimeoutId) {
      clearTimeout(this.blurTimeoutId)
    }

    /** If the targetNode exists we focus it, otherwise we must create it first */
    if (targetNode || !type) {
      this.setState({
        interactionState: {
          focusedNodePath: path,
        },
      })
      /** We only create a new node if the type has been specified as a parameter */
    } else if (type) {
      let newNode = null
      /** We convert from the path of the node attribute to the path of the new node */
      const newPath = path.pop()
      if (type === 'prop') {
        newNode = Helpers.createEmptyProp(newPath)
      }
      this.setState(
        prevState => ({
          componentTree: componentTree.setIn(newPath, newNode),
        }),
        () => {
          /** Only after the node has been created do we focus it */
          this.setState({
            interactionState: {
              focusedNodePath: path,
            },
          })
        }
      )
    }
  }

  handleChangeNode = ({ path, value }) => {
    const { componentTree } = this.state
    const modifiedComponentTree = componentTree.setIn(path, value)
    this.props.onChange && this.props.onChange(modifiedComponentTree)
    this.setState({
      componentTree: modifiedComponentTree,
      traversalMap: generateTraversalMap(modifiedComponentTree),
    })
  }

  handleBlur = (path: Path) => {
    /**
     * If the node being blurred is the node being focused then the focused node
     * should be set to null. If another node has alreadty been focused in the meantime,
     * as is likely to happen, then do nothing.
     */
    this.blurTimeoutId = setTimeout(() => {
      this.setState(
        prevState =>
          prevState.interactionState.focusedNodePath === path
            ? {
                interactionState: {
                  focusedNodePath: null,
                },
              }
            : {}
      )
    }, 100)
    this.blurTimeoutId = null
  }

  handleFocus = (path: Path) => this.focusNodeAttribute(path)

  /**
   * Handles traversing forwards in the editor via keyboard navigation.
   */
  handleFocusNext = (path: Path) => {
    const { traversalMap } = this.state
    const currentNode = traversalMap.get(path)
    const nextNode = currentNode && currentNode.next
    /** If there is a next node in the traversalMap then we focus that node */
    if (nextNode) {
      this.focusNodeAttribute(nextNode.path, nextNode.type)
    }
  }

  /**
   * Handles traversing backwards in the editor via keyboard navigation.
   */
  handleFocusPrevious = path => {
    const { componentTree, traversalMap } = this.state
    const currentNode = traversalMap.get(path)
    let previousNode = currentNode && currentNode.previous

    /** This prevents us from creating new nodes while traversing backwards */
    while (previousNode) {
      if (componentTree.hasIn(previousNode.path)) {
        this.focusNodeAttribute(previousNode.path)
        return
      }
      previousNode = traversalMap.get(previousNode.path).previous
    }
  }

  handleInsertNode = (id, type) => {
    const { componentTree } = this.state
    const sourcePath = Helpers.findNodeById(componentTree, id)
    const sourceNode = componentTree.getIn(sourcePath)
    let targetId = id
    let newNode = null
    let newPath = null
    let modifiedTree = componentTree
    if (type === ADD_PROP) {
      const propCount = sourceNode.props.count()
      newPath = sourceNode.path.push('props').push(propCount)
      newNode = Helpers.createEmptyProp(newPath)
      modifiedTree = Helpers.insertProp(componentTree, targetId, newNode)
    }

    if (type === ADD_SIBLING) {
      const path = sourceNode.path
      targetId = componentTree.getIn(path.pop().pop()).get('id')
    }

    if (type === ADD_CHILD || type === ADD_SIBLING) {
      const targetNode = Helpers.getNodeById(componentTree, targetId)
      const insertionIndex = targetNode.children.count()
      newPath = targetNode.path.push('children').push(insertionIndex)
      newNode = Helpers.createEmptyComponent(newPath)
      modifiedTree = Helpers.insertComponent(
        componentTree,
        targetId,
        insertionIndex,
        newNode
      )
    }

    if (newNode) {
      this.setState(
        {
          componentTree: modifiedTree,
          traversalMap: generateTraversalMap(modifiedTree),
        },
        () => {
          if (newPath) {
            this.focusNodeAttribute(newPath.push('name'))
          }
        }
      )
    }
  }
  //
  // handleRemoveProp = (nodeId: NodeIdentifierT) => {
  //   this.props.onRemoveProp && this.props.onRemoveProp(nodeId)
  // }
  //
  // handleRemoveComponent = (nodeId: NodeIdentifierT) => {
  //   this.props.onRemoveComponent && this.props.onRemoveComponent(nodeId)
  // }
  //
  // handleInsertComponent = (
  //   parentNodeId: NodeIdentifierT,
  //   index: number,
  //   component: Component
  // ) => {
  //   component = component.set('id', this.props.nodeIdGenerator())
  //   const { onInsertComponent } = this.props
  //   onInsertComponent &&
  //     onInsertComponent(parentNodeId, index, component, component.toJS())
  // }
  //
  // handleChangePropName = (
  //   componentId: NodeIdentifierT,
  //   nodeId: NodeIdentifierT,
  //   name: any
  // ) => {
  //   const { onChangePropName } = this.props
  //   onChangePropName && onChangePropName(componentId, nodeId, name)
  // }
  //
  //
  // handleChangeComponentName = (nodeId: NodeIdentifierT, name: any) => {
  //   const { onChangeComponentName } = this.props
  //   onChangeComponentName && onChangeComponentName(nodeId, name)
  // }
  //
  // handleSelectComponent = (nodeId: NodeIdentifierT) => {
  //   this.props.onSelectComponent && this.props.onSelectComponent(nodeId)
  // }
  //
  // handleSelectNode = (nodeId: NodeIdentifierT) => {}
}

/**
 * Theming
 */

const defaultTheme = {
  componentTreeEditor: {
    ...Fonts.code,
    color: Colors.grey300,
    backgroundColor: Colors.grey900,
  },
}

const ThemedComponentTreeEditor = Theme('ComponentTreeEditor', defaultTheme)(
  ComponentTreeEditor
)
export default ThemedComponentTreeEditor
