import React from 'react'
import { storiesOf } from '@kadira/storybook'
import FocusedView from './FocusedView'
import ComponentCard from './ComponentCard'
import {
  Preview,
  PreviewContainer,
} from '@workflo/components'
import { profile } from '../mocks/profile'

storiesOf('FocusedView', module)
  .add('Regular', () => (
    <PreviewContainer
      flush
      theme={{
        previewContainer: {
          height: 800,
        },
      }}
    >
      <Preview
        label=''
      >
        <FocusedView
          profile={profile}
        >
          <ComponentCard
            name='Listing Card'
            owner='Yaniv Tal'
            profilePhoto='http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg'
            thumbnail='http://placehold.it/380x380'
          />
        </FocusedView>
      </Preview>
    </PreviewContainer>
  ))
