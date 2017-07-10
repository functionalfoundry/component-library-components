import React from 'react'
import InfoTableRow from './InfoTableRow'
import Theme from 'js-theme'
import { Colors, Fonts } from '@workflo/styles'

type PropsT = {
  /* Array of InfoTableRow's to display in the table */
  children: any,
  /* The JS Theme */
  theme: Object,
}

/** Displays a simple table with a single header column */
const InfoTable = ({ children, theme }: PropsT) => (
  <table {...theme.table}>
    <tbody>
      {children.map((child, index) => {
        if (child.type === InfoTableRow) {
          return (
            <tr key={index}>
              <th {...theme.title}>
                {child.props.title || ''}
              </th>
              <td {...theme.info}>
                {child.props.info || ''}
              </td>
            </tr>
          )
        }
      })}
    </tbody>
  </table>
)

const defaultTheme = {
  table: { ...Fonts.small },
  title: {
    textAlign: 'left',
    color: Colors.grey400,
    fontWeight: 300,
  },
  info: {
    color: 'white',
  },
}

const ThemedInfoTable = Theme('InfoTable', defaultTheme)(InfoTable)
export default ThemedInfoTable
