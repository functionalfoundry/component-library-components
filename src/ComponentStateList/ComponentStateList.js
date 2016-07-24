import React from 'react'
import ComponentStateCard from '../ComponentStateCard'
import {
  View,
} from '@workflo/components'
import {
  Colors,
  Spacing,
} from '@workflo/styles'

type Props = {
  children: any,
  states: Array<Object>,
}

const ComponentStateList = ({
  children,
  states,
}: Props) => (
  <View
    style={styles.container}
  >
    <View
      style={styles.section}
    >
      <View
        style={styles.column}
      >
        {states.map((state, index) => (
          <View
            key={index}
            style={styles.row}
          >
            <ComponentStateCard
              {...state}
            />
          </View>
        ))}
      </View>
    </View>
  </View>
)

export default ComponentStateList

const styles = {
  container: {
    display: 'flex',
    flex: 1,
  },
  section: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  column: {
    flexGrow: 1,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    marginLeft: Spacing.base,
    marginRight: Spacing.base,
    backgroundColor: Colors.aluminum6,
    ':nth-child(even)': {
      backgroundColor: Colors.aluminum5,
    }
  },
}
