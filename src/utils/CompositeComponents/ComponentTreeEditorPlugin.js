/* @flow */

import React from 'react'
import Theme from 'js-theme'
import { Colors } from '@workflo/styles'

const Slate = require('slate')

import { ComponentTree } from './ComponentTree'

/**
 * Plugin options
 */

type PluginOptionsT = {
  tree: ComponentTree,
}

/**
 * Mark renderers
 */

/**
 * ComponentTreeEditorPlugin implementation
 */

const ComponentTreeEditorPlugin = (options: PluginOptionsT) => ({
  schema: {
  }
})

export default ComponentTreeEditorPlugin
