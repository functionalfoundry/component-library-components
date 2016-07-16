import React from 'react'
import Title from 'grommet/components/Title'
import Tile from 'grommet/components/Tile'
import Header from 'grommet/components/Header'
import Image from 'grommet/components/Image'
import Label from 'grommet/components/Label'
import Box from 'grommet/components/Box'
import View from '@workflo/components/lib/View/View'
import Button from '@workflo/components/lib/Button/Button'
import Icon from '@workflo/components/lib/Icon/Icon'
import { Colors, Spacing } from '@workflo/styles'

const ComponentStateCard = ({
  name,
  thumbnail,
  onClickEdit,
}) => (
  <View
    style={style.card}
  >
    <View
      style={style.section}
    >
      <View
        style={style.titleContainer}
      >
        <h4
          style={style.title}
        >
          {name}
        </h4>
      </View>
      <View
        style={style.thumbnail}
      >
        <Image src={thumbnail} />
      </View>
      <View
        style={style.actions}
      >
        <Actions
          onClickEdit={onClickEdit}
        />
      </View>
    </View>
  </View>
)

const Actions = ({
  onClickEdit,
}) => (
  <View>
    <Button
      kind='primary'
      shade='dark'
      onClick={onClickEdit}
      round
    >
      <Icon
        name='trash'
        size='s'
        fill={Colors.primary}
      />
    </Button>
  </View>
)

export default ComponentStateCard

const style = {
  card: {
    position: 'relative',
  },
  titleContainer: {
    position: 'absolute',
    top: Spacing.base,
    left: Spacing.base,
  },
  title: {
    fontWeight: 300,
    fontSize: 22,
  },
  actions: {
    position: 'absolute',
    top: Spacing.base,
    right: Spacing.base,
  },
  section: {
    display: 'flex',
    alignContent: 'center',
    height: 300,
  },
  thumbnail: {
    width: 200,
    margin: 'auto',
  },
}
