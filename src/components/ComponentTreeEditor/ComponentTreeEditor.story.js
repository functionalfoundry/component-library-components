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
import ComponentTreeUtils from '../../utils/CompositeComponents/ComponentTreeUtils'
import ComponentTreeEditor from './ComponentTreeEditor'

const regularTree = ComponentTree({
  root: Component({
    name: ComponentName({
      name: 'List',
    }),
    props: List([
      Prop({
        name: PropName({ name: 'title' }),
        value: PropValue({ value: 'Users' })
      }),
      Prop({
        name: PropName({ name: 'listWidth' }),
        value: PropValue({ value: '10' })
      })
    ]),
    children: List([
      Component({
        name: ComponentName({
          name: 'ListItem'
        }),
        props: List([
          Prop({
            name: PropName({ name: 'key' }),
            value: PropValue({ value: '0' }),
          })
        ]),
        text: Text({
          text: 'First list item'
        }),
      }),
      Component({
        name: ComponentName({
          name: 'ListItem'
        }),
        props: List([
          Prop({
            name: PropName({ name: 'key' }),
            value: PropValue({ value: '1' }),
          })
        ]),
        text: Text({
          text: 'Second list item'
        }),
      }),
      Component({
        name: ComponentName({
          name: 'ListItem',
        }),
        text: Text({
          text: 'Third list item'
        }),
      }),
      Component({
        name: ComponentName({
          name: 'ListItem'
        }),
      }),
    ])
  })
})

storiesOf('Component Tree Editor', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview label='Regular'>
        <ComponentTreeEditor
          tree={regularTree}
        />
      </Preview>
    </PreviewContainer>
  ))
