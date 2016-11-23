import React from 'react'
import Theme from 'js-theme'
import {
  Icon,
} from '@workflo/components'
import {
  Colors,
  Spacing,
} from '@workflo/styles'

type Props = {
  properties: Array<Object>,
  onClickPlus: Function,
}

class PropertiesPane extends React.Component {
  getHandleClickPlus = (index) => {
    return () => {
      const { onClickPlus, properties } = this.props
      if (onClickPlus) {
        onClickPlus(properties[index].name)
      }
    }
  }

  render() {
    const {
      properties = [],
      onClickPlus,
      theme,
    } = this.props

    return (
      <table
        {...theme.propertiesPane}
        cellSpacing='0'
      >
        <tbody>
          {properties.map((property, index) => (
            <tr
              {...theme.row}
              key={index}
            >
              <td
                {...theme.name}
              >
                {property.name}
              </td>
              <td
                {...theme.column}
              >
                {property.type}
              </td>
              <td
                {...theme.column}
              >
                {property.default}
              </td>
              <td
                {...theme.description}
              >
                {property.description}
              </td>
              <td
                {...theme.plus}
              >
                <Icon
                  name='add'
                  size='tiny'
                  onClick={this.getHandleClickPlus(index)}
                  theme={{
                    icon: {
                      cursor: 'pointer',
                    }
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

const cellBorder = {
  borderBottom: `1px solid ${Colors.grey700}`,
  paddingTop: Spacing.tiny,
  paddingLeft: Spacing.tiny,
  paddingRight: Spacing.small,
  paddingBottom: Spacing.tiny,
}

const defaultTheme = {
  propertiesPane: {
    fontFamily: '"Roboto Mono"',
    width: '100%',
    maxWidth: '100%',
  },
  name: {
    ...cellBorder,
    paddingLeft: Spacing.small,
    color: '#02c95d',
  },
  description: {
    ...cellBorder,
    color: Colors.grey400,
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
  column: {
    ...cellBorder,
    color: Colors.grey200,
    paddingLeft: Spacing.small,
  },
  plus: {
    ...cellBorder,
  },
}

export default Theme('PropertiesPane', defaultTheme)(PropertiesPane)
