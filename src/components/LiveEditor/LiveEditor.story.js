import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import LiveEditor from './LiveEditor'
import { componentTree, dataCode, actionsCode } from '../../../mocks/components'

storiesOf('LiveEditor', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
      >
        <LiveEditor
          componentTree={componentTree}
          data={{text: dataCode}}
          actions={{text: actionsCode}}
          onChangeData={action('onChangeData')}
          onChangeActions={action('onChangeActions')}
        />
      </Preview>
    </PreviewContainer>
  ))
