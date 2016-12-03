/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Card,
  View,
} from '@workflo/components'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'
import Heading from '@workflo/components/lib/Heading'
import LivePreview from '../LivePreview'

type HorizontalAlignmentT = 'Left' | 'Center' | 'Right'
type VerticalAlignmentT = 'Top' | 'Center' | 'Right'
type SizeT = 'Tiny' | 'Small' | 'Base' | 'Large'

type ComponentStateT = {
  name: string,
  propMap: Object,
}

type HarnessT = {
  componentState: ComponentStateT,
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
    },
  },
}

type PropsT = {
  component: {
    implementation: any,
  },
  harnessCard: {
    harness: HarnessT,
    actions: Array<React.Element>,
    isSelected: boolean,
  },
  onClickTitle: Function,
  onChangeIsSelected: Function,
  theme: Object,
}

const defaultComponent = () => <div />

const defaultProps = {
  component: {
    implementation: defaultComponent,
  },
  harnessCard: {
    harness: {
      componentState: {
        name: '',
        propMap: {},
      },
      alignment: {
        horizontal: 'Center',
        vertical: 'Center',
      },
      theme: {
        patterns: {
          colors: {},
        },
      },
    },
    actions: [],
    isSelected: false,
  },
  onClickTitle: () => {},
  onChangeIsSelected: () => {},
}

const ComponentState = ({
  component,
  harnessCard,
  onChangeIsSelected,
  onClickTitle,
  theme,
}: PropsT) => (
  <Card
    {...theme.harnessCard}
    flush
  >
    <View
      {...theme.section}
    >
      <View
        {...theme.titleContainer}
      >
        <Heading
          {...theme.title}
          size={'base'}
          onPress={() => onClickTitle()}
        >
          {harnessCard.harness.componentState.name}
        </Heading>
      </View>
      <View
        {...theme.actions}
      >
        {harnessCard.actions}
      </View>
      <View
        {...theme.preview}
      >
        <LivePreview
          Component={component.implementation}
          propMap={harnessCard.harness.componentState.propMap}
          backgroundColor={harnessCard.harness.theme.patterns.colors.background}
          alignment={harnessCard.harness.alignment}
        />
      </View>
    </View>
  </Card>
)

const defaultTheme = ({
  isSelected,
  harnessCard,
}) => ({
  harnessCard: {
    ...getScaledStyle(isSelected),
    transition: 'all .2s ease',
    position: 'relative',
    overflow: 'hidden',
    width: 'inherit', // FIX
    height: 320, // FIX
    flex: '1',
  },
  titleContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    top: Spacing.small - 2,
    left: Spacing.base + 24, // Scoot over for the checkbox
    zIndex: 10,
  },
  title: {
    ...Fonts.title,
    ...Fonts.large,
    fontSize: 24, // BIG HACK. HEADING BASE?
    color: Colors.grey800,
    display: 'inline',
    cursor: 'pointer',
  },
  actions: {
    backgroundColor: harnessCard.harness.theme.patterns.colors.background,
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: Spacing.small + 4,
    right: 0,
    paddingRight: Spacing.base,
    zIndex: 100,
    color: Colors.grey800,
  },
  section: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    zIndex: -0,
    // height: 200,
    // maxWidth: '100%',
    // display: 'flex',
    // flexDirection: 'row',
    // flex: '0 1 auto;',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  editButton: {
    cursor: 'pointer',
  },
})

const getScaledStyle = (isSelected) => {
  if (isSelected) {
    return {
      transform: 'scale(.9)',
    }
  }
}

ComponentState.defaultProps = defaultProps

export default Theme('ComponentState', defaultTheme)(ComponentState)
