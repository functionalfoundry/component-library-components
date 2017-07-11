import React from 'react'

import PropRenderer from './PropRenderer'
import Line from './Line'

type Props = {
  componentNode: Object,
  indentLevel: number,
}

const getStartTagClosingCharacters = childComponents => `${childComponents.count() > 0 ? '' : '/'}>`

const ComponentRenderer = ({ componentNode, indentLevel = 0 }: Props) => {
  const componentName = componentNode.get('name')
  const componentProps = componentNode.get('props')
  const childComponents = componentNode.get('children')
  return (
    <div>
      <Line
        indentLevel={indentLevel}
      >{`<${componentName}${componentProps.count() === 0 ? getStartTagClosingCharacters(childComponents) : ''}`}</Line>
      {componentProps
        .map(propNode => (
          <PropRenderer indentLevel={indentLevel + 1} propNode={propNode} />
        ))
        .toArray()}
      {componentProps.count() > 0 &&
        <Line indentLevel={indentLevel}>
          {getStartTagClosingCharacters(childComponents)}
        </Line>}
      {childComponents
        .map(childComponent => (
          <ComponentRenderer
            componentNode={childComponent}
            indentLevel={indentLevel + 1}
          />
        ))
        .toArray()}
      {childComponents.count() > 0 && <Line>{`<${componentName} />`}</Line>}
    </div>
  )
}

export default ComponentRenderer
