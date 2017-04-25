/* @flow */
import React from 'react'
import Slate from 'slate'
import Theme from 'js-theme'
import Popover from '@workflo/components/lib/Popover'
import Radio from '@workflo/components/lib/Radio'
import RadioGroup from '@workflo/components/lib/Radio/RadioGroup'
import TextInput from '@workflo/components/lib/TextInput'
import Trigger from '@workflo/components/lib/Trigger'
import View from '@workflo/components/lib/View'
import {Colors} from '@workflo/styles'

const acorn = require('acorn-jsx')

import type PropKeyValueT from '../../types/PropKeyValueT'

/**
 * Helpers
 */

const getPropKeyValueByName = (propKeyValues, name) => {
  let matches = propKeyValues.filter(propKeyValue => propKeyValue.key === name)
  if (matches.length > 0) {
    return matches[0]
  }
}

/**
 * JSX marks
 */

const defaultTheme = {
  component: {},
  propName: {
    position: 'relative',
    color: '#009e71',
  },
  propValue: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: Colors.grey200,
    },
  },
  propRemoveWrapper: {
    cursor: 'pointer',
    top: 0,
    left: '-35px',
    width: 35,
    height: 22,
    display: 'inline-block',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

type JSXDecoratorPropsT = {
  theme: Object,
  children: React.Children,
  mark: Slate.Mark,
};

const JSXComponentName = ({children, theme}) => (
  <span {...theme.component}>
    {children}
  </span>
)

const ThemedJSXComponentName = Theme('JSXComponentName', defaultTheme)(
  JSXComponentName,
)

type JSXPropNameStateT = {
  isShowingMinus: boolean,
};

class JSXPropName extends React.Component {
  props: JSXDecoratorPropsT;
  state: JSXPropNameStateT;

  constructor (props) {
    super(props)
    this.state = {
      isShowingMinus: false,
    }
  }

  handleToggleShowing = () => {
    this.setState({
      isShowingMinus: !this.state.isShowingMinus,
    })
  };

  render () {
    const {
      theme,
      children,
      mark,
    } = this.props

    const {
      isShowingMinus,
    } = this.state

    const propName = mark.data.get('propName')
    const onRemoveProp = mark.data.get('onRemoveProp')

    return (
      <span {...theme.propName}>
        <Trigger
          triggerOn={['Hover', 'Mouse leave']}
          onTrigger={this.handleToggleShowing}
        >
          <span {...theme.propRemoveWrapper}>
            {isShowingMinus &&
              <span onClick={() => onRemoveProp(propName)}>
                {'-'}
              </span>}
          </span>
        </Trigger>
        {children}
      </span>
    )
  }
}

const ThemedJSXPropName = Theme('JSXPropName', defaultTheme)(JSXPropName)

const JSXPropValue = (
  {
    theme,
    children,
    mark,
  }: JSXDecoratorPropsT,
) => {
  const onChange = mark.data.get('onChange')
  const propKeyValue = mark.data.get('propKeyValue')
  const {key, input, options, value} = propKeyValue
  console.log('input', input)
  return (
    <View inline>
      {input &&
        <Popover
          position='Right'
          horizontalOffset={5}
          verticalOffset={2}
          portal={<Input
            propKey={key}
            input={input}
            options={options}
            value={value.value}
            onChange={onChange}
            />}
        >
          <span {...theme.propValue}>
            {children}
          </span>
        </Popover>}
      {!input &&
        <span {...theme.value}>
          {children}
        </span>}
    </View>
  )
}

const ThemedJSXPropValue = Theme('JSXPropValue', defaultTheme)(JSXPropValue)

const Input = (
  {
    input,
    propKey,
    options,
    value,
    onChange,
  },
) => {
  switch (input.type) {
    case 'Radio':
      return (
        <Radios
          propKey={propKey}
          options={options}
          value={value}
          onChange={value => onChange(propKey, value)}
        />
      )
    case 'TextInput':
      return (
        <TextInput
          value={value}
          onChange={value => onChange(propKey, value)}
          theme={{
            textInput: {
              borderColor: Colors.primary,
              color: 'white',
            },
          }}
        />
      )
  }
}

const Radios = (
  {
    propKey,
    options,
    value,
    onChange,
  },
) => (
  <RadioGroup
    value={value}
    onChange={onChange}
    theme={{
      radioGroup: {
        marginRight: 20,
      },
    }}
  >
    {options.map(option => (
      <Radio key={option} label={option} value={option} />
    ))}
  </RadioGroup>
)

/**
 * Decorators
 */

const decorateJSXComponentNames = (characters, ast, options) => {
  let node = ast.body[0].expression.openingElement
  return characters.map((char, index) => {
    if (index < node.name.start || index >= node.name.end) {
      return char
    } else {
      let mark = Slate.Mark.create({
        type: 'jsx-component',
        data: {
          componentName: node.name.name,
        },
      })
      return char.merge({
        marks: char.marks.add(mark),
      })
    }
  })
}

const decorateJSXPropNames = (characters, ast, options) => {
  let nodes = ast.body[0].expression.openingElement.attributes
  return characters.map((char, index) =>
    nodes.reduce(
      (char, node) => {
        if (index < node.name.start || index >= node.name.end) {
          return char
        } else {
          let mark = Slate.Mark.create({
            type: 'jsx-prop-name',
            data: {
              propName: node.name.name,
              onRemoveProp: options.onRemoveProp,
            },
          })
          return char.merge({
            marks: char.marks.add(mark),
          })
        }
      },
      char,
    ))
}

const decorateJSXPropValues = (characters, ast, options) => {
  let nodes = ast.body[0].expression.openingElement.attributes
  return characters.map((char, index) =>
    nodes.reduce(
      (char, node) => {
        if (node.value.type === 'JSXExpressionContainer') {
          if (
            index < node.value.expression.start ||
            index >= node.value.expression.end
          ) {
            return char
          } else {
            let mark = Slate.Mark.create({
              type: 'jsx-prop-value',
              data: {
                propName: node.name.name,
                propValue: node.value.name,
                propKeyValue: getPropKeyValueByName(
                  options.propKeyValues,
                  node.name.name,
                ),
                onChange: options.onChange,
              },
            })
            return char.merge({
              marks: char.marks.add(mark),
            })
          }
        } else if (node.value.type === 'Literal') {
          if (index < node.value.start + 1 || index >= node.value.end - 1) {
            return char
          } else {
            let mark = Slate.Mark.create({
              type: 'jsx-prop-value',
              data: {
                propName: node.name.name,
                propValue: node.value.value,
                propKeyValue: getPropKeyValueByName(
                  options.propKeyValues,
                  node.name.name,
                ),
                onChange: options.onChange,
              },
            })
            return char.merge({
              marks: char.marks.add(mark),
            })
          }
        } else {
          return char
        }
      },
      char,
    ))
}

const combineDecorators = (decorators: Array<Function>, options) => {
  return (text: Slate.Text, block: Slate.Block) => {
    try {
      const ast = acorn.parse(text.text, {
        plugins: {jsx: true},
      })
      return decorators.reduce(
        (characters, decorator) => {
          return decorator(characters, ast, options)
        },
        text.characters,
      )
    } catch (error) {
      return text.characters
    }
  }
}

/**
 * CodeEditorPlugin
 */

type PluginOptions = {
  propKeyValues: Array<CodePropKeyValueT>,
  onRemoveProp: Function,
  onChange: Function,
};

const PropKeyValuePlugin = (options: PluginOptions) => {
  return {
    schema: {
      nodes: {
        code: {
          decorate: combineDecorators(
            [
              decorateJSXComponentNames,
              decorateJSXPropNames,
              decorateJSXPropValues,
            ],
            options,
          ),
        },
      },
      marks: {
        'jsx-component': ThemedJSXComponentName,
        'jsx-prop-name': ThemedJSXPropName,
        'jsx-prop-value': ThemedJSXPropValue,
      },
    },
  }
}

export default PropKeyValuePlugin
