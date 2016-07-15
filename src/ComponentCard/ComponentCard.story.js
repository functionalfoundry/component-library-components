import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ComponentCard from '.'
import App from 'grommet/components/App'
import Section from 'grommet/components/Section'
import Tiles from 'grommet/components/Tiles'

storiesOf('Component Card', module)
  .add('Regular', () => (
    <App
      centered={false}
      style={{ backgroundColor: '#efefef' }}
    >
      <Section
        primary={true}
      >
        <Tiles
          justify='center'
          flush={false}
          size='large'
        >
          <ComponentCard
            name='Listing Card'
            owner='Yaniv Tal'
            thumbnail='http://placehold.it/380x380'
          />
        </Tiles>
      </Section>
    </App>
  ))
