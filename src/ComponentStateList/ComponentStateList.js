import React from 'react'
import ComponentStateCard from '../ComponentStateCard'
import {
  Spacing,
} from '@workflo/styles'

type Props = {
  children: any,
  states: Array<Object>,
}

const ComponentStateList = ({
  children,
  states,
}: Props) => (
  <div
    style={style.container}
  >
    <div
      style={{
        ...style.section,
      }}
    >
      <div
        style={{
          ...style.column,
          grow: 1,
        }}
      >
        {states.map((state, index) => (
          <div
            key={index}
            style={style.row}
          >
            <ComponentStateCard
              {...state}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default ComponentStateList

const style = {
  container: {
    padding: Spacing.base,
  },
  section: {
    display: 'flex',

  },
  column: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  row: {
    margin: Spacing.base,
    backgroundColor: '#fcfcfc',
  },
}
