import React from 'react'
import Title from 'grommet/components/Title'
import GrommetApp from 'grommet/components/App'
import Header from 'grommet/components/Header'
import Footer from 'grommet/components/Footer'
import Section from 'grommet/components/Section'
import Label from 'grommet/components/Label'
import Box from 'grommet/components/Box'
import ComponentCard from '../ComponentCard'
import LiveEditor from '../LiveView'
/* TODO: Move PropertyPane rendering to LiveView */
import PropertyPane from '../LiveView/PropertyPane'
import { components, properties } from '../../mocks/components'

const App = ({
  children,
}) => (
  <div
    style={{
      backgroundColor: '#212D33',
      padding: 24,
    }}
  >
    <section
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
        <ComponentCard
          {...components[0]}
        />
      </div>
      <div
        style={style.column}
      >
        <LiveEditor
        />
      </div>
    </section>
    <section
      style={style.section}
    >
      <div
        style={{
          ...style.column,
          color: '#fefefe',
        }}
      >
          <PropertyPane
            properties={properties}
          />
      </div>
    </section>
  </div>
)

export default App

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
}
