import './insertFont'
import './reset.css'
import './grommet.css'
import './draft.css'
import './rc-trigger.css'
import './editor.css'
import React from 'react'
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
    {layout.header && (
      <View
        style={styles.header}
      >
        <View
          style={styles.center}
        >
          <View
            style={styles.maxWidth}
          >
            {layout.header}
          </View>
        </View>
      </View>
    )}
    <View
      style={{ ...styles.content, backgroundColor }}
    >
      <View
        style={styles.center}
      >
        <View
          style={styles.maxWidth}
        >
          {layout.content}
        </View>
      </View>
    </View>
  </View>
)

const styles = {
  container: {
    backgroundColor: Colors.steel2,
    color: Colors.aluminum5,
    display: 'flex',
    flex: '1 1',
    flexDirection: 'column',
  },
  center: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
  },
  maxWidth: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    alignItems: 'stretch',
    flex: '1 1 auto',
    maxWidth: 1200,
  },
  header: {
    flex: '0 0 92px',
    marginLeft: Spacing.large,
    marginRight: Spacing.large,
    marginTop: Spacing.base,
    marginBottom: Spacing.tiny,
    boxSizing: 'border-box',
    backgroundColor: Colors.steel2,
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    paddingBottom: Spacing.huge,
    backgroundColor: Colors.aluminum6,
    marginLeft: Spacing.large,
    marginRight: Spacing.large,
  },
}

export default App
