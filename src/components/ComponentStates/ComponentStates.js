import React from 'react'
import Theme from 'js-theme'
import ComponentState from '../ComponentState'
import {
  View,
} from '@workflo/components'
import MultiSizeGrid from '@workflo/components/lib/MultiSizeGrid/MultiSizeGrid'
import {
  Colors,
  Spacing,
} from '@workflo/styles'

type HorizontalAlignmentT = 'Left' | 'Center' | 'Right'
type VerticalAlignmentT = 'Top' | 'Center' | 'Bottom'
type SizeT = 'Tiny' | 'Small' | 'Base' | 'Large'

type ComponentStateT = {
  name: string,
  propMap: Object,
}

type HarnessT = {
  id: string,
  state: ComponentStateT,
  alignment: {
    horizontal: HorizontalAlignmentT,
    vertical: VerticalAlignmentT,
  },
  size: {
    horizontal: SizeT,
    vertical: SizeT,
  },
  theme: {
    id: string,
    name: string,
    patterns: {
      colors: {
        background: string,
      },
    }
  },
}

type HarnessCardT = {
  harness: HarnessT,
  isSelected: boolean,
}

type PropsT = {
  component: {
    implementation: any,
  },
  harnessCards: Array<HarnessCardT>,
  onClick: Function,
  onChange: (card: HarnessCardT) => null,
  theme: Object,
}

const ComponentStates = (props: PropsT) => {
  const {
    onChange,
    theme,
  } = props
  return (
    <MultiSizeGrid
      {...theme.componentStates}
      data={getData(props)} // TODO: Memoize
      renderer={ComponentState}
      onChangeDatum={(datum) => onChange({
        ...datum.value.harnessCard,
        isSelected: datum.descriptor.isSelected,
      })}
    />
  )
}

// TODO: Memoize
const getData = ({
  component,
  harnessCards,
  onClick,
  onChange,
}) => {
  return harnessCards.map((harnessCard) => ({
    value: {
      component,
      harnessCard,
      onClickTitle: () => onClick(harnessCard.harness.id),
      onChangeIsSelected: (isSelected) => onChange({
        ...harnessCard,
        isSelected,
      }),
    },
    descriptor: {
      isSelected: harnessCard.isSelected,
      size: harnessCard.harness.size,
    },
  }))
}

const defaultTheme = {
  componentStates: {
    display: 'flex',
    flex: 1,
  },
}

export default Theme('ComponentStates', defaultTheme)(ComponentStates)
