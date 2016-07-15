import React from 'react'
import Title from 'grommet/components/Title'
import GrommetApp from 'grommet/components/App'
import Header from 'grommet/components/Header'
import Footer from 'grommet/components/Footer'
import Section from 'grommet/components/Section'
import Label from 'grommet/components/Label'
import Box from 'grommet/components/Box'
import ComponentStateCard from '../ComponentStateCard'

const ComponentStateList = ({
  children,
  states,
}) => (
  <div
    style={{
      backgroundColor: '#212D33',
      padding: 24,
    }}
  >
    <div
      style={{
        ...style.section,
        backgroundColor: '#fcfcfc',
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
  section: {
    margin: '0 auto',
    display: 'flex',
  },
  column: {
    margin: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  row: {
    margin: 40,
  }
}
