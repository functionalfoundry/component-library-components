import React from 'react'
import {
  Icon,
  Popover,
  RadioGroup,
  Radio,
  View,
} from '@workflo/components'
import {
  Spacing,
} from '@workflo/styles'

type InputTypeT = 'Radio'

type PropsT = {
  icon: string,
  input: {
    key: string,
    type: InputTypeT,
    options: Array<string>,
    value: string,
  },
  onChange: Function,
}

class QuickAction extends React.Component {
  props: PropsT
  static defaultProps = {
    input: {},
    onChange: () => {}
  }

  render () {
    const {
      icon,
      input,
      onChange,
    } = this.props
    return (
      <View
        inline
        theme={{
          view: {
            marginLeft: Spacing.tiny, // AWEFULLEST OF HACKS
          },
        }}
      >
      {input &&
        <Popover
          pointerVertical='Bottom'
          pointerHorizontal='Center'
          targetVertical='Top'
          targetHorizontal='Center'
          portal={(
            <Radios
              options={input.options}
              value={input.value}
              onChange={(value) => onChange(value)}
            />
          )}
        >
          <Icon
            name={icon}
            size='base'
          />
        </Popover>}
      </View>
    )
  }
}

const Radios = ({
  options,
  value,
  onChange,
}) => (
  <RadioGroup
    value={value}
    onChange={onChange}
    theme={{
      radioGroup: {
        marginRight: 20,
      },
    }}
  >
    {options.map((option) => (
      <Radio
        key={option}
        label={option}
        value={option}
      />
    ))}
  </RadioGroup>
)

export default QuickAction
