import React from 'react'
import { storiesOf } from '@kadira/storybook'
import LiveView from './LiveView'
import { components, states, properties, propKeyValues } from '../../mocks/components'
import { profile } from '../../mocks/profile'

const component = components[0]
component.implementation = () => (
  <div
    style={{
      width: 100,
      height: 100,
      backgroundColor: 'red',
    }}
  />
)

storiesOf('Live View', module)
  .add('Regular', () => (
    <LiveView
      component={component}
      componentState={states[0]}
      propKeyValues={propKeyValues}
      profile={profile}
      onUpdatePropKeyValue={() => {}}
    />
  ))

  // class StoryContainer extends React.Component {
  //   constructor(props) {
  //     super(props)
  //     this.state = {
  //       propKeyValues: [
  //         {
  //           key: 'comment',
  //           type: 'variable',
  //           value: 'comment',
  //           options: [
  //             'comment',
  //             'description',
  //             'user',
  //           ],
  //         },
  //         {
  //           key: 'description',
  //           type: 'variable',
  //           value: 'description',
  //           options: [
  //             'comment',
  //             'description',
  //             'user',
  //           ],
  //         },
  //         {
  //           key: 'size',
  //           type: 'string',
  //           value: 'Base',
  //           options: [
  //             'Tiny',
  //             'Small',
  //             'Base',
  //             'Large',
  //             'Huge',
  //           ],
  //         },
  //         {
  //           key: 'likeCount',
  //           type: 'number',
  //           value: 21,
  //         },
  //       ]
  //     }
  //   }
  //
  //   handleChange = (key, val) => {
  //     const propKeyValue = this.state.propKeyValues
  //       .find((propKeyValue) => propKeyValue.key === key)
  //     const index = this.state.propKeyValues.indexOf(propKeyValue)
  //     const newPropKeyValues = [...this.state.propKeyValues]
  //     newPropKeyValues[index].value = val
  //     this.setState({ propKeyValues: newPropKeyValues })
  //   }
  //
  //   render() {
  //     return (
  //       <TextEditor
  //         componentName='Comment'
  //         propKeyValues={this.state.propKeyValues}
  //         onChange={this.handleChange}
  //       />
  //     )
  //   }
  // }

  // import React from 'react'
  // import { storiesOf } from '@kadira/storybook'
  // import TextEditor from '.'
  // import DataEditor from './DataEditor'
  // import PreviewContainer from '../PreviewContainer/PreviewContainer'
  // import Preview from '../Preview'
  //
  // storiesOf('TextEditor', module)
  //   .add('Regular', () => (
  //     <PreviewContainer
  //       shade='dark'
  //     >
  //       <Preview
  //         label='Code'
  //       >
  //         <StoryContainer />
  //       </Preview>
  //       <Preview
  //         label='Data'
  //       >
  //         <DataContainer />
  //       </Preview>
  //     </PreviewContainer>
  //   ))
  //

  //
  // class DataContainer extends React.Component {
  //   constructor(props) {
  //     super(props)
  //     this.state = {
  //       propKeyValues: [
  //         {
  //           key: 'comment',
  //           type: 'variable',
  //           value: 'comment',
  //           options: [
  //             'comment',
  //             'description',
  //             'user',
  //           ],
  //         },
  //         {
  //           key: 'description',
  //           type: 'variable',
  //           value: 'description',
  //           options: [
  //             'comment',
  //             'description',
  //             'user',
  //           ],
  //         },
  //         {
  //           key: 'size',
  //           type: 'string',
  //           value: 'Base',
  //           options: [
  //             'Tiny',
  //             'Small',
  //             'Base',
  //             'Large',
  //             'Huge',
  //           ],
  //         },
  //         {
  //           key: 'likeCount',
  //           type: 'number',
  //           value: 21,
  //         },
  //       ]
  //     }
  //   }
  //
  //   handleChange = (key, val) => {
  //     const propKeyValue = this.state.propKeyValues
  //       .find((propKeyValue) => propKeyValue.key === key)
  //     const index = this.state.propKeyValues.indexOf(propKeyValue)
  //     const newPropKeyValues = [...this.state.propKeyValues]
  //     newPropKeyValues[index].value = val
  //     this.setState({ propKeyValues: newPropKeyValues })
  //   }
  //
  //   render() {
  //     return (
  //       <DataEditor
  //         componentName='Comment'
  //         propKeyValues={this.state.propKeyValues}
  //         onChange={this.handleChange}
  //       />
  //     )
  //   }
  // }
