/* @flow */

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Preview, PreviewContainer } from '@workflo/components'
import { List } from 'immutable'
import {
  Component,
  ComponentName,
  ComponentTree,
  Prop,
  PropName,
  PropValue,
  Text,
} from '../../utils/CompositeComponents/ComponentTree'
import ComponentTreeEditor from './ComponentTreeEditor'
const Utils = require('../../utils/CompositeComponents/ComponentTreeUtils')

const regularTree = ComponentTree({
  root: Component({
    id: 'list',
    name: ComponentName({
      name: 'List',
    }),
    props: List([
      Prop({
        id: 'list-title-prop',
        name: PropName({ name: 'title' }),
        value: PropValue({ value: 'Users' })
      }),
      Prop({
        id: 'list-width-prop',
        name: PropName({ name: 'listWidth' }),
        value: PropValue({ value: '10' })
      })
    ]),
    children: List([
      Component({
        id: 'list-item-1',
        name: ComponentName({
          name: 'ListItem'
        }),
        props: List([
          Prop({
            id: 'list-item-1-key-prop',
            name: PropName({ name: 'key' }),
            value: PropValue({ value: '0' }),
          })
        ]),
        text: Text({
          text: 'First list item'
        }),
      }),
      Component({
        id: 'list-item-2',
        name: ComponentName({
          name: 'ListItem'
        }),
        props: List([
          Prop({
            id: 'list-item-2-key-prop',
            name: PropName({ name: 'key' }),
            value: PropValue({ value: '1' }),
          })
        ]),
        text: Text({
          text: 'Second list item'
        }),
      }),
      Component({
        id: 'list-item-3',
        name: ComponentName({
          name: 'ListItem',
        }),
        text: Text({
          text: 'Third list item'
        }),
      }),
      Component({
        id: 'list-item-4',
        name: ComponentName({
          name: 'ListItem'
        }),
      }),
    ])
  })
})

type TreeEditorContainerStateT = {
  tree: ComponentTree,
}

class TreeEditorContainer extends React.Component {
  state: TreeEditorContainerStateT

  constructor (props) {
    super(props)
    this.state = {
      tree: regularTree,
    }
  }

  createAction = (name, handler) => (
    <button onClick={handler}>{name}</button>
  )

  insertProp = () => {
    const prop = Prop({
      id: 'new-prop',
      name: PropName({ name: 'newProp' }),
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
      tree: Utils.setPropName(
        this.state.tree, 'list-title-prop',
        PropName({
          name: 'newNameOfTitleProp'
        })
      )
    })
  }

  setPropValue = () => {
    this.setState({
      tree: Utils.setPropValue(
        this.state.tree, 'list-title-prop',
        PropValue({
          value: 'New list title',
        })
      )
    })
  }

  insertComponentAsFirst = () => {
    this.setState({
      tree: Utils.insertComponent(
        this.state.tree, 'list', 0,
        Component({
          id: 'new-component-as-first',
          name: ComponentName({
            name: 'NewComponent'
          })
        })
      ),
    })
  }

  insertComponentAsThird = () => {
    this.setState({
      tree: Utils.insertComponent(
        this.state.tree, 'list', 2,
        Component({
          id: 'new-component-as-third',
          name: ComponentName({
            name: 'AnotherNewComponent'
          })
        })
      ),
    })
  }

  insertComponentInThird = () => {
    this.setState({
      tree: Utils.insertComponent(
        this.state.tree, 'new-component-as-third', 0,
        Component({
          id: 'new-component-in-third',
          name: ComponentName({
            name: 'YetAnotherNewComponent'
          })
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
      tree: Utils.setComponentName(
        this.state.tree, 'list-item-3',
        ComponentName({
          name: 'NewListItem',
        })
      )
    })
  }

  setComponentText = () => {
    this.setState({
      tree: Utils.setComponentText(
        this.state.tree, 'list-item-3',
        Text({
          text: 'New text',
        })
      )
    })
  }

  render () {
    return (
      <div>
        <ComponentTreeEditor
          tree={this.state.tree}
        />
        <div>
          {[
            this.createAction(
              'Add prop to first list item',
              this.insertProp
            ),
            this.createAction(
              'Remove the listWidth prop from List',
              this.removeProp
            ),
            this.createAction(
              'Change the name of the title prop',
              this.setPropName
            ),
            this.createAction(
              'Change value of the title prop',
              this.setPropValue
            ),
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
            this.createAction(
              'Remove the second list item',
              this.removeComponent
            ),
            this.createAction(
              'Update the name of the third list item',
              this.setComponentName
            ),
            this.createAction(
              'Change the text of the third list item',
              this.setComponentText
            )
          ]}
        </div>
      </div>
    )
  }
}

storiesOf('Component Tree Editor', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview label='Regular'>
        <TreeEditorContainer />
      </Preview>
    </PreviewContainer>
  ))
