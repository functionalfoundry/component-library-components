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
          size='medium'
        >
          <ComponentCard
            name='Listing Card'
            owner='Yaniv Tal'
            profilePhoto='http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg'
            thumbnail='http://placehold.it/380x380'
          />
        </Tiles>
      </Section>
    </App>
  ))
