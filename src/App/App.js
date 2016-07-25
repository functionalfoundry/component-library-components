import React from 'react'
import Header from '../Header'
import {
  View,
} from '@workflo/components'
import {
  Colors,
  Spacing,
} from '@workflo/styles'

type Props = {
  profile: Object,
  content: any,
  backgroundColor: String,
  layout: Object,
  navigation: Object,
}

const App = ({
  profile,
  layout = {},
  navigation = {},
  backgroundColor = Colors.steel2,
}: Props) => (
  <View
    style={styles.container}
  >
    <View
      style={styles.header}
    >
      <Header
        profile={profile}
        onClickBack={navigation.onClickBack}
        title={navigation.title}
        subtitle={navigation.subtitle}
      />
    </View>
    <View
      style={{ ...styles.content, backgroundColor }}
    >
      {layout.content}
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
    flex: '1 0 92px',
    margin: Spacing.small,
    boxSizing: 'border-box',
    backgroundColor: Colors.steel2,
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    paddingBottom: Spacing.base,
    backgroundColor: Colors.aluminum6,
  },
}

export default App
