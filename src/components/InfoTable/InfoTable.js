import React from 'react'
import InfoTableRow from './InfoTableRow'
import RepoDropdown, { RepoT } from '../RepoDropdown'
import Theme from 'js-theme'
import { Colors, Fonts, Spacing } from '@workflo/styles'

type PropsT = {}

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
  info: {},
}

const ThemedInfoTable = Theme('InfoTable', defaultTheme)(InfoTable)
export default ThemedInfoTable
