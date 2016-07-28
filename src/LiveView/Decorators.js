import React from 'react'
import Draft from 'draft-js'
const acorn = require('acorn-jsx')
import { StyleSheet, css } from 'aphrodite'

const {
    CompositeDecorator
} = Draft

import {
  Popover,
} from '@workflo/components'
import Radio from '@workflo/components/lib/Radio/Radio'
import RadioGroup from '@workflo/components/lib/Radio/RadioGroup'
import {
  Colors,
} from '@workflo/styles'

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
  props.forEach((prop) => {
    callback(prop.start, prop.end)
  })
}

export const valueStrategy = (contentBlock, callback) => {
  const code = contentBlock.getText()
  const ast = acorn.parse(code, {
    plugins: { jsx: true }
  })
  const values = []
  let attributes = ast.body[0].expression.openingElement.attributes
  attributes.forEach((attribute) => {
    if (attribute.value.type === 'JSXExpressionContainer') {
      values.push({
        name: attribute.value.expression.name,
        start: attribute.value.expression.start,
        end: attribute.value.expression.end,
      })
    } else if (attribute.value.type === 'Literal') {
      values.push({
        name: attribute.value.value,
        start: attribute.value.start + 1, // Don't include quote
        end: attribute.value.end - 1,
      })
    }
  })
  values.forEach((value) => {
    callback(value.start, value.end)
  })
}

const ComponentSpan = (props) => (
  <span
    {...props} style={{color: 'black'}}
  >
    {props.children}
  </span>
)

const PropSpan = (props) => (
  <span
    {...props}
    style={{color: '#009e71'}}
  >
    {props.children}
  </span>
)

const ValueSpan = (props) => (
  <Popover
    renderer={<Radios />}
  >
    <span
      {...props}
      className={css(styles.value)}
    >
      {props.children}
    </span>
  </Popover>
)

export const ReactDecorator = new CompositeDecorator([
  {
    strategy: componentStrategy,
    component: ComponentSpan,
  },
  {
    strategy: propStrategy,
    component: PropSpan,
  },
  {
    strategy: valueStrategy,
    component: ValueSpan,
  },
])

class Radios extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: true }
  }

  render () {
    const { value } = this.state
    return (
      <RadioGroup
        value={value}
        onChange={value => this.setState({ value })}
      >
        <Radio
          label='true'
          value={true}
        />
        <Radio
          label='false'
          value={false}
        />
      </RadioGroup>
    )
  }
}

const styles = StyleSheet.create({
  value: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: Colors.aluminum5,
    }
  }
})

/**
 * Returns array of props from React component passed to input
 * @param {Node} node
 * @returns {Array} Array of all JSX props on React component
 */
// function getReactProps(node, parent) {
//   if (node.openingElement.attributes.length === 0 || htmlElements.indexOf(node.openingElement.name.name) > 0) return {};
//   const result = node.openingElement.attributes
//     .map(attribute => {
//       const name = attribute.name.name;
//       let valueName;
//       if (attribute.value === null) valueName = undefined;
//       else if (attribute.value.type === 'Literal') valueName = attribute.value.value;
//       else if (attribute.value.expression.type === 'Literal') valueName = attribute.value.expression.value;
//       else if (attribute.value.expression.type === 'Identifier') valueName = attribute.value.expression.name;
//       else if (attribute.value.expression.type === 'CallExpression') valueName = attribute.value.expression.callee.object.property.name;
//       else if (attribute.value.expression.type === 'BinaryExpression') valueName = attribute.value.expression.left.name + attribute.value.expression.operator + (attribute.value.expression.right.name || attribute.value.expression.right.value);
//       else if (attribute.value.expression.type === 'MemberExpression') {
//         let current = attribute.value.expression;
//         while (current && current.property) {
//           //  && !current.property.name.match(/(state|props)/)
//           valueName = `.${current.property.name}${valueName || ''}`;
//           current = current.object;
//           if (current.type === 'Identifier') {
//             valueName = `.${current.name}${valueName || ''}`;
//             break;
//           }
//         }
//         valueName = valueName.replace('.', '');
//       } else if (attribute.value.expression.type === 'LogicalExpression') {
//         valueName = attribute.value.expression.left.property.name;
//         valueType = attribute.value.expression.left.object.name;
//       } else if (attribute.value.expression.type === 'JSXElement') {
//         const nodez = attribute.value.expression;
//         const output = {
//           name: nodez.openingElement.name.name,
//           children: getChildJSXElements(nodez, parent),
//           props: getReactProps(nodez, parent),
//           state: {},
//           methods: [],
//         };
//         valueName = output;
//       } else valueName = escodegen.generate(attribute.value);
//
//       return {
//         name,
//         value: valueName,
//         parent,
//       };
//     });
//   return result;
// }
