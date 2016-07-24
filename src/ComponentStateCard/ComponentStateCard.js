import React from 'react'
import {
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
        <Heading
          size={2}
          style={style.title}
        >
          {name}
        </Heading>
      </View>
      <View
        style={style.thumbnail}
      >
        <Image
          src={thumbnail}
          width={300}
          height={200}
        />
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
    <Icon
      name='open'
      onClick={onClickEdit}
      size='m'
    />
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
    ...Fonts.title,
    ...Fonts.large,
    color: Colors.steel3,
  },
  actions: {
    position: 'absolute',
    top: Spacing.base,
    right: Spacing.base,
  },
  section: {
    display: 'flex',
    alignContent: 'center',
    height: 340,
  },
  thumbnail: {
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default ComponentStateCard
