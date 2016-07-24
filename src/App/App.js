import React from 'react'
import Header from '../Header'
import ComponentStateList from '../ComponentStateList'
import {
  View,
} from '@workflo/components'
import {
  Colors,
  Spacing,
} from '@workflo/styles'

type Props = {
  profile: Object,
  states: Array<Object>,
}

const App = ({
  profile,
  states,
}: Props) => (
  <View
    style={styles.container}
  >
    <View
      style={styles.header}
    >
      <Header
        profile={profile}
      />
    </View>
    <View
      style={styles.content}
    >
      <ComponentStateList
        states={states}
      />
    </View>
  </View>
)

const styles = {
  container: {
    backgroundColor: Colors.steel2,
    color: Colors.aluminum5,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    alignItems: 'stretch',
  },
  header: {
    flex: 1,
    margin: Spacing.base,
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    marginBottom: Spacing.base,
  },
}

export default App
