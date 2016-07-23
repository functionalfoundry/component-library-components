import React from 'react'
import {
  View,
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

const Header = ({
  name,
}: Props) => (
  <View
    style={styles.container}
  >
    <View
      style={styles.leftBlock}
    >
      <Back />
      <Separator />
      <Titles />
    </View>
    <Actions />
  </View>
)

const Back = () => (
  <View
    style={styles.back}
  >
    <Icon
      name='back'
      size='m'
    />
  </View>
)

const Separator = () => (
  <View
    style={styles.separator}
  >
  </View>
)

const Titles = () => (
  <View
    style={styles.titles}
  >
    <h1
      style={styles.title}
    >
      Slider
    </h1>
  </View>
)

const Actions = () => (
  <View
    style={styles.actions}
  >
    <Icon
      name='search'
    />
    <Icon
      name='widget-feed'
    />
  </View>
)

const styles = {
  container: {
    color: Colors.aluminum5,
    display: 'flex',
    alignContent: 'space-between',
    alignItems: 'baseline'
  },
  leftBlock: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,
  },
  back: {
    padding: Spacing.tiny,
  },
  separator: {
    flex: 1,
    borderLeft: `1px solid ${Colors.aluminum5}`,
    marginTop: 12,
    marginLeft: Spacing.base,
    height: Spacing.large, // Make line-size height
  },
  titles: {
    flex: 1,
  },
  title: {

  },
  subtitle: {

  },
  actions: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: Spacing.tiny,
  },
}

export default Header
