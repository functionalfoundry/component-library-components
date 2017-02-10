import React from 'react'
import Theme from 'js-theme'
import {
  Icon,
} from '@workflo/components'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'

type PropertyT = {
  name: string,
  type: string,
  default: string,
  description: string,
}

type PropsT = {
  properties: Array<PropertyT>,
  onClickPlus: Function,
}

class Properties extends React.Component {
  props: PropsT
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
        {...theme.properties}
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
  borderBottom: `1px solid ${Colors.grey800}`,
  paddingTop: Spacing.tiny,
  paddingLeft: Spacing.tiny,
  paddingRight: Spacing.small,
  paddingBottom: Spacing.tiny,
}

const defaultTheme = {
  properties: {
    ...(Object.assign({}, Fonts.monospace, {
      fontSize: 14,
    })),
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

const ThemedProperties = Theme('Properties', defaultTheme)(Properties)
export default ThemedProperties
