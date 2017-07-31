/* @flow */
import React from 'react'
import { List } from 'immutable'
import { action } from '@kadira/storybook'
import ComponentTree, {
  type NodeIdentifierT,
  Component,
  Helpers,
  Prop,
  PropValue,
} from '../src/modules/ComponentTree'
import ComponentTreeEditor from '../src/components/ComponentTreeEditor'

const completionData = {
  components: ['List', 'ListItem'],
  props: {
    List: {
      title: {
        type: 'string',
      },
      listWidth: {
        type: 'number',
        options: [10, 20, 30],
      },
    },
    ListItem: {
      key: {
        type: 'string',
      },
    },
  },
  globalOptions: {
    'state.title': {
      name: 'state.title',
      value: 'state.title',
      type: 'string',
      source: 'state',
    },
    handleSelect: {
      name: 'handleSelect',
      value: 'handleSelect',
      type: 'function',
      source: 'actions',
    },
  },
}

export const regularTree = ComponentTree({
  root: Component({
    id: 'list',
    name: 'List',
    props: List([
      Prop({
        id: 'list-title-prop',
        name: 'title',
        value: PropValue({
          value: 'Users',
          type: 'string',
        }),
      }),
      Prop({
        id: 'list-width-prop',
        name: 'listWidth',
        value: PropValue({ value: '10' }),
      }),
      Prop({
        id: 'list-on-select-prop',
        name: 'onSelect',
        value: PropValue({
          value: 'handleSelect',
          type: 'function',
        }),
      }),
    ]),
    children: List([
      Component({
        id: 'list-item-1',
        name: 'ListItem',
        props: List([
          Prop({
            id: 'list-item-1-key-prop',
            name: 'key',
            value: PropValue({ value: '0' }),
          }),
        ]),
        text: 'First list item',
      }),
      Component({
        id: 'list-item-2',
        name: 'ListItem',
        props: List([
          Prop({
            id: 'list-item-2-key-prop',
            name: 'key',
            value: PropValue({ value: '1' }),
          }),
        ]),
        text: 'Second list item',
      }),
      Component({
        id: 'list-item-3',
        name: 'ListItem',
        text: 'Third list item',
      }),
      Component({
        id: 'list-item-4',
        name: 'ListItem',
      }),
    ]),
  }),
})

type TreeEditorContainerPropsT = {
  tree: ComponentTree,
}

type TreeEditorContainerStateT = {
  tree: ComponentTree,
}

export class TreeEditorContainer extends React.Component {
  props: TreeEditorContainerPropsT
  state: TreeEditorContainerStateT

  constructor(props: TreeEditorContainerPropsT) {
    super(props)
    this.state = {
      tree: this.props.tree,
    }
  }

  handleRemoveProp = (nodeId: NodeIdentifierT) => {
    action('onRemoveProp')(nodeId)
    const tree = Helpers.removeProp(this.state.tree, nodeId)
    this.setState({ tree })
  }

  handleRemoveComponent = (nodeId: NodeIdentifierT) => {
    action('onRemoveComponent')(nodeId)
    const tree = Helpers.removeComponent(this.state.tree, nodeId)
    this.setState({ tree })
  }

  handleInsertComponent = (
    parentId: NodeIdentifierT,
    index: number,
    component: Component
  ) => {
    action('onInsertComponent')(parentId, index, component)
    const tree = Helpers.insertComponent(this.state.tree, parentId, index, component)
    this.setState({ tree })
  }

  handleChangeComponentName = (nodeId: NodeIdentifierT, name: string) => {
    action('onChangeComponentName')(nodeId, name)
    const tree = Helpers.setComponentName(this.state.tree, nodeId, name)
    this.setState({ tree })
  }

  render() {
    return (
      <div>
        <ComponentTreeEditor
          tree={this.state.tree}
          completionData={completionData}
          nodeIdGenerator={() => Math.random().toString()}
          onChange={action('onChange')}
          onRemoveProp={this.handleRemoveProp}
          onRemoveComponent={this.handleRemoveComponent}
          onInsertComponent={this.handleInsertComponent}
          onChangePropValue={action('onChangePropValue')}
          onChangeComponentName={this.handleChangeComponentName}
        />
      </div>
    )
  }
}
