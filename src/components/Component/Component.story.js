import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import Component from './Component'

storiesOf('Component', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
        theme={{
          preview: {
            width: 300,
          },
        }}
      >
        <Component
          name='Listing Card'
          owner='Yaniv Tal'
          profilePhoto='http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg'
        />
      </Preview>
      <Preview
        label='With thumbnail'
        theme={{
          preview: {
            width: 300,
          },
        }}
      >
        <Component
          name='Listing Card'
          owner='Yaniv Tal'
          profilePhoto='http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg'
          thumbnail='http://res.cloudinary.com/workflo/image/upload/c_fill,g_face,h_200,w_200,x_0/v1468913856/rihanna_ibm9lc.jpg'
        />
      </Preview>
    </PreviewContainer>
  ))
