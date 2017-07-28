import React from 'react'
import { Icon, RadioGroup, Radio, View, Text } from '@workflo/components'
import { Colors, Fonts, Spacing } from '@workflo/styles'
import AlignedPointer from '@workflo/components/lib/AlignedPointer'
import IconButtonGroup from '@workflo/components/lib/IconButtonGroup/IconButtonGroup'

type InputTypeT = 'Radio' | 'Button' | 'Custom' | 'SuperCustom'
type IconKindT = 'Primary' | 'Secondary'

type PropsT = {
  children: React.Children,
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
  paddingTop?: number,
  paddingBottom?: number,
}

class QuickAction extends React.Component {
  props: PropsT

  render() {
    return (
      <View inline>
        <Content {...this.props} />
      </View>
    )
  }
}

const Content = ({
  children,
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
  paddingTop,
  paddingBottom,
}: PropsT) => {
  if (!input && !input.type) return null
  switch (input.type) {
    case 'SuperCustom':
      return children
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
          paddingTop={paddingTop}
          paddingBottom={paddingBottom}
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
                      fontSize: 15,
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
                view: getButtonWrapperStyle({ paddingTop, paddingBottom }),
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
            view: getButtonWrapperStyle({
              isButton: true,
              hasLabel: true,
              paddingTop,
              paddingBottom,
            }),
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
          paddingBottom={paddingBottom}
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
          paddingBottom={paddingBottom}
          paddingTop={paddingTop}
        >
          {input.element}
        </BaseQuickAction>
      )
    default:
      console.error('Invalid input type set for QuickAction')
  }
}

QuickAction.defaultProps = {
  input: {},
  onChange: () => {},
  shade: 'Dark',
  iconKind: 'Secondary',
  paddingTop: 4,
  paddingBottom: 4,
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
  paddingTop,
  paddingBottom,
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
        view: getButtonWrapperStyle({ paddingTop, paddingBottom }),
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
  fontSize: 15,
  userSelect: 'none',
}

const getButtonWrapperStyle = ({
  isButton = false,
  hasLabel = false,
  paddingTop = 4,
  paddingBottom = 4,
}) => {
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
    buttonWrapperStyle.top = 4 // Hack because AlignedTrigger offsets the height
    buttonWrapperStyle.height = 40
  }
  buttonWrapperStyle.padding = `${paddingTop}px 10px ${paddingBottom}px 4px`
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
