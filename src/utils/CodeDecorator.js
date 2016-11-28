import React from 'react'
import Theme from 'js-theme'
import {
  Colors,
} from '@workflo/styles'

import Radio from '@workflo/components/lib/Radio'
import RadioGroup from '@workflo/components/lib/Radio/RadioGroup'
import Popover from '@workflo/components/lib/Popover'
import View from '@workflo/components/lib/View'
import Trigger from '@workflo/components/lib/Trigger'
import SimpleDecorator from '@workflo/components/lib/TextEditor/SimpleDecorator'
import MultiDecorator from '@workflo/components/lib/TextEditor/MultiDecorator'

const acorn = require('acorn-jsx')

export const componentStrategy = (contentBlock, callback) => {
  const code = contentBlock.getText()
  const ast = acorn.parse(code, {
    plugins: { jsx: true }
  })
  const components = []
  let componentNode = ast.body[0].expression.openingElement
  components.push({
    name: componentNode.name.name,
    start: componentNode.name.start,
    end: componentNode.name.end,
  })
  components.forEach((component) => {
    callback(component.start, component.end)
  })
}

export const propStrategy = (contentBlock, callback) => {
  const code = contentBlock.getText()
  const ast = acorn.parse(code, {
    plugins: { jsx: true }
  })
  const props = []
  let attributes = ast.body[0].expression.openingElement.attributes
  attributes.forEach((attribute) => {
    props.push({
      name: attribute.name.name,
      start: attribute.name.start,
      end: attribute.name.end,
    })
  })
  props.forEach((prop, index) => {
    callback(prop.start, prop.end, { attribute: prop.name })
  })
}

export const valueStrategy = (contentBlock, callback) => {
  const code = contentBlock.getText()
  const ast = acorn.parse(code, {
    plugins: { jsx: true }
  })
  const values = []
  let attributes = ast.body[0].expression.openingElement.attributes
  attributes.forEach((attribute, index) => {
    if (attribute.value.type === 'JSXExpressionContainer') {
      values.push({
        name: attribute.value.expression.name,
        start: attribute.value.expression.start,
        end: attribute.value.expression.end,
        index,
      })
    } else if (attribute.value.type === 'Literal') {
      values.push({
        name: attribute.value.value,
        start: attribute.value.start + 1, // Don't include quote
        end: attribute.value.end - 1,
        index,
      })
    }
  })
  values.forEach((value) => {
    callback(value.start, value.end, { index: value.index })
  })
}

const ComponentSpan = ({
  theme,
  children,
  ...props
}) => (
  <span
    {...theme.componentSpan}
  >
    {children}
  </span>
)

class PropSpan extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowingMinus: false,
    }
  }

  handleToggleShowing = () => {
    this.setState({
      isShowingMinus: !this.state.isShowingMinus,
    })
  }

  render () {
    const {
      theme,
      children,
      attribute,
      onRemoveProp,
      ...props
    } = this.props
    const {
      isShowingMinus,
    } = this.state

    return (
      <span
        {...theme.propSpan}
      >

        <Trigger
          triggerOn={['Hover', 'Mouse leave']}
          onTrigger={this.handleToggleShowing}
        >
          <span {...theme.propRemoveWrapper}>
            {isShowingMinus &&
              <span
                onClick={() => onRemoveProp(attribute)}
              >
                {'-'}
              </span>}
          </span>
        </Trigger>
        {children}
      </span>
    )
  }
}

const getValue = (propKeyValues, index) => {
  const propKeyValue = propKeyValues[index]
  return propKeyValue
}

const ValueSpan = ({
  theme,
  children,
  onChange,
  propKeyValues,
  index,
  ...props
}) => (
  <View
    inline
  >
    {propKeyValues[index].options &&
      <Popover
        pointerVertical='Center'
        pointerHorizontal='Left'
        targetVertical='Center'
        targetHorizontal='Right'
        horizontalOffset={5}
        verticalOffset={2}
        portal={
          <Radios
            propKey={propKeyValues[index].key}
            options={propKeyValues[index].options}
            value={propKeyValues[index].value}
            onChange={(key, val) => {
              onChange(key, val)
            }}
          />
        }
      >
        <span
          {...theme.value}
        >
          {children}
        </span>
      </Popover>
    }
    {!propKeyValues[index].options &&
      <span
        {...theme.value}
      >
        {children}
      </span>}
  </View>
)

const Radios = ({
  propKey,
  options,
  value,
  onChange,
}) => (
  <RadioGroup
    value={value}
    onChange={(value) => onChange(propKey, value)}
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

const defaultTheme = {
  value: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: Colors.grey200,
    }
  },
  componentSpan: {
    color: 'black',
  },
  propSpan: {
    color: '#009e71',
    position: 'relative',
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

const ThemedComponentSpan = Theme('ComponentSpan', defaultTheme)(ComponentSpan)
const ThemedPropSpan = Theme('PropSpan', defaultTheme)(PropSpan)
const ThemedValueSpan = Theme('ValueSpan', defaultTheme)(ValueSpan)

export const codeDecoratorFactory = (propKeyValues, onRemoveProp, onChange) =>
  new MultiDecorator([
    new SimpleDecorator(componentStrategy, ThemedComponentSpan),
    new SimpleDecorator(propStrategy, ThemedPropSpan, {
      onRemoveProp,
    }),
    new SimpleDecorator(valueStrategy, ThemedValueSpan, {
      propKeyValues,
      onChange,
    }),
  ])
