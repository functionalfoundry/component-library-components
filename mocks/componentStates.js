import React from 'react'
import ReactDOM from 'react-dom'
import {
  exampleBundles,
  rawExampleTree,
} from '../src/components/ComponentState/ComponentState.story'

const getCard = ({ name, alignment, color, size = 'Base', isSelected = false }) => ({
  tree: rawExampleTree,
  bundles: exampleBundles,
  React: React,
  ReactDOM: ReactDOM,
  harness: {
    id: Math.random().toString(),
    componentState: {
      name,
    },
    alignment: {
      horizontal: alignment,
    },
    size: {
      horizontal: size,
    },
    theme: {
      patterns: {
        colors: {
          background: color,
        },
      },
    },
  },
  isSelected,
  forceShowActions: false,
})

export const stateCards = [
  getCard({
    name: 'With title',
    alignment: 'Center',
    color: 'white',
  }),
  getCard({
    name: 'Another one',
    alignment: 'Left',
    color: 'white',
  }),
  getCard({
    name: 'Full width align left',
    alignment: 'Left',
    color: 'white',
    size: 'Large',
  }),
  getCard({
    name: 'Full width align right',
    alignment: 'Right',
    color: 'white',
    size: 'Large',
  }),
]
