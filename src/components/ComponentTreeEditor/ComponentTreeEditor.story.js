/* @flow */

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Preview, PreviewContainer } from '@workflo/components'
import { ComponentTree } from '../../utils/CompositeComponents/ComponentTree'
import ComponentTreeEditor from './ComponentTreeEditor'

const regularTree = ComponentTree({})

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
