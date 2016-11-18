import React from 'react'
import Theme from 'js-theme'
import {
  Card,
  View,
  Icon,
  Image,
} from '@workflo/components'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'
import Heading from '@workflo/components/lib/Heading'

type Props = {
  name: string,
  Component: any, // Component Implementation
  properties: Object, // Props as a map that can be spread
  onClickEdit: Function,
  theme: Object,
}

const defaultComponent = () => (<div />)

const defaultProps = {
  Component: defaultComponent,
  properties: {},
}

const ComponentStateCard = ({
  name,
  onClickEdit,
  theme,
  Component,
  properties,
}: Props) => (
  <Card
    {...theme.componentStateCard}
  >
    <View
      {...theme.section}
    >
      <View
        {...theme.titleContainer}
      >
        <Heading
          {...theme.title}
          size={2}
        >
          {name}
        </Heading>
      </View>
      <View
        {...theme.thumbnail}
      >
        <Component {...properties} />
      </View>
      <View
        {...theme.actions}
      >
        <Actions
          onClickEdit={onClickEdit}
          theme={theme}
        />
      </View>
    </View>
  </Card>
)

type ActionsPropsT = {
  onClickEdit: Function,
  theme: Object,
}

const Actions = ({
  onClickEdit,
  theme,
}: ActionsPropsT) => (
  <View>
    <Icon
      {...theme.editButton}
      name='open'
      onClick={onClickEdit}
      size='huge'
    />
  </View>
)

const defaultTheme = {
  componentStateCard: {
    position: 'relative',
    overflow: 'hidden',
    width: 'inherit', // FIX
    height: 320, // FIX
    flex: '1',
  },
  titleContainer: {
    position: 'absolute',
    top: Spacing.tiny,
    left: Spacing.tiny,
  },
  title: {
    ...Fonts.title,
    ...Fonts.base,
    color: Colors.grey800,
  },
  actions: {
    position: 'absolute',
    top: Spacing.tiny,
    right: Spacing.tiny,
  },
  section: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    height: 200,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    flex: '0 1 auto;',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    cursor: 'pointer',
  },
}

ComponentStateCard.defaultProps = defaultProps

export default Theme('ComponentStateCard', defaultTheme)(ComponentStateCard)
