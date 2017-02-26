import React from 'react'
import Theme from 'js-theme'
import {
  Icon,
} from '@workflo/components'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'

type PropertyT = {
  name: string,
  type: string,
  default: string,
  description: string,
}

type PropsT = {
  properties: Array<PropertyT>,
  onClickPlus: Function,
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

  sort = (arr) => {
    const clonedProperties = this.props.properties.concat()
    const sortedProperties = clonedProperties.sort()
    if (this.props.sortAsc) {
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
        <tr>
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
        <tbody
          onMouseLeave={this.handleMouseLeave}
        >
          {this.sort(properties).map((property, index) => {
            const isHovering = this.props.hoveredIndex === index
            const nameSpanStyle = isHovering ? theme.hoveredProp : theme.nonHoveredProp

            return (
              <tr
                {...theme.row}
                style={index === this.props.hoveredIndex ? selectedStyle : {}}
                onMouseEnter={this.getHandleMouseEnter(index)}
                key={index}
              >
                <td
                  {...theme.name}
                >
                  {(this.props.hoveredIndex === index) && (
                    <Icon
                      name='primary-plus'
                      onClick={this.getHandleClickPlus(property)}
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
                    />)}
                    <span
                      {...nameSpanStyle}
                    >
                      {property.name}
                    </span>
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
          })}
        </tbody>
      </table>
    )
  }
}

const cellBorder = {
  borderBottom: `1px solid ${Colors.grey800}`,
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

const defaultTheme = {
  properties: {
    ...(Object.assign({}, Fonts.monospace, {
      fontSize: 14,
    })),
    width: '100%',
    maxWidth: '100%',
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
  }),
  name: {
    ...cellBorder,
    paddingLeft: Spacing.small,
    display: 'flex',
    alignItems: 'center',
    color: '#02c95d',
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
  hoveredProp: {
    // Sync with Component State Checkbox animation
    transform: `translate3d(28px, 0, 0)`,
    transition: '0.3s transform cubic-bezier(0.19, 1, 0.22, 1)',
  },
  nonHoveredProp: {
    transform: `translate3d(0, 0, 0)`,
    transition: '0.3s transform cubic-bezier(0.19, 1, 0.22, 1)',
  },
}

const ThemedProperties = Theme('Properties', defaultTheme)(PropertiesContainer)
export default ThemedProperties
