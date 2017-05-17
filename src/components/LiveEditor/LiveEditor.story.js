import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import LiveEditor from './LiveEditor'
import { componentTree, dataCode, actionsCode } from '../../../mocks/components'

storiesOf('LiveEditor', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview label="Regular">
        <LiveEditor
          componentTree={componentTree}
          completionData={{
            components: ['ExampleComponentA', 'ExampleComponentB', 'SomethingElse'],
          }}
          data={{ text: dataCode }}
          actions={{ text: actionsCode }}
          onChangeData={action('onChangeData')}
          onChangeActions={action('onChangeActions')}
          selectedTabIndex={1}
        />
      </Preview>
    </PreviewContainer>
  ))
  .add('Animate Data Editor', () => (
    <PreviewContainer>
      <Preview label="Regular">
        <LiveEditor
          componentTree={componentTree}
          completionData={{
            components: ['ExampleComponentA', 'ExampleComponentB', 'SomethingElse'],
          }}
          data={{ text: dataCode }}
          actions={{ text: actionsCode }}
          onChangeData={action('onChangeData')}
          onChangeActions={action('onChangeActions')}
          shouldAnimateDataEditor
        />
      </Preview>
    </PreviewContainer>
  ))
