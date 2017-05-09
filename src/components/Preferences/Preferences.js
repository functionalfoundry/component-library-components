/** @flow */
'use strict'

import React from 'react'
import Theme from 'js-theme'
import { Spacing } from '@workflo/styles'
import { Tab, Tabs, TabList, TabPanel, View } from '@workflo/components'

const defaultProps = {}

const defaultTheme = {
  preferences: {},
}

const Preferences = ({ children, theme, ...props }) => (
  <View {...theme.preferences}>
    <Tabs
      kind="Primary"
      theme={{
        tabs: {
          marginTop: Spacing.tiny, // Remove when we add padding option to app layout
          color: 'white',
        },
      }}
    >
      <TabList>
        {React.Children.map(children, (child, index) => (
          <Tab key={`tab-${index}`}>
            {child.props.title}
          </Tab>
        ))}
      </TabList>
      {React.Children.map(children, (child, index) => (
        <TabPanel
          key={`panel-${index}`}
          theme={{
            tabPanel: {},
          }}
        >
          {child}
        </TabPanel>
      ))}
    </Tabs>
  </View>
)

Preferences.defaultProps = defaultProps

const ThemedPreferences = Theme('Preferences', defaultTheme)(Preferences)
export default ThemedPreferences
