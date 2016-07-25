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
  name: {
    color: '#02c95d',
  },
  description: {
    color: Colors.aluminum2,
  },
}
