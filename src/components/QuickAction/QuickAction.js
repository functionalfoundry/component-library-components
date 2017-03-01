import React from 'react'
import {
  Icon,
  RadioGroup,
  Radio,
  View,
  Text,
} from '@workflo/components'
import {
  Colors,
  Spacing,
} from '@workflo/styles'
import AlignedPointer from '@workflo/components/lib/AlignedPointer'
import IconButtonGroup from '@workflo/components/lib/IconButtonGroup/IconButtonGroup'

type InputTypeT = 'Radio' | 'Button'

type PropsT = {
  icon: string,
  input: {
    key: string,
    type: InputTypeT,
    options: Array<string>,
    value: string,
  },
  label: string,
  shade: 'Dark' | 'Light',
  onChange: Function,
  onClick: Function,
  onOpen: Function,
  onClose: Function,

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
  label,
  shade,
  onChange,
  onClick,
  onOpen,
  onClose,
}) => {
  if (!input && !input.type) return null
  switch (input.type) {
    case 'Radio':
      return (
        <AlignedPointer
          position='Top'
          targetTriggers={['Click inside', 'Mouse enter', 'Mouse leave']}
          portalTriggers={['Click outside', 'Mouse leave']}
          onOpen={onOpen}
          onClose={onClose}
          portal={(
            <View
              theme={{
                view: {
                  alignItems: 'center',
                },
              }}
            >
              <Text
                theme={{
                  text: {
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  },
                }}
              >
                {label}
              </Text>
              <Radios
                options={input.options}
                value={input.value}
                onChange={(value) => onChange(value)}
                theme={{
                  radios: {
                    marginRight: 40,
                  },
                }}
              />
            </View>
          )}
        >
          <Icon
            name={icon}
            size='large'
            onClick={onClick}
            stroke={getColor(shade)}
            fill={getColor(shade)}
            theme={{
              icon: {
                cursor: 'pointer',
                display: 'inline-block',
              }
            }}
          />
        </AlignedPointer>
      )
    case 'Button':
      const iconElement = (
        <Icon
          name={icon}
          size='large'
          stroke={getColor(shade)}
          fill={getColor(shade)}
          onClick={onClick}
          theme={{
            icon: {
              cursor: 'pointer',
              display: 'inline-block',
            }
          }}
        />
      )
      if (label) {
        return (
          <AlignedPointer
            position='Top'
            targetTriggers={['Mouse enter', 'Mouse leave']}
            portalTriggers={['Mouse leave']}
            portal={(
              <View
                theme={{
                  view: {
                    alignItems: 'center',
                  },
                }}
              >
                <Text
                  theme={{
                    text: {
                      textTransform: 'uppercase',
                    },
                  }}
                >
                  {label}
                </Text>
              </View>
            )}
          >
            {iconElement}
          </AlignedPointer>
        )
      }
      return iconElement
    case 'Icon':
      return (
        <AlignedPointer
          position='Top'
          targetTriggers={['Click inside', 'Mouse enter', 'Mouse leave']}
          portalTriggers={['Click outside', 'Mouse leave']}
          onOpen={onOpen}
          onClose={onClose}
          portal={(
            <View
              theme={{
                view: {
                  alignItems: 'center',
                },
              }}
            >
              <Text
                theme={{
                  text: {
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  },
                }}
              >
                {label}
              </Text>
              <IconButtonGroup
                onChange={(value) => onChange(value)}
                icons={input.options}
                selectedIconName={input.value}
              />
            </View>
          )}
        >
          <Icon
            name={icon}
            size='large'
            onClick={onClick}
            stroke={getColor(shade)}
            fill={getColor(shade)}
            theme={{
              icon: {
                cursor: 'pointer',
                display: 'inline-block',
              }
            }}
          />
        </AlignedPointer>
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
    {options.map((option, index) => (
      <Radio
        key={index}
        label={option}
        value={option}
      />
    ))}
  </RadioGroup>
)

const getColor = (shade) =>
  shade === 'Dark' ? Colors.grey900 : Colors.grey400

export default QuickAction
