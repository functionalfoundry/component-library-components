import { List } from 'immutable'
import { ADD_CHILD, ADD_SIBLING, ADD_PROP } from './constants'

import Helpers from './Helpers'
import { regularTree } from '../../../mocks/componentTreeEditor'

test('findClosestAncestor(): Returns the closest ancestor', () => {
  const sourcePath = List(['root', 'props', 0, 'name'])
  const expectedPath = List(['root', 'props', 0])
  const result = Helpers.findClosestAncestor(regularTree, sourcePath)
  expect(result).not.toBe(null)
  expect(result.path.toJS()).toEqual(expectedPath.toJS())
})

test('findClosestAncestor(): Returns the closest ancestor passing a predicate', () => {
  const sourcePath = List(['root', 'props', 0, 'name'])
  const expectedPath = List(['root'])
  const result = Helpers.findClosestAncestor(
    regularTree,
    sourcePath,
    node => node.nodeType === 'component'
  )
  expect(result).not.toBe(null)
  expect(result.path.toJS()).toEqual(expectedPath.toJS())
})

test('getInsertionPath(): Finds the correct path to insert a child component', () => {
  const sourcePath = List(['root', 'add-button'])
  const expected = List(['root', 'children', 4])
  const result = Helpers.getInsertionPath(regularTree, sourcePath, ADD_CHILD)
  expect(expected).toEqual(result)
})

test('getInsertionPath(): Finds the correct path to insert a sibling component', () => {
  const sourcePath = List(['root', 'children', 0, 'add-button'])
  const expected = List(['root', 'children', 1])
  const result = Helpers.getInsertionPath(regularTree, sourcePath, ADD_SIBLING)
  expect(expected).toEqual(result)
})

test('getInsertionPath(): Finds the correct path to insert a new prop', () => {
  const sourcePath = List(['root', 'add-button'])
  const expected = List(['root', 'props', 3])
  const result = Helpers.getInsertionPath(regularTree, sourcePath, ADD_PROP)
  expect(expected).toEqual(result)
})
