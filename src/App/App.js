import React from 'react'
import Title from 'grommet/components/Title'
import GrommetApp from 'grommet/components/App'
import Header from 'grommet/components/Header'
import Footer from 'grommet/components/Footer'
import Section from 'grommet/components/Section'
import Label from 'grommet/components/Label'

const App = ({
  children,
}) => (
  <GrommetApp>
    <Header>
    </Header>
    <Section
      primary
    >
     {children}
    </Section>
  </GrommetApp>
)

export default App
