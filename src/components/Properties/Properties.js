import React from 'react'
import Theme from 'js-theme'
import {
  HoverIcon,
  Icon,
} from '@workflo/components'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'

export type PropertyT = {
  name: string,
  type: string,
  default: string,
  description: string,
}

type PropsT = {
  properties: Array<PropertyT>,
  onClickPlus: Function,
  onClickMinus: Function,
}

class PropertiesContainer extends React.Component {
  constructor () {
    super()
    this.state = {
      sortAsc: true,
      hoveredIndex: null,
    }
  }

  handleSortChange = () => {
    this.setState({ sortAsc: !this.state.sortAsc })
  }

  handleHoverChange = (hoveredIndex) => {
    this.setState({ hoveredIndex })
  }

  render () {
    return (
      <Properties
        {...this.props}
        sortAsc={this.state.sortAsc}
        hoveredIndex={this.state.hoveredIndex}
        onSortChange={this.handleSortChange}
        onHoverChange={this.handleHoverChange}
      />
    )
  }
}

class Properties extends React.Component {
  props: PropsT

  getHandleClickPlus = (property) => {
    return () => {
      const { onClickPlus } = this.props
      if (onClickPlus) {
        onClickPlus(property.name)
      }
    }
  }

  getHandleClickMinus = (property) => {
    return () => {
      const { onClickMinus } = this.props
      if (onClickMinus) {
        onClickMinus(property.name)
      }
    }
  }

  sort = (arr) => {
    const clonedProperties = this.props.properties.concat()
    const sortedProperties = clonedProperties.sort()
    if (!this.props.sortAsc) {
      return sortedProperties.reverse()
    }
    return sortedProperties
  }

  // Takes a property row and returns the hover handler for that row
  getHandleMouseEnter = (index) => {
    return () => {
      this.props.onHoverChange(index)
    }
  }

  handleMouseLeave = () => {
    this.props.onHoverChange(null)
  }

  render() {
    const {
      properties = [],
      onClickPlus,
      onSortChange,
      theme,
      sortAsc,
    } = this.props

    return (
      <table
        {...theme.properties}
        cellSpacing='0'
      >
        <thead>
          <tr
            {...theme.headerRow}
          >
            <th
              {...theme.firstHeader}
            >
              Prop
              <Icon
                name={sortAsc ? 'column-sort-asc' : 'column-sort-desc'}
                theme={{
                  icon: {
                    marginTop: 2,
                    marginLeft: 6,
                    cursor: 'pointer',
                  },
                }}
                onClick={onSortChange}
              />
            </th>
            <th
              {...theme.headerCell}
            >
              Type
            </th>
            <th
              {...theme.headerCell}
            >
              Default
            </th>
            <th
              {...theme.lastHeader}
            >
              Description
            </th>
          </tr>
        </thead>
        <tbody
          onMouseLeave={this.handleMouseLeave}
        >
          {this.sort(properties).map((property, index) => {
            const isHovering = this.props.hoveredIndex === index

            return (
              <ThemedRow
                key={property.name}
                property={property}
                isHovering={isHovering}
                getHandleMouseEnter={this.getHandleMouseEnter}
                getHandleClickPlus={this.getHandleClickPlus}
                getHandleClickMinus={this.getHandleClickMinus}
                index={index}
              />
            )
          })}
        </tbody>
      </table>
    )
  }
}

const Row = ({
  property,
  theme,
  isHovering,
  getHandleMouseEnter,
  getHandleClickPlus,
  getHandleClickMinus,
  index,
}) => (
  <tr
    {...theme.row}
    style={isHovering ? selectedStyle : {}}
    onMouseEnter={getHandleMouseEnter(index)}
    key={index}
  >
    <td
      {...theme.prop}
    >
      <div
        {...theme.nameCellInner}
      >
        {isHovering && !property.isUsedByTreeEditor && (
          <HoverIcon
            name='primary-plus'
            hoverName='primary-plus-hover'
            onClick={getHandleClickPlus(property)}
            theme={{
              icon: {
                cursor: 'pointer',
                position: 'absolute',
              },
              svg: {
                width: 22,
                height: 22,
              },
            }}
          />
        )}
        {property.isUsedByTreeEditor && (
          <HoverIcon
            name='primary-minus'
            hoverName='primary-minus-hover'
            onClick={getHandleClickMinus(property)}
            theme={{
              icon: {
                cursor: 'pointer',
                position: 'absolute',
              },
              svg: {
                width: 22,
                height: 22,
              },
            }}
          />
        )}
        <span
          {...theme.propName}
        >
          {property.name}
        </span>
      </div>
    </td>
    <td
      {...theme.column}
    >
      {property.type}
    </td>
    <td
      {...theme.column}
    >
      {property.default}
    </td>
    <td
      {...theme.description}
    >
      {property.description}
    </td>
  </tr>
)

const cellBorder = {
  paddingTop: Spacing.tiny,
  paddingLeft: Spacing.tiny,
  paddingRight: Spacing.small,
  paddingBottom: Spacing.tiny,
}

const headerCellBase = Object.assign({}, cellBorder, {
  fontWeight: 100,
  textAlign: 'left',
  color: Colors.grey200,
  userSelect: 'none',
})

const selectedStyle = {
  backgroundColor: 'rgba(73,79,82, .2)',
}

const defaultRowTheme = ({
  property,
  isHovering,
}) => ({
  row: {
    borderBottom: `1px solid ${Colors.grey800}`,
  },
  prop: {
    ...Object.assign({}, cellBorder, {
      paddingLeft: Spacing.small,
      paddingRight: Spacing.large,
    }),
    color: !property.isUsedByTreeEditor ? 'white' : '#02c95d',
  },
  nameCellInner: {
    display: 'flex',
    alignItems: 'center',
  },
  propName: {
    // Sync with Component State Checkbox animation
    transform: (isHovering || property.isUsedByTreeEditor) ? `translate3d(28px, 0, 0)` : `translate3d(0, 0, 0)`,
    transition: '0.3s transform cubic-bezier(0.19, 1, 0.22, 1)',
  },
  description: {
    ...cellBorder,
    color: Colors.grey400,
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
  column: {
    ...cellBorder,
    color: Colors.grey200,
    paddingLeft: Spacing.small,
  },
  plus: {
    ...cellBorder,
  },
})

const ThemedRow = Theme('PropertiesRow', defaultRowTheme)(Row)

const defaultTheme = {
  properties: {
    ...(Object.assign({}, Fonts.monospace, {
      fontSize: 14,
    })),
    width: '100%',
    maxWidth: '100%',
    borderCollapse: 'collapse',
  },
  headerRow: {
    borderBottom: `1px solid ${Colors.grey800}`,
  },
  headerCell: Object.assign({}, headerCellBase, {
    paddingLeft: Spacing.small,
  }),
  firstHeader: Object.assign({}, headerCellBase, {
    paddingLeft: Spacing.small,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
  }),
  lastHeader: Object.assign({}, headerCellBase, {
    paddingLeft: Spacing.tiny,
    '@media (max-width: 800px)': {
      display: 'none',
    },
  }),
}

const ThemedProperties = Theme('Properties', defaultTheme)(PropertiesContainer)
export default ThemedProperties
