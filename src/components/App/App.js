import React from 'react'
import Theme from 'js-theme'
import '../../utils/insertFont'
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
  backgroundColor,
  actions,
  search,
  theme,
}: Props) => (
  <View
    {...theme.container}
  >
    {layout.header && (
      <View
        {...theme.header}
      >
        <View
          {...theme.center}
        >
          <View
            {...theme.maxWidth}
          >
            {layout.header}
          </View>
        </View>
      </View>
    )}
    <View
      {...theme.content}
    >
      <View
        {...theme.center}
      >
        <View
          {...theme.maxWidth}
        >
          {layout.content}
        </View>
      </View>
    </View>
  </View>
)

const defaultTheme = (props: Props) => ({
  container: {
    backgroundColor: Colors.grey900,
    color: Colors.grey200,
    display: 'flex',
    flex: '1 1',
    flexDirection: 'column',
  },
  center: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    flexDirection: 'row',
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
    marginLeft: Spacing.large,
    marginRight: Spacing.large,
    marginTop: Spacing.small,
    boxSizing: 'border-box',
    backgroundColor: Colors.steel2,
    '@media (max-width: 800px)': {
      marginLeft: Spacing.small,
      marginRight: Spacing.small,
    },
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    paddingBottom: Spacing.huge,
    backgroundColor: props.backgroundColor || Colors.aluminum6,
    marginLeft: Spacing.large,
    marginRight: Spacing.large,
    '@media (max-width: 800px)': {
      marginLeft: Spacing.small,
      marginRight: Spacing.small,
    },
  },
})

export default Theme('App', defaultTheme)(App)
