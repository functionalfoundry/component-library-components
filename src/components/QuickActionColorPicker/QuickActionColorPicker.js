import React from 'react'
import Theme from 'js-theme'
import { CustomPicker } from 'react-color'
import { Alpha, Hue, Saturation } from 'react-color/lib/components/common'

import { Spacing } from '@workflo/styles'

import FilledTextInput from '../FilledTextInput'

type Props = {
  /** Current hex value */
  hex: string,
  /** Called with new hex value */
  onChange: Function,
  /** js-theme object */
  theme: Object,
}

class ColorPicker extends React.Component {
  props: Props

  constructor(props) {
    super(props)
    this.state = {
      inputValue: props.hex,
    }
  }

  handleInputChange = hexValue => {
    const { onChange } = this.props
    this.setState({
      inputValue: hexValue,
    })
    const match = hexValue.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
    if (match) {
      const numberValues = match.slice(1).map(hexValue => parseInt(hexValue, 16))
      onChange({ r: numberValues[0], g: numberValues[1], b: numberValues[2] })
    }
  }

  render() {
    const { theme, ...props } = this.props
    const { inputValue } = this.state
    return (
      <div {...theme.colorPicker}>
        <div {...theme.saturationContainer}>
          <Saturation {...props} />
        </div>
        <div {...theme.sliderContainer}>
          <Alpha {...props} />
        </div>
        <div {...theme.sliderContainer}>
          <Hue {...props} />
        </div>
        <div {...theme.inputContainer}>
          <FilledTextInput
            label="Hex"
            onChange={this.handleInputChange}
            value={inputValue}
            width={150}
          />
        </div>
      </div>
    )
  }
}

const defaultTheme = {
  colorPicker: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingLeft: Spacing.pico,
    width: 150 + Spacing.pico,
  },
  inputContainer: {
    marginTop: Spacing.tiny,
  },
  saturationContainer: {
    flexBasis: 150,
    width: 150,
    position: 'relative',
    overflow: 'hidden',
  },
  sliderContainer: {
    height: 10,
    marginTop: Spacing.tiny,
    position: 'relative',
  },
}

export default Theme('ColorPicker', defaultTheme)(CustomPicker(ColorPicker))
