import { List, Map } from 'immutable'

import generateTraversalMap from './generateTraversalMap'
import { regularTree, treeFromRaw } from '../../../../mocks/componentTreeEditor'

/** Test helpers */
const validateNodePointer = nodePointer => {
  expect(nodePointer.type).toBeDefined()
  expect(nodePointer.path).toBeDefined()
  expect(List.isList(nodePointer.path)).toBe(true)
}

const validateTraversalMapType = traversalMap => {
  expect(Map.isMap(traversalMap)).toBe(true)
  expect(traversalMap.count()).toBeGreaterThan(0)
  traversalMap.forEach(node => {
    if (node.previous) {
      validateNodePointer(node.previous)
    }
    if (node.next) {
      validateNodePointer(node.next)
    }
  })
}

/** Local mocks */

const traversalMapFromHardcoded = {
  'List [ "root", "name" ]': {
    previous: null,
    next: { path: ['root', 'props', 0, 'name'], type: 'prop' },
  },
  'List [ "root", "children", 0, "props", 0, "value", "value" ]': {
    previous: { path: ['root', 'children', 0, 'props', 0, 'name'], type: 'prop' },
    next: { type: 'prop', path: ['root', 'children', 0, 'props', 1, 'name'] },
  },
  'List [ "root", "props", 2, "name" ]': {
    previous: { path: ['root', 'props', 1, 'value', 'value'], type: 'prop-value' },
    next: { path: ['root', 'props', 2, 'value', 'value'], type: 'prop-value' },
  },
  'List [ "root", "children", 0, "props", 0, "name" ]': {
    previous: { path: ['root', 'children', 0, 'name'], type: 'component' },
    next: {
      path: ['root', 'children', 0, 'props', 0, 'value', 'value'],
      type: 'prop-value',
    },
  },
  'List [ "root", "children", 1, "props", 1, "name" ]': {
    previous: {
      path: ['root', 'children', 1, 'props', 0, 'value', 'value'],
      type: 'prop-value',
    },
    next: { type: null, path: ['root', 'children', 1, 'add-button'] },
  },
  'List [ "root", "props", 1, "name" ]': {
    previous: { path: ['root', 'props', 0, 'value', 'value'], type: 'prop-value' },
    next: { path: ['root', 'props', 1, 'value', 'value'], type: 'prop-value' },
  },
  'List [ "root", "children", 1, "props", 0, "name" ]': {
    previous: { path: ['root', 'children', 1, 'name'], type: 'component' },
    next: {
      path: ['root', 'children', 1, 'props', 0, 'value', 'value'],
      type: 'prop-value',
    },
  },
  'List [ "root", "props", 3, "name" ]': {
    previous: { path: ['root', 'props', 2, 'value', 'value'], type: 'prop-value' },
    next: { type: null, path: ['root', 'add-button'] },
  },
  'List [ "root", "props", 0, "name" ]': {
    previous: { path: ['root', 'name'], type: 'component' },
    next: { path: ['root', 'props', 0, 'value', 'value'], type: 'prop-value' },
  },
  'List [ "root", "children", 3, "props", 0, "name" ]': {
    previous: { path: ['root', 'children', 3, 'name'], type: 'component' },
    next: { type: null, path: ['root', 'children', 3, 'add-button'] },
  },
  'List [ "root", "props", 1, "value", "value" ]': {
    previous: { path: ['root', 'props', 1, 'name'], type: 'prop' },
    next: { path: ['root', 'props', 2, 'name'], type: 'prop' },
  },
  'List [ "root", "children", 1, "add-button" ]': {
    previous: { type: 'prop', path: ['root', 'children', 1, 'props', 1, 'name'] },
    next: { path: ['root', 'children', 2, 'name'], type: 'component' },
  },
  'List [ "root", "props", 0, "value", "value" ]': {
    previous: { path: ['root', 'props', 0, 'name'], type: 'prop' },
    next: { path: ['root', 'props', 1, 'name'], type: 'prop' },
  },
  'List [ "root", "children", 3, "name" ]': {
    previous: { type: null, path: ['root', 'children', 2, 'add-button'] },
    next: { type: 'prop', path: ['root', 'children', 3, 'props', 0, 'name'] },
  },
  'List [ "root", "children", 1, "props", 0, "value", "value" ]': {
    previous: { path: ['root', 'children', 1, 'props', 0, 'name'], type: 'prop' },
    next: { type: 'prop', path: ['root', 'children', 1, 'props', 1, 'name'] },
  },
  'List [ "root", "children", 0, "name" ]': {
    previous: { type: null, path: ['root', 'add-button'] },
    next: { path: ['root', 'children', 0, 'props', 0, 'name'], type: 'prop' },
  },
  'List [ "root", "children", 1, "name" ]': {
    previous: { type: null, path: ['root', 'children', 0, 'add-button'] },
    next: { path: ['root', 'children', 1, 'props', 0, 'name'], type: 'prop' },
  },
  'List [ "root", "children", 2, "props", 0, "name" ]': {
    previous: { path: ['root', 'children', 2, 'name'], type: 'component' },
    next: { type: null, path: ['root', 'children', 2, 'add-button'] },
  },
  'List [ "root", "children", 3, "add-button" ]': {
    previous: { type: 'prop', path: ['root', 'children', 3, 'props', 0, 'name'] },
    next: null,
  },
  'List [ "root", "children", 2, "add-button" ]': {
    previous: { type: 'prop', path: ['root', 'children', 2, 'props', 0, 'name'] },
    next: { path: ['root', 'children', 3, 'name'], type: 'component' },
  },
  'List [ "root", "children", 0, "props", 1, "name" ]': {
    previous: {
      path: ['root', 'children', 0, 'props', 0, 'value', 'value'],
      type: 'prop-value',
    },
    next: { type: null, path: ['root', 'children', 0, 'add-button'] },
  },
  'List [ "root", "children", 2, "name" ]': {
    previous: { type: null, path: ['root', 'children', 1, 'add-button'] },
    next: { type: 'prop', path: ['root', 'children', 2, 'props', 0, 'name'] },
  },
  'List [ "root", "add-button" ]': {
    previous: { type: 'prop', path: ['root', 'props', 3, 'name'] },
    next: { path: ['root', 'children', 0, 'name'], type: 'component' },
  },
  'List [ "root", "children", 0, "add-button" ]': {
    previous: { type: 'prop', path: ['root', 'children', 0, 'props', 1, 'name'] },
    next: { path: ['root', 'children', 1, 'name'], type: 'component' },
  },
  'List [ "root", "props", 2, "value", "value" ]': {
    previous: { path: ['root', 'props', 2, 'name'], type: 'prop' },
    next: { type: 'prop', path: ['root', 'props', 3, 'name'] },
  },
}

