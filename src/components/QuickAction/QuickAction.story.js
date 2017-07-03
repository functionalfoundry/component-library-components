import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Preview from '@workflo/components/lib/Preview'
import PreviewContainer from '@workflo/components/lib/PreviewContainer/PreviewContainer'
import { FilledTextInput, Select } from '@workflo/components'
import QuickAction from './QuickAction'
import { Colors, Spacing } from '@workflo/styles'

storiesOf('Quick Action', module).add('Regular', () => (
  <PreviewContainer>
    <Preview theme={previewTheme} label="Radio">
      <QuickAction
        icon="theme"
        shade="Light"
        label="Theme"
        input={{
          options: ['Light', 'Dark', 'Grey'],
          value: 'Dark',
          type: 'Radio',
        }}
        onClick={action('onClick')}
      />
    </Preview>
    <Preview theme={previewTheme} label="Icon">
      <QuickAction
        icon="alignment"
        label="Alignment"
        shade="Light"
        input={{
          type: 'Icon',
          value: 'align-left',
          options: [
            {
              name: 'align-left',
              hint: 'Left',
            },
            {
              name: 'align-center',
              hint: 'Center',
            },
            {
              name: 'align-right',
              hint: 'Right',
            },
          ],
        }}
        onClick={action('onClick')}
      />
    </Preview>
    <Preview theme={previewTheme} label="Button">
      <QuickAction
        icon="delete"
        shade="Light"
        label="Delete"
        input={{
          type: 'Button',
        }}
        onClick={action('onClick')}
      />
    </Preview>
    <Preview theme={previewTheme} label="Custom Element">
      <QuickAction
        icon="align-center"
        shade="Light"
        label="Size"
        input={{
          type: 'Custom',
          element: <CustomContainer />,
        }}
      />
    </Preview>
  </PreviewContainer>
))

const previewTheme = {
  content: {
    height: 200,
    paddingTop: 100,
    paddingLeft: 100,
    backgroundColor: Colors.grey900,
  },
}

class CustomContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      width: '768',
      height: 400,
      preset: 'Apple',
    }
  }

  handleChangeWidth = width => {
    this.setState({ width })
  }

  handleChangeHeight = height => {
    this.setState({ height })
  }

  handleChangePreset = preset => {
    this.setState({ preset })
  }

  render() {
    const { width, height, preset } = this.state
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', marginBottom: Spacing.tiny }}>
          <div style={{ marginRight: Spacing.tiny, display: 'flex' }}>
            <FilledTextInput
              label="Width"
              onChange={this.handleChangeWidth}
              value={width}
              width={60}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <FilledTextInput
              label="Height"
              onChange={this.handleChangeHeight}
              value={height}
              width={60}
            />
          </div>
        </div>
        {/*
        <Select
          options={items}
          value={preset}
          onChange={this.handleChangePreset}
          width={88}
        />
        */}
      </div>
    )
  }
}

const items = [
  { id: 'apple', label: 'Apple' },
  { id: 'apricot', label: 'Apricot' },
  { id: 'banana', label: 'Banana' },
  { id: 'cherry', label: 'Cherry' },
]
