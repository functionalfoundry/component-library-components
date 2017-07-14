import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ErrorView from './ErrorView'
import { Preview, PreviewContainer } from '@workflo/components'

storiesOf('ErrorView', module).add('Regular', () => (
  <PreviewContainer>
    <Preview label="Regular">
      <div style={{ display: 'flex' }}>
        <ErrorView message="Error message" stacktrace="Stacktrace" />
      </div>
    </Preview>
    <Preview label="Without props">
      <div style={{ display: 'flex' }}>
        <ErrorView />
      </div>
    </Preview>
    <Preview label="Long">
      <div style={{ display: 'flex', width: 400, height: 300 }}>
        <ErrorView
          message="Cannot read property 'length' of undefined"
          stacktrace="TypeError: Cannot read property 'length' of undefined
    at Steps.render (eval at evaluateBundle (:6:31), <anonymous>:13079:29)
    at p._renderValidatedComponentWithoutOwnerOrContext (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:10750)
    at p._renderValidatedComponent (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:10877)
    at performInitialMount (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:6696)
    at p.mountComponent (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:5742)
    at Object.mountComponent (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:92:18733)
    at performInitialMount (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:6856)
    at p.mountComponent (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:5742)
    at Object.mountComponent (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:92:18733)
    at h.mountChildren (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:92:15330)
    at h._createInitialChildren (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:19457)
    at h.mountComponent (https://s3.amazonaws.com/workflo-infra/component-library/component-library.js:91:17601)"
        />
      </div>
    </Preview>

  </PreviewContainer>
))
