import React from 'react'
import {
  Icon,
  Popover,
  RadioGroup,
  Radio,
  View,
} from '@workflo/components'
import {
  Colors,
  Spacing,
} from '@workflo/styles'

type InputTypeT = 'Radio' | 'Button'

type PropsT = {
  icon: string,
  input: {
    key: string,
    type: InputTypeT,
    options: Array<string>,
    value: string,
  },
  shade: 'Dark' | 'Light',
  onChange: Function,
  onClick: Function,
}

class QuickAction extends React.Component {
  props: PropsT
  static defaultProps = {
    input: {},
    onChange: () => {},
    shade: 'Dark',
  }

  render () {
    return (
      <View
        inline
        theme={{
          view: {
            marginLeft: Spacing.tiny, // AWEFULLEST OF HACKS
          },
        }}
      >
        <Content
          {...this.props}
        />
      </View>
    )
  }
}

const Content = ({
  input,
  icon,
  shade,
  onChange,
  onClick,
}) => {
  if (!input && !input.type) return null
  switch (input.type) {
    case 'Radio':
      return (
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
            size='large'
            stroke={getColor(shade)}
            fill={getColor(shade)}
          />
        </Popover>
      )
    case 'Button':
      return (
        <Icon
          name={icon}
          size='large'
          stroke={getColor(shade)}
          fill={getColor(shade)}
          onClick={onClick}
        />
      )
    default:
      console.error('Invalid input type set for QuickAction')
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

const getColor = (shade) =>
  shade === 'Dark' ? Colors.grey900 : Colors.grey400

export default QuickAction
