/** @flow */

import { List, Record } from 'immutable'
import type { ComponentTreeNodeT } from './ComponentTree'

type ComponentTreeLayoutElementT = {
  text: string,
  tags: List<?string>,
  node: ?ComponentTreeNodeT,
}

type ComponentTreeLayoutT = {
  elements: List<?ComponentTreeLayoutElementT>,
}

/**
 * ComponentTreeLayout implementation
 */

const ComponentTreeLayout = Record({
  elements: List(),
})

export { ComponentTreeLayout }

/**
 * Layout generation
 */

const generateTreeLayout = (tree: ComponentTree) => {
}

export { generateTreeLayout }

/**
 * Markup generation
 */

const generateTreeLayoutMarkup = (layout: ComponentTreeLayout) => ''

export { generateTreeLayoutMarkup }
