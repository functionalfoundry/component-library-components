import React from 'react'
import Image from 'grommet/components/Image'
import {
  View,
  Button,
  Icon,
} from '@workflo/components'
import {
  Colors,
  Spacing,
} from '@workflo/styles'

type Props = {
  name: String,
  thumbnail: String,
  onClickEdit: Function,
}

const ComponentStateCard = ({
  name,
  thumbnail,
  onClickEdit,
}: Props) => (
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

type ActionsPropsT = {
  onClickEdit: Function,
}

const Actions = ({
  onClickEdit,
}: ActionsPropsT) => (
  <View>
    <Button
      kind='primary'
      shade='dark'
      onClick={onClickEdit}
      round
    >
      <Icon
        name='trash'
        fill={Colors.primary}
      />
    </Button>
  </View>
)

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

export default ComponentStateCard
