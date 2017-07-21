/** @flow */
import React from 'react'
import Theme from 'js-theme'
import { List } from 'immutable'

import { Colors, Fonts } from '@workflo/styles'

import type { CompletionDataT } from '../../types/Completion'
import {
  type ComponentTree,
  Helpers,
  type NodeIdentifierT,
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
        focusedNodeId: null,
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
      this.state.interactionState.focusedNodeId !==
      prevState.interactionState.focusedNodeId
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
    const focusedNodeId = interactionState.focusedNodeId
    /** Find empty nodes */
    const traverseResult = Helpers.traverse(
      componentTree,
      List(),
      (ctx: TraverseContext, type) => {
        const node = ctx.node
        if (type === 'post') {
          return ctx
        }
        if (
          (node.nodeType === 'prop' && !node.get('name')) ||
          (node.nodeType === 'component' && !node.get('name'))
        ) {
          return ctx.set('data', ctx.data.push(node.id))
        }
        return ctx
      }
    )

    const nodesToRemove = traverseResult.data

    /** Only clear empty nodes if they are not currently being edited */
    const modifiedComponentTree = nodesToRemove.reduce(
      (tree, nodeId) =>
        nodeId === focusedNodeId ? tree : Helpers.removeNodeById(tree, nodeId),
      componentTree
    )

    // console.dir(modifiedComponentTree)
    onChange && onChange(modifiedComponentTree)
    this.setState({ componentTree: modifiedComponentTree })
  }

  focusNode(path: Path) {
    const { componentTree } = this.state
    const targetNode = componentTree.getIn(path, null)

    /**
     *  If a blur event is immediately followed by a focus event, we cancel the
     *  blur timeout callback from firing, since it is redundant and can cause
     *  extra intermediate updates which can cause perceived bugginess in UI.
     */
    if (this.blurTimeoutId) {
      clearTimeout(this.blurTimeoutId)
    }

    /** If the targetNode exists we focus it, otherwise we must create it first */
    if (targetNode) {
      this.setState({
        interactionState: {
          focusedNodeId: targetNode.id,
        },
      })
    } else {
      const emptyProp = Helpers.createEmptyProp()
      this.setState(
        prevState => ({
          componentTree: componentTree.setIn(path, emptyProp),
        }),
        () => {
          /** Only after the node has been created do we focus it */
          this.setState({
            interactionState: {
              focusedNodeId: emptyProp.id,
            },
          })
        }
      )
    }
  }

  handleChangeNode = ({ nodeId, path, value }) => {
    const { componentTree } = this.state

    const modifiedComponentTree = Helpers.setNodeAttribute({
      tree: componentTree,
      path,
      nodeId,
      value,
    })

    this.props.onChange && this.props.onChange(modifiedComponentTree)
    this.setState({
      componentTree: modifiedComponentTree,
      traversalMap: generateTraversalMap(modifiedComponentTree),
    })
  }

  handleBlur = (id: NodeIdentifierT) => {
    /**
     * If the node being blurred is the node being focused then the focused node
     * should be set to null. If another node has alreadty been focused in the meantime,
     * as is likely to happen, then do nothing.
     */
    this.blurTimeoutId = setTimeout(() => {
      this.setState(
        prevState =>
          prevState.interactionState.focusedNodeId === id
            ? {
                interactionState: {
                  focusedNodeId: null,
                },
              }
            : {}
      )
    }, 100)
    this.blurTimeoutId = null
  }

  handleFocus = (id: NodeIdentifierT) => {
    const { componentTree } = this.state
    const path = Helpers.findNodeById(componentTree, id)
    if (path) {
      this.focusNode(path)
    }
  }

  /**
   * Handles traversing forwards in the editor via keyboard navigation.
   */
  handleFocusNext = (id: NodeIdentifierT) => {
    const { componentTree, traversalMap } = this.state
    const path = Helpers.findNodeById(componentTree, id)
    const currentNode = traversalMap.get(path)
    const nextPath = currentNode && currentNode.next

    /** If there is a next node in the traversalMap then we focus that node */
    if (nextPath) {
      this.focusNode(nextPath)
    }
  }

  /**
   * Handles traversing backwards in the editor via keyboard navigation.
   */
  handleFocusPrevious = (id: NodeIdentifierT) => {
    const { componentTree, traversalMap } = this.state
    const path = Helpers.findNodeById(componentTree, id)
    const currentNode = traversalMap.get(path)
    let previousPath = currentNode && currentNode.previous

    /** This prevents us from creating new nodes while traversing backwards */
    while (previousPath) {
      if (componentTree.hasIn(previousPath)) {
        this.focusNode(previousPath)
        return
      }
      previousPath = traversalMap.get(previousPath).previous
    }
  }

  handleInsertNode = (id, type) => {
    const { componentTree } = this.state
    const path = Helpers.findNodeById(componentTree, id)
    let targetId = id
    let newNode = null
    let modifiedTree = componentTree
    if (type === ADD_PROP) {
      newNode = Helpers.createEmptyProp()
      modifiedTree = Helpers.insertProp(componentTree, targetId, newNode)
    }

    if (type === ADD_SIBLING) {
      targetId = componentTree.getIn(path.pop().pop()).get('id')
    }

    if (type === ADD_CHILD || type === ADD_SIBLING) {
      newNode = Helpers.createEmptyComponent()
      const targetNode = Helpers.getNodeById(componentTree, targetId)
      const insertionIndex = targetNode.children.count()
      modifiedTree = Helpers.insertComponent(
        componentTree,
        targetId,
        insertionIndex,
        newNode
      )
    }

    if (newNode) {
      this.setState({
        componentTree: modifiedTree,
      })
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
