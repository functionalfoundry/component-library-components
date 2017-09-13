import {
  exampleBundles,
  rawExampleTree,
} from '../src/components/ComponentState/ComponentState.story'

const getCard = ({
  alignment,
  color,
  error,
  isSelected = false,
  name,
  size = 'Base',
}) => ({
  tree: rawExampleTree,
  bundles: exampleBundles,
  error,
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

const error = {
  message: 'doSomething is not defined',
  stack: `ReferenceError: doSomething is not defined
    at setTimeout (<anonymous>:6:30)`,
}

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
  getCard({
    name: 'Full width align right',
    alignment: 'Right',
    color: 'white',
    error,
    size: 'Large',
  }),
]
