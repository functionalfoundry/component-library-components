/** @flow */
'use strict'

import React from 'react'
import Theme from 'js-theme'
import { Tab, TabList, Tabs, View } from '@workflo/components'

const defaultProps = {
}

const defaultTheme = {
  themePreferences: {},
}

const ThemePreferences = ({ children, theme, ...props }) => (
  <div>Hello</div>
)

ThemePreferences.defaultProps = defaultProps

const ThemedThemePreferences = Theme('ThemePreferences', defaultTheme)(ThemePreferences)
export default ThemedThemePreferences