/** @flow */
import React from 'react'
import Theme from 'js-theme'

import { Colors, Fonts } from '@workflo/styles'

import type { CompletionDataT } from '../../types/Completion'
import {
  type ComponentTree,
  Helpers,
  Prop,
  PropValue,
  type NodeIdentifierT,
} from '../../modules/ComponentTree'
import ComponentRenderer from './components/ComponentRenderer'
import type { InteractionStateT } from './types'

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
}

/**
 * ComponentTree component
 */

class ComponentTreeEditor extends React.Component {
  props: PropsT
  state: StateT
  blurTimeoutId: ?number

  constructor(props: PropsT) {
    super(props)
    this.state = {
      componentTree: props.tree,
      interactionState: {
        focusedNodeId: null,
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tree !== this.props.tree) {
      this.setState({ componentTree: nextProps.tree })
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
          onChangeNode={this.handleChangeNode}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onFocusNext={this.handleFocusNext}
          completionData={completionData}
          componentNode={rootNode}
          componentTree={componentTree}
          interactionState={interactionState}
        />
      </div>
    )
  }

  focusNode(id) {
    /**
     *  If a blur event is immediately followed by a focus event, we cancel the
     *  blur timeout callback from firing, since it is redundant and can cause
     *  extra intermediate updates which can cause perceived bugginess in UI.
     */
    if (this.blurTimeoutId) {
      clearTimeout(this.blurTimeoutId)
    }
    this.setState({
      interactionState: {
        focusedNodeId: id,
      },
    })
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
    this.setState({ componentTree: modifiedComponentTree })
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

  handleFocus = (id: NodeIdentifierT) => this.focusNode(id)

  /**
   * This determines logically how the user will advance through parts of the ComponentTreeEditor
   * using keyboard navigation.
   */
  handleFocusNext = (id: NodeIdentifierT) => {
    const { componentTree } = this.state
    const sourceNode = Helpers.getNodeById(componentTree, id)
    const sourceNodePath = Helpers.findNodeById(componentTree, id)
    const sourceNodeType = sourceNode.get('nodeType')
    if (sourceNodeType === 'prop-value') {
      /**
       * Should check if there is another sibling prop. If yes, move to that
       * prop value. If not, then create an empty sibling prop-value.
       *
       * If the current sibling prop-value is already an empty, then move to next target.
       */
      const currentPropId = Helpers.getParent(componentTree, id).get('id')
      const targetProp = Helpers.getNextSibling(componentTree, currentPropId)
      if (targetProp) {
        this.focusNode(targetProp.get('id'))
      } else {
        const componentNode = componentTree.getIn(sourceNodePath.pop().pop().pop())
        const propCount = componentNode.get('props').count()
        const componentNodeId = componentNode.get('id')
        const newPropId = `new-prop-${propCount}`
        const emptyProp = Prop({
          id: newPropId,
          name: '',
          value: PropValue({ id: `${newPropId}-value`, value: '' }),
        })
        const modifiedTree = Helpers.insertProp(componentTree, componentNodeId, emptyProp)
        /** Add the new prop to the tree, and then focus it */
        this.setState(
          prevState => ({ componentTree: modifiedTree }),
          () => {
            this.focusNode(newPropId)
          }
        )
      }
    }
    if (sourceNodeType === 'component') {
      /**
       * Should move to first prop name if there is one.
       *
       * If there isn't it should create a prop and move to that.
       */
      const firstProp = sourceNode.get('props').first()
      if (firstProp) {
        this.focusNode(firstProp.get('id'))
      } else {
        const componentNode = sourceNode
        const propCount = componentNode.get('props').count()
        const componentNodeId = componentNode.get('id')
        const newPropId = `new-prop-${propCount}`
        const emptyProp = Prop({
          id: newPropId,
          name: '',
          value: PropValue({ id: `${newPropId}-value`, value: '' }),
        })
        const modifiedTree = Helpers.insertProp(componentTree, componentNodeId, emptyProp)
        /** Add the new prop to the tree, and then focus it */
        this.setState(
          prevState => ({ componentTree: modifiedTree }),
          () => {
            this.focusNode(newPropId)
          }
        )
      }
    }
    if (sourceNodeType === 'prop') {
      /**
       * Should move to the prop-value corresponding to this prop.
       */
      const propValueNode = sourceNode.get('value')
      this.focusNode(propValueNode.get('id'))
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
