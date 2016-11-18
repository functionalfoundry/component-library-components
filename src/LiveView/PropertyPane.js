import React from 'react'
import Theme from 'js-theme'
import {
  Colors,
  Spacing,
} from '@workflo/styles'

type Props = {
  properties: Array<Object>,
}

const PropertyPane = ({
  properties = [],
  theme,
}: Props) => (
  <table
    {...theme.table}
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
        </tr>
      ))}
    </tbody>
  </table>
)

const defaultTheme = {
  table: {
    fontFamily: '"Roboto Mono"',
    width: '100%',
    maxWidth: '100%',
  },
  name: {
    color: '#02c95d',
    paddingLeft: Spacing.tiny,
    paddingRight: Spacing.small,
    paddingBottom: Spacing.tiny,
  },
  description: {
    color: Colors.grey400,
    paddingLeft: Spacing.tiny,
    paddingRight: Spacing.small,
    paddingBottom: Spacing.tiny,
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
  column: {
    color: Colors.grey200,
    paddingLeft: Spacing.small,
    paddingRight: Spacing.small,
    paddingBottom: Spacing.tiny,
  },
}

export default Theme('PropertyPane', defaultTheme)(PropertyPane)
