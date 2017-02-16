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

type AnimationT = Object

type SectionT = {
  element: React.Element,
  appearAnimation: AnimationT,
  leaveAnimation: AnimationT,
}

type LayoutT = {
  header?: React.Element | SectionT,
  content?: React.Element | SectionT,
  centerLeft?: React.Element | SectionT,
  centerRight?: React.Element | SectionT,
  bottom?: React.Element | SectionT,
}

type Props = {
  profile: Object,
  layout: LayoutT,
  backgroundColor: String,
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
          {(layout.centerLeft || layout.centerRight) &&
            <View
              {...theme.liveView}
            >
              <View
                {...theme.previewAndEditor}
              >
                <View
                  {...theme.livePreviewContainer}
                >
                  {layout.centerLeft}
                </View>
                <View
                  {...theme.liveEditorContainer}
                >
                  {layout.centerRight}
                </View>
              </View>
            </View>}
          {layout.content}
        </View>
      </View>
    </View>
    {layout.bottom &&
      <View
        {...theme.center}
      >
        <View
          {...theme.maxWidth}
        >
          <View
            {...theme.bottom}
          >
            {layout.bottom}
          </View>
        </View>
      </View>}
  </View>
)

const defaultTheme = (props: Props) => ({
  container: {
    backgroundColor: Colors.grey900,
    color: Colors.grey200,
    display: 'flex',
    flex: '1 1',
    flexDirection: 'column',
    paddingBottom: Spacing.huge,
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
    '@media (max-width: 800px)': {
      marginLeft: Spacing.small,
      marginRight: Spacing.small,
    },
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    backgroundColor: props.backgroundColor,
    marginLeft: Spacing.large,
    marginRight: Spacing.large,
    ...mediumBreakpoint,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    color: Colors.grey700,
    marginBottom: Spacing.large,
    ...mediumBreakpoint,
  },
  liveView: {
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  previewAndEditor: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 0 400px',
  },
  livePreviewContainer: {
    display: 'flex',
    flex: '0 1 60%',
    alignItems: 'stretch',
    // alignContent: 'center',
    // justifyContent: 'center',
  },
  liveEditorContainer: {
    display: 'flex',
    flex: '0 1 40%',
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
})

const mediumBreakpoint = {
  '@media (max-width: 800px)': {
    marginLeft: Spacing.small,
    marginRight: Spacing.small,
  },
}

export default Theme('App', defaultTheme)(App)
