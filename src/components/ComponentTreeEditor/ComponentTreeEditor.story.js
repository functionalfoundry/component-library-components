/* @flow */

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Preview, PreviewContainer } from '@workflo/components'
import { List } from 'immutable'
import {
  type NodeIdentifierT,
  Component,
  ComponentTree,
  Prop,
  PropValue,
} from '../../utils/CompositeComponents/ComponentTree'
import ComponentTreeEditor from './ComponentTreeEditor'

const Utils = require('../../utils/CompositeComponents/ComponentTreeUtils')

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

const regularTree = ComponentTree({
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
            value: PropValue({ value: '0', type: 'string' }),
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
            value: PropValue({ value: '1', type: 'string' }),
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

const treeFromRaw = Utils.createTree({
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
            value: 1,
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

class TreeEditorContainer extends React.Component {
  props: TreeEditorContainerPropsT
  state: TreeEditorContainerStateT

  constructor(props) {
    super(props)
    this.state = {
      tree: this.props.tree,
    }
  }

  createAction = (name, handler) => <button key={name} onClick={handler}>{name}</button>

  insertProp = () => {
    const prop = Prop({
      id: 'new-prop',
      name: 'newProp',
      value: PropValue({ value: 'new prop value' }),
    })
    this.setState({
      tree: Utils.insertProp(this.state.tree, 'list-item-1', prop),
    })
  }

  removeProp = () => {
    this.setState({
      tree: Utils.removeNodeById(this.state.tree, 'list-width-prop'),
    })
  }

  setPropName = () => {
    this.setState({
      tree: Utils.setPropName(this.state.tree, 'list-title-prop', 'newNameOfTitleProp'),
    })
  }

  setPropValue = () => {
    this.setState({
      tree: Utils.setPropValue(
        this.state.tree,
        'list-title-prop',
        PropValue({
          value: 'New list title',
          type: 'string',
        })
      ),
    })
  }

  insertComponentAsFirst = () => {
    this.setState({
      tree: Utils.insertComponent(
        this.state.tree,
        'list',
        0,
        Component({
          id: 'new-component-as-first',
          name: 'NewComponent',
        })
      ),
    })
  }

  insertComponentAsThird = () => {
    this.setState({
      tree: Utils.insertComponent(
        this.state.tree,
        'list',
        2,
        Component({
          id: 'new-component-as-third',
          name: 'AnotherNewComponent',
        })
      ),
    })
  }

  insertComponentInThird = () => {
    this.setState({
      tree: Utils.insertComponent(
        this.state.tree,
        'new-component-as-third',
        0,
        Component({
          id: 'new-component-in-third',
          name: 'YetAnotherNewComponent',
        })
      ),
    })
  }

  removeComponent = () => {
    this.setState({
      tree: Utils.removeComponent(this.state.tree, 'list-item-2'),
    })
  }

  setComponentName = () => {
    this.setState({
      tree: Utils.setComponentName(this.state.tree, 'list-item-3', 'NewListItem'),
    })
  }

  setComponentText = () => {
    this.setState({
      tree: Utils.setComponentText(this.state.tree, 'list-item-3', 'New text'),
    })
  }

  handleRemoveProp = (nodeId: NodeIdentifierT) => {
    action('onRemoveProp')(nodeId)
    const tree = Utils.removeProp(this.state.tree, nodeId)
    this.setState({ tree })
  }

  handleRemoveComponent = (nodeId: NodeIdentifierT) => {
    action('onRemoveComponent')(nodeId)
    const tree = Utils.removeComponent(this.state.tree, nodeId)
    this.setState({ tree })
  }

  handleInsertComponent = (
    parentId: NodeIdentifierT,
    index: number,
    component: Component
  ) => {
    action('onInsertComponent')(parentId, index, component)
    const tree = Utils.insertComponent(this.state.tree, parentId, index, component)
    this.setState({ tree })
  }

  handleChangeComponentName = (nodeId: NodeIdentifierT, name: string) => {
    action('onChangeComponentName')(nodeId, name)
    const tree = Utils.setComponentName(this.state.tree, nodeId, name)
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
          onSelectComponent={action('onSelectComponent')}
        />
        <div>
          {[
            this.createAction('Add prop to first list item', this.insertProp),
            this.createAction('Remove the listWidth prop from List', this.removeProp),
            this.createAction('Change the name of the title prop', this.setPropName),
            this.createAction('Change value of the title prop', this.setPropValue),
            this.createAction(
              'Add a new, empty component to List as the 1st child',
              this.insertComponentAsFirst
            ),
            this.createAction(
              'Add a new, empty component to List as the 3rd child',
              this.insertComponentAsThird
            ),
            this.createAction(
              'Add a new, empty component to the new 3rd child of List',
              this.insertComponentInThird
            ),
            this.createAction('Remove the second list item', this.removeComponent),
            this.createAction(
              'Update the name of the third list item',
              this.setComponentName
            ),
            this.createAction(
              'Change the text of the third list item',
              this.setComponentText
            ),
          ]}
        </div>
      </div>
    )
  }
}

storiesOf('Component Tree Editor', module)
  .add('Regular', () => (
    <PreviewContainer shade="light">
      <Preview label="Regular">
        <TreeEditorContainer tree={regularTree} />
      </Preview>
    </PreviewContainer>
  ))
  .add('Tree from raw data', () => (
    <PreviewContainer shade="light">
      <Preview label="Regular">
        <TreeEditorContainer tree={treeFromRaw} />
      </Preview>
    </PreviewContainer>
  ))
