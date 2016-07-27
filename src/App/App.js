import './insertFont'
import './grommet.css'
import './draft.css'
import './prism.css'
import './editor.css'
import React from 'react'
import Header from '../Header'
import { ActionsT } from '../../types/Action'
import { SearchT } from '../../types/Search'
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
  actions: ActionsT,
  search: SearchT,
}

const App = ({
  profile,
  layout = {},
  navigation = {},
  backgroundColor = Colors.steel2,
  actions,
  search,
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
        actions={actions}
        search={search}
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
    flex: '1',
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
