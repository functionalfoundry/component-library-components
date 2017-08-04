/* @flow */

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Preview, PreviewContainer } from '@workflo/components'
import { List } from 'immutable'
import ComponentTree, {
  type NodeIdentifierT,
  Component,
  Helpers,
  Prop,
  PropValue,
} from '../../modules/ComponentTree'
import ComponentTreeEditor from './ComponentTreeEditor'
import { generateTreeLayoutMarkup, generateTreeLayout } from './utils/ComponentTreeLayout'

const completionData = {
  components: ['List', 'ListItem'],
  props: {
    List: {
      title: {
        type: 'string',
      },
      onSelect: {
        type: 'function',
      },
      listWidth: {
        type: 'number',
        options: ['10', '20', '30'],
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
          value:
            'http://localhost:9001/?selectedKind=Component%20Tree%20Editor&selectedStory=Regular&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel',
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

const treeFromRaw = Helpers.createTree({
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

class TreeEditorContainer extends React.Component {
  props: TreeEditorContainerPropsT
  state: TreeEditorContainerStateT

  constructor(props) {
    super(props)
    this.state = {
      tree: this.props.tree,
    }
  }

  createAction = (name, handler) =>
    <button key={name} onClick={handler}>
      {name}
    </button>

  insertProp = () => {
    const prop = Prop({
      id: 'new-prop',
      name: 'newProp',
      value: PropValue({ value: 'new prop value' }),
    })
    this.setState({
      tree: Helpers.insertProp(this.state.tree, 'list-item-1', prop),
    })
  }

  removeProp = () => {
    this.setState({
      tree: Helpers.removeNodeById(this.state.tree, 'list-width-prop'),
    })
  }

  setPropName = () => {
    this.setState({
      tree: Helpers.setPropName(this.state.tree, 'list-title-prop', 'newNameOfTitleProp'),
    })
  }

  setPropValue = () => {
    this.setState({
      tree: Helpers.setPropValue(
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
      tree: Helpers.insertComponent(
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
      tree: Helpers.insertComponent(
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
      tree: Helpers.insertComponent(
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
      tree: Helpers.removeComponent(this.state.tree, 'list-item-2'),
    })
  }

  setComponentName = () => {
    this.setState({
      tree: Helpers.setComponentName(this.state.tree, 'list-item-3', 'NewListItem'),
    })
  }

  setComponentText = () => {
    this.setState({
      tree: Helpers.setComponentText(this.state.tree, 'list-item-3', 'New text'),
    })
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

  handleInsertProp = (
    componentId: NodeIdentifierT,
    index: number,
    prop: Prop,
    jsProp: Object
  ) => {
    action('onInsertProp')(componentId, index, prop, jsProp)
    const tree = Helpers.insertProp(this.state.tree, componentId, index, prop)
    this.setState({ tree })
  }

  handleChangePropName = (
    componentId: NodeIdentifierT,
    nodeId: NodeIdentifierT,
    name: string
  ) => {
    action('onChangePropName')(componentId, nodeId, name)
    let tree = this.state.tree
    tree = Helpers.setPropName(tree, nodeId, name)
    tree = Helpers.setPropValue(
      tree,
      nodeId,
      PropValue({
        id: Math.random().toString(),
        value: '',
      })
    )
    this.setState({ tree })
  }

  handleChangePropValue = (nodeId: NodeIdentifierT, value: string) => {
    action('onChangePropValue')(nodeId, value)

    const tree = Helpers.setPropValue(
      this.state.tree,
      nodeId,
      PropValue({
        id: Math.random().toString(),
        value: value,
      })
    )
    this.setState({ tree })
  }

  handleChangeComponentName = (nodeId: NodeIdentifierT, name: string) => {
    console.log('changing component name! nodeId, name: ', nodeId, name)
    action('onChangeComponentName')(nodeId, name)
    // const tree = Helpers.setComponentName(this.state.tree, nodeId, name)
    // this.setState({ tree })
  }

  render() {
    const layout = generateTreeLayout(this.state.tree)
    const markup = generateTreeLayoutMarkup(layout)
    return (
      <div>
        <ComponentTreeEditor
          tree={this.state.tree}
          layout={layout}
          markup={markup}
          completionData={completionData}
          nodeIdGenerator={() => Math.random().toString()}
          onChange={action('onChange')}
          onRemoveProp={this.handleRemoveProp}
          onRemoveComponent={this.handleRemoveComponent}
          onInsertComponent={this.handleInsertComponent}
          onInsertProp={this.handleInsertProp}
          onChangePropName={this.handleChangePropName}
          onChangePropValue={this.handleChangePropValue}
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
  .add('Regular', () =>
    <PreviewContainer shade="light">
      <Preview label="Regular">
        <TreeEditorContainer tree={regularTree} />
      </Preview>
    </PreviewContainer>
  )
  .add('Tree from raw data', () =>
    <PreviewContainer shade="light">
      <Preview label="Regular">
        <TreeEditorContainer tree={treeFromRaw} />
      </Preview>
    </PreviewContainer>
  )
