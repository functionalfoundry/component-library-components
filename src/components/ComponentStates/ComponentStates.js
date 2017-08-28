import React from 'react'
import Theme from 'js-theme'
import ComponentState from '../ComponentState'
import MultiSizeGrid from '@workflo/components/lib/MultiSizeGrid/MultiSizeGrid'

type SizeT = 'Tiny' | 'Small' | 'Base' | 'Large'

type ComponentStateT = {
  name: string,
}

type HarnessT = {
  id: string,
  state: ComponentStateT,
  size: {
    horizontal: SizeT,
    vertical: SizeT,
  },
}

type HarnessCardT = {
  element: React.Element,
  harness: HarnessT,
  isSelected: boolean,
  extraProps?: any,
}

type PropsT = {
  harnessCards: Array<HarnessCardT>,
  onClick: Function,
  onChange: (card: HarnessCardT) => null,
  theme: Object,
}

const ComponentStates = (props: PropsT) => {
  const { onChange, theme } = props
  return (
    <MultiSizeGrid
      {...theme.componentStates}
      data={getData(props)} // TODO: Memoize
      renderer={ComponentState}
      onChangeDatum={datum =>
        onChange({
          ...datum.value.harnessCard,
          isSelected: datum.descriptor.isSelected,
        })}
      theme={{
        multiSizeGrid: {
          margin: -4,
        },
        multiSizeGridItem: {
          margin: 4,
        },
      }}
    />
  )
}

// TODO: Memoize
const getData = ({ harnessCards, onClick, onChange }) => {
  return harnessCards.map(harnessCard => ({
    value: {
      harnessCard,
      onClickTitle: () => onClick(harnessCard.harness.id),
      onChangeIsSelected: isSelected =>
        onChange({
          ...harnessCard,
          isSelected,
        }),
    },
    descriptor: {
      id: harnessCard.harness.id,
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

const ThemedComponentStates = Theme('ComponentStates', defaultTheme)(ComponentStates)
export default ThemedComponentStates
