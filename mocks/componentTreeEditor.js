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

export const completionData = {
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
    path: List(['root']),
    props: List([
      Prop({
        id: 'list-title-prop',
        name: 'title',
        nodeType: 'prop',
        path: List(['root', 'props', 0]),
        value: PropValue({
          id: 'list-title-prop-value',
          nodeType: 'prop-value',
          path: List(['root', 'props', 0, 'value']),
          value: 'http://localhost:9001/?selectedKind=Component%20Tree%20Editor&selectedStory=Regular&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel',
          type: 'string',
        }),
      }),
      Prop({
        id: 'list-width-prop',
        name: 'listWidth',
        nodeType: 'prop',
        path: List(['root', 'props', 1]),
        value: PropValue({
          id: 'list-width-prop-value',
          nodeType: 'prop-value',
          path: List(['root', 'props', 1, 'value']),
          value: '10',
        }),
      }),
      Prop({
        id: 'list-on-select-prop',
        name: 'onSelect',
        nodeType: 'prop',
        path: List(['root', 'props', 2]),
        value: PropValue({
          id: 'list-on-select-prop-value',
          nodeType: 'prop-value',
          path: List(['root', 'props', 2, 'value']),
          type: 'function',
          value: 'handleSelect',
        }),
      }),
    ]),
    children: List([
      Component({
        id: 'list-item-1',
        name: 'ListItem',
        path: List(['root', 'children', 0]),
        props: List([
          Prop({
            id: 'list-item-1-key-prop',
            name: 'key',
            path: List(['root', 'children', 0, 'props', 0]),
            value: PropValue({
              id: 'list-item-1-key-prop-value',
              path: List(['root', 'children', 0, 'props', 0, 'value']),
              type: 'string',
              value: '0',
            }),
          }),
        ]),
        text: 'First list item',
      }),
      Component({
        id: 'list-item-2',
        name: 'ListItem',
        path: List(['root', 'children', 1]),
        props: List([
          Prop({
            id: 'list-item-2-key-prop',
            name: 'key',
            path: List(['root', 'children', 1, 'props', 0]),
            value: PropValue({
              id: 'list-item-2-key-prop-value',
              path: List(['root', 'children', 1, 'props', 0, 'value']),
              value: '1',
              type: 'string',
            }),
          }),
        ]),
        text: 'Second list item',
      }),
      Component({
        id: 'list-item-3',
        name: 'ListItem',
        path: List(['root', 'children', 2]),
        text: 'Third list item',
      }),
      Component({
        id: 'list-item-4',
        name: 'ListItem',
        path: List(['root', 'children', 3]),
      }),
    ]),
  }),
})

export const treeFromRaw = Helpers.createTree({
  id: 'list',
  name: 'List',
  props: [
    {
      id: 'list-title-prop',
      name: 'title',
      value: {
        value: 'Users',
        type: 'string',
      },
    },
  ],
  children: [
    {
      id: 'list-item-1',
      name: 'ListItem',
      props: [
        {
          name: 'key',
          value: {
            value: '1',
            type: 'number',
          },
        },
      ],
      text: 'Hello',
    },
  ],
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
