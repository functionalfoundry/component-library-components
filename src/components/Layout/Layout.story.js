import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Colors } from '@workflo/styles'

import Layout from './'

storiesOf('Layout', module).add('App', () => (
  <Layout.App
    theme={{
      container: {
        color: 'white',
      },
    }}
    header={
      <div style={{ backgroundColor: Colors.primary800, height: '100%', width: '100%' }}>
        Header
      </div>
    }
    leftNav={
      <div style={{ backgroundColor: Colors.primary500, height: '100%', width: '100%' }}>
        Left Nav
      </div>
    }
  >
    <div style={{ backgroundColor: Colors.red200, height: '100%', width: '100%' }}>
      Content
    </div>
  </Layout.App>
))
