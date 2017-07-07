import React from 'react'
import { Icon, RadioGroup, Radio, View, Text } from '@workflo/components'
import { Colors, Fonts, Spacing } from '@workflo/styles'
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

  render() {
    return (
      <View
        inline
        theme={{
          view: {
            marginLeft: Spacing.tiny / 2, // AWEFULLEST OF HACKS
          },
        }}
      >
        <Content {...this.props} />
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
        <BaseQuickAction
          onOpen={onOpen}
          onClose={onClose}
          showLabelInButton={showLabelInButton}
          label={label}
          shade={shade}
          iconKind={iconKind}
          icon={icon}
          onClick={onClick}
        >
          <Radios
            options={input.options}
            value={input.value}
            onChange={value => onChange(value)}
            theme={{
              radios: {
                marginRight: 40,
              },
            }}
          />
        </BaseQuickAction>
      )
    case 'Button':
      const iconElement = (
        <Icon
          name={icon}
          size="base"
          stroke={getColor(shade, iconKind)}
          fill={getColor(shade, iconKind)}
          theme={{
            icon: {
              display: 'inline-block',
              cursor: 'pointer',
            },
            svg: {
              width: 30,
              height: 30,
            },
          }}
        />
      )
      if (label && !showLabelInButton) {
        return (
          <AlignedPointer
            position="Top"
            openTriggers={['Mouse enter']}
            closeTriggers={['Mouse leave']}
            portal={
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
                      marginTop: 4,
                      marginLeft: 2,
                      fontSize: 14,
                    },
                  }}
                >
                  {label}
                </Text>
              </View>
            }
          >
            <View
              theme={{
                view: getButtonWrapperStyle(),
              }}
              onClick={onClick}
            >
              {iconElement}
              {showLabelInButton &&
                <Text
                  size="small"
                  theme={{
                    text: buttonTextStyle,
                  }}
                >
                  {label}
                </Text>}
            </View>
          </AlignedPointer>
        )
      }
      return (
        <View
          theme={{
            view: getButtonWrapperStyle(true, true),
          }}
          onClick={onClick}
        >
          {iconElement}
          {showLabelInButton &&
            <Text
              size="small"
              theme={{
                text: buttonTextStyle,
              }}
            >
              {label}
            </Text>}
        </View>
      )
    case 'Icon':
      return (
        <BaseQuickAction
          onOpen={onOpen}
          onClose={onClose}
          showLabelInButton={showLabelInButton}
          label={label}
          shade={shade}
          iconKind={iconKind}
          icon={icon}
          onClick={onClick}
        >
          <IconButtonGroup
            onChange={value => onChange(value)}
            icons={input.options}
            selectedIconName={input.value}
          />
        </BaseQuickAction>
      )
    case 'Custom':
      return (
        <BaseQuickAction
          onOpen={onOpen}
          onClose={onClose}
          showLabelInButton={showLabelInButton}
          label={label}
          shade={shade}
          iconKind={iconKind}
          icon={icon}
          onClick={onClick}
        >
          {input.element}
        </BaseQuickAction>
      )
    default:
      console.error('Invalid input type set for QuickAction')
  }
}

const BaseQuickAction = ({
  onOpen,
  onClose,
  showLabelInButton,
  label,
  children,
  shade,
  iconKind,
  icon,
  onClick,
}) => (
  <AlignedPointer
    position="Bottom"
    openTriggers={['Mouse enter']}
    closeTriggers={['Mouse leave']}
    onOpen={onOpen}
    onClose={onClose}
    verticalOffset={-12}
    portal={
      <View
        theme={{
          view: {
            alignItems: 'center',
          },
        }}
      >
        {!showLabelInButton &&
          <Text
            theme={{
              text: baseTextStyle,
            }}
          >
            {label}
          </Text>}
        {children}
      </View>
    }
  >
    <View
      theme={{
        view: getButtonWrapperStyle(),
      }}
    >
      <Icon
        name={icon}
        onClick={onClick}
        stroke={getColor(shade, iconKind)}
        fill={getColor(shade, iconKind)}
        theme={{
          svg: {
            display: 'inline-block',
            width: 24,
            height: 24,
            marginRight: 3,
          },
        }}
      />
      {showLabelInButton &&
        <Text
          size="small"
          theme={{
            text: buttonTextStyle,
          }}
        >
          {label}
        </Text>}
    </View>
  </AlignedPointer>
)

const baseTextStyle = {
  textTransform: 'uppercase',
  marginBottom: 4,
  userSelect: 'none',
}

const buttonTextStyle = {
  color: Colors.grey200,
  marginTop: 4,
  marginLeft: 2,
  fontSize: 14,
  userSelect: 'none',
}

const getButtonWrapperStyle = (isButton = false, hasLabel = false) => {
  let buttonWrapperStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    flex: '0 1 auto',
    cursor: 'default',
  }
  if (isButton) {
    buttonWrapperStyle.cursor = 'pointer'
  }
  if (isButton && hasLabel) {
    buttonWrapperStyle[':hover'] = {
      backgroundColor: 'rgba(100, 100, 100, .2)',
    }
    buttonWrapperStyle[':active'] = {
      backgroundColor: 'rgba(100, 100, 100, .3)',
    }
  }
  if (!isButton) {
    buttonWrapperStyle.top = 3 // Hack because AlignedTrigger offsets the height
  }
  buttonWrapperStyle.padding = '4px 10px 4px 4px'
  return buttonWrapperStyle
}

const Radios = ({ options, value, onChange }) => (
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
        theme={{
          container: {
            ...Fonts.small,
            height: 24,
          },
        }}
      />
    ))}
  </RadioGroup>
)

const getColor = (shade, iconKind) => {
  if (iconKind === 'Primary') return Colors.primary
  return shade === 'Dark' ? Colors.grey900 : Colors.grey400
}

export default QuickAction