const traversalMapFromRaw = {
  'List [ "root", "name" ]': {
    previous: null,
    next: {
      path: ['root', 'props', 0, 'name'],
      type: 'prop',
    },
  },
  'List [ "root", "children", 0, "props", 0, "value", "value" ]': {
    previous: {
      path: ['root', 'children', 0, 'props', 0, 'name'],
      type: 'prop',
    },
    next: {
      type: 'prop',
      path: ['root', 'children', 0, 'props', 1, 'name'],
    },
  },
  'List [ "root", "children", 0, "props", 0, "name" ]': {
    previous: {
      path: ['root', 'children', 0, 'name'],
      type: 'component',
    },
    next: {
      path: ['root', 'children', 0, 'props', 0, 'value', 'value'],
      type: 'prop-value',
    },
  },
  'List [ "root", "props", 1, "name" ]': {
    previous: {
      path: ['root', 'props', 0, 'value', 'value'],
      type: 'prop-value',
    },
    next: {
      type: null,
      path: ['root', 'add-button'],
    },
  },
  'List [ "root", "props", 0, "name" ]': {
    previous: {
      path: ['root', 'name'],
      type: 'component',
    },
    next: {
      path: ['root', 'props', 0, 'value', 'value'],
      type: 'prop-value',
    },
  },
  'List [ "root", "props", 0, "value", "value" ]': {
    previous: {
      path: ['root', 'props', 0, 'name'],
      type: 'prop',
    },
    next: {
      type: 'prop',
      path: ['root', 'props', 1, 'name'],
    },
  },
  'List [ "root", "children", 0, "name" ]': {
    previous: {
      type: null,
      path: ['root', 'add-button'],
    },
    next: {
      path: ['root', 'children', 0, 'props', 0, 'name'],
      type: 'prop',
    },
  },
  'List [ "root", "children", 0, "props", 1, "name" ]': {
    previous: {
      path: ['root', 'children', 0, 'props', 0, 'value', 'value'],
      type: 'prop-value',
    },
    next: {
      type: null,
      path: ['root', 'children', 0, 'add-button'],
    },
  },
  'List [ "root", "add-button" ]': {
    previous: {
      type: 'prop',
      path: ['root', 'props', 1, 'name'],
    },
    next: {
      path: ['root', 'children', 0, 'name'],
      type: 'component',
    },
  },
  'List [ "root", "children", 0, "add-button" ]': {
    previous: {
      type: 'prop',
      path: ['root', 'children', 0, 'props', 1, 'name'],
    },
    next: null,
  },
}

/** Tests */
test('generateTraversalMap: Generates a correct traversal map from hardcoded ComponentTree', () => {
  const result = generateTraversalMap(regularTree)
  validateTraversalMapType(result)
  expect(result.toJS()).toEqual(traversalMapFromHardcoded)
})

test('generateTraversalMap: Generates a correct traversal map from ComponentTree constructed from raw data', () => {
  const result = generateTraversalMap(treeFromRaw)
  validateTraversalMapType(result)
  expect(JSON.parse(JSON.stringify(result.toJS()))).toEqual(traversalMapFromRaw)
})
