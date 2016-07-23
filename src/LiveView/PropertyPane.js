import React from 'react'
import Table from 'grommet/components/Table'
import {
  Colors,
} from '@workflo/styles'

type Props = {
  properties: Array<Object>,
}

const PropertyPane = ({
  properties = [],
}: Props) => (
  <Table>
    <tbody>
      {properties.map((property, index) => (
        <tr key={index}>
          <td style={style.name}>
            {property.name}
          </td>
          <td>
            {property.type}
          </td>
          <td>
            {property.default}
          </td>
          <td style={style.description}>
            {property.description}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
)

export default PropertyPane

const style = {
  section: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  column: {
    margin: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  name: {
    color: '#02c95d',
  },
  description: {
    color: Colors.aluminum2,
  },
}
