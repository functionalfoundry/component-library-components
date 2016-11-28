import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import LiveEditor from './LiveEditor'
import { propKeyValues, dataCode } from '../../../mocks/components'

storiesOf('LiveEditor', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
      >
        <LiveEditor
          componentName='Comment'
          propKeyValues={propKeyValues}
          onChangeCode={() => {}}
          dataCode={dataCode}
        />
      </Preview>
    </PreviewContainer>
  ))
