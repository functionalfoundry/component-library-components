import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ComponentStateCard from '.'
import App from 'grommet/components/App'
import Section from 'grommet/components/Section'
import Tiles from 'grommet/components/Tiles'

storiesOf('Component State Card', module)
  .add('Regular', () => (
    <App
      centered={false}
      style={{ backgroundColor: '#333', width: '100%' }}
    >
      <Section
        primary={true}
      >
        <ComponentStateCard
          name='Listing Card'
          owner='Yaniv Tal'
          thumbnail='http://placehold.it/380x380'
        />
      </Section>
    </App>
  ))

const style = {
  section: {
    margin: '0 auto',
    display: 'flex',
  },
  column: {
    margin: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
}