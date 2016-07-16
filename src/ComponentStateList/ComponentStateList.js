import React from 'react'
import Title from 'grommet/components/Title'
import GrommetApp from 'grommet/components/App'
import Header from 'grommet/components/Header'
import Footer from 'grommet/components/Footer'
import Section from 'grommet/components/Section'
import Label from 'grommet/components/Label'
import Box from 'grommet/components/Box'
import ComponentStateCard from '../ComponentStateCard'
import { Colors, Spacing } from '@workflo/styles'

const ComponentStateList = ({
  children,
  states,
}) => (
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
  }
}
