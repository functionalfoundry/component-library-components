/** @flow */
'use strict'

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import { PreviewContainer } from '@workflo/components'

import InfoTable from './InfoTable'
import InfoTableRow from './InfoTableRow'

storiesOf('InfoTable', module).add('Regular', () => (
  <PreviewContainer>
    <Preview label="With strings">
      <InfoTable>
        <InfoTableRow title="Name" info="Joris Voorn" />
        <InfoTableRow title="Occupation" info="DJ" />
      </InfoTable>
    </Preview>
    <Preview label="With elements">
      <InfoTable>
        <InfoTableRow
          title={<span>Name</span>}
          info={<span style={{ color: 'red' }}>Joris Voorn</span>}
        />
        <InfoTableRow title={<span>Occupation</span>} info={<span>DJ</span>} />
      </InfoTable>
    </Preview>
  </PreviewContainer>
))
