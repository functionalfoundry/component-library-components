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
type IconKindT = 'Primary' | 'Secondary'

type PropsT = {
  icon: string,
  iconKind: IconKindT,
  showLabelInButton: boolean,
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
    iconKind: 'Secondary',
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
  iconKind,
  label,
  shade,
  showLabelInButton,
  onChange,
  onClick,
  onOpen,
  onClose,
}: PropsT) => {
  if (!input && !input.type) return null
  switch (input.type) {
    case 'Radio':
      return (
        <AlignedPointer
          position='Top'
          openTriggers={['Mouse enter']}
          closeTriggers={['Mouse leave']}
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
              {!showLabelInButton && (
                <Text
                  theme={{
                    text: {
                      textTransform: 'uppercase',
                      marginBottom: 4,
                    },
                  }}
                >
                  {label}
                </Text>
              )}
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
          <View
            theme={{
              view: getButtonWrapperStyle(false, true),
            }}
          >
            <Icon
              name={icon}
              size='large'
              onClick={onClick}
              stroke={getColor(shade, iconKind)}
              fill={getColor(shade, iconKind)}
              theme={{
                icon: {
                  display: 'inline-block',
                }
              }}
            />
            {showLabelInButton && (
              <Text
                size='small'
                theme={{
                  text: buttonTextStyle,
                }}
              >
                {label}
              </Text>
            )}
          </View>
        </AlignedPointer>
      )
    case 'Button':
      const iconElement = (
        <Icon
          name={icon}
          size='large'
          stroke={getColor(shade, iconKind)}
          fill={getColor(shade, iconKind)}
          theme={{
            icon: {
              display: 'inline-block',
            }
          }}
        />
      )
      if (label && !showLabelInButton) {
        return (
          <AlignedPointer
            position='Top'
            openTriggers={['Mouse enter']}
            closeTriggers={['Mouse leave']}
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
            <View
              theme={{
                view: getButtonWrapperStyle(),
              }}
              onClick={onClick}
            >
              {iconElement}
              {showLabelInButton && (
                <Text
                  size='small'
                  theme={{
                    text: buttonTextStyle,
                  }}
                >
                  {label}
                </Text>
              )}
            </View>
          </AlignedPointer>
        )
      }
      return (
        <View
          theme={{
            view: getButtonWrapperStyle(true, true)
          }}
          onClick={onClick}
        >
          {iconElement}
          {showLabelInButton && (
            <Text
              size='small'
              theme={{
                text: buttonTextStyle,
              }}
            >
              {label}
            </Text>
          )}
        </View>
      )
    case 'Icon':
      return (
        <AlignedPointer
          position='Top'
          openTriggers={['Mouse enter']}
          closeTriggers={['Mouse leave']}
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
              {!showLabelInButton && (
                <Text
                  theme={{
                    text: baseTextStyle,
                  }}
                >
                  {label}
                </Text>
              )}
              <IconButtonGroup
                onChange={(value) => onChange(value)}
                icons={input.options}
                selectedIconName={input.value}
              />
            </View>
          )}
        >
          <View
            theme={{
              view: getButtonWrapperStyle(),
            }}
          >
            <Icon
              name={icon}
              size='large'
              onClick={onClick}
              stroke={getColor(shade, iconKind)}
              fill={getColor(shade, iconKind)}
              theme={{
                icon: {
                  display: 'inline-block',
                }
              }}
            />
            {showLabelInButton && (
              <Text
                size='small'
                theme={{
                  text: buttonTextStyle,
                }}
              >
                {label}
              </Text>
            )}
          </View>
        </AlignedPointer>
      )
    default:
      console.error('Invalid input type set for QuickAction')
  }
}

const baseTextStyle = {
  textTransform: 'uppercase',
  marginBottom: 4,
  userSelect: 'none',
}

const buttonTextStyle = {
  color: Colors.grey200,
  marginLeft: Spacing.tiny,
  marginTop: 2,
  textTransform: 'uppercase',
  userSelect: 'none',
}

const getButtonWrapperStyle = (isButton = false, hasLabel = false) => {
  let buttonWrapperStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    flex: '0 1 auto',
  }
  if (isButton) {
    buttonWrapperStyle.cursor = 'pointer'
  } else {
    buttonWrapperStyle.cursor = 'default'
  }
  if (isButton && hasLabel) {
    buttonWrapperStyle[':hover'] = {
      backgroundColor: 'rgba(100, 100, 100, .2)',
    }
    buttonWrapperStyle[':active'] = {
      backgroundColor: 'rgba(100, 100, 100, .3)',
    }
  }
  if (hasLabel) {
    buttonWrapperStyle.padding = '4px 10px 4px 4px'
  }
  return buttonWrapperStyle
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

const getColor = (shade, iconKind) => {
  if (iconKind === 'Primary') return Colors.primary
  return shade === 'Dark' ? Colors.grey900 : Colors.grey400
}

export default QuickAction
