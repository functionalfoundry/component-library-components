import React from 'react'
import Theme from 'js-theme'
import { HoverIcon, Icon } from '@workflo/components'
import { Colors, Fonts, Spacing } from '@workflo/styles'

export type PropertyT = {
  name: string,
  type: string,
  default: string,
  description: string,
}

type PropsT = {
  forceHoverRowIndex?: number,
  properties: Array<PropertyT>,
  onClickPlus: Function,
  onClickMinus: Function,
}

const typeWidth = '30%'
const defaultWidth = '10%'
const propWidth = '20%'
const descriptionWidth = '40%'

class PropertiesContainer extends React.Component {
  props: PropsT

  constructor() {
    super()
    this.state = {
      sortAsc: true,
      hoveredIndex: null,
    }
  }

  handleSortChange = () => {
    this.setState({ sortAsc: !this.state.sortAsc })
  }

  handleHoverChange = hoveredIndex => {
    this.setState({ hoveredIndex })
  }

  render() {
    return (
      <Properties
        {...this.props}
        sortAsc={this.state.sortAsc}
        hoveredIndex={this.props.forceHoverRowIndex || this.state.hoveredIndex}
        onSortChange={this.handleSortChange}
        onHoverChange={this.handleHoverChange}
      />
    )
  }
}

class Properties extends React.Component {
  props: PropsT

  getHandleClickPlus = property => {
    return () => {
      const { onClickPlus } = this.props
      if (onClickPlus) {
        onClickPlus(property.name)
      }
    }
  }

  getHandleClickMinus = property => {
    return () => {
      const { onClickMinus } = this.props
      if (onClickMinus) {
        onClickMinus(property.name)
      }
    }
  }

  sort = arr => {
    const clonedProperties = this.props.properties.concat()
    const sortedProperties = clonedProperties.sort()
    if (!this.props.sortAsc) {
      return sortedProperties.reverse()
    }
    return sortedProperties
  }

  // Takes a property row and returns the hover handler for that row
  getHandleMouseEnter = index => {
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
      forceHoverRowIndex,
    } = this.props

    return (
      <div {...theme.properties} cellSpacing="0" data-walkthrough-id="properties-table">
        <div {...theme.headerRow}>
          <div {...theme.propHeader}>
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
          </div>
          <div {...theme.typeHeader}>
            Type
          </div>
          <div {...theme.defaultHeader}>
            Default
          </div>
          <div {...theme.descriptionHeader}>
            Description
          </div>
        </div>
        <div {...theme.body} onMouseLeave={this.handleMouseLeave}>
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
                forceHoverRowIndex={forceHoverRowIndex}
              />
            )
          })}
        </div>
      </div>
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
  forceHoverRowIndex,
  index,
}) => (
  <div
    {...theme.row}
    style={isHovering ? selectedStyle : {}}
    onMouseEnter={getHandleMouseEnter(index)}
    key={index}
  >
    <div {...theme.propCell}>
      <div {...theme.nameCellInner}>
        {isHovering &&
          !property.isUsedByTreeEditor &&
          <HoverIcon
            {...getDataAttributeForRow(index, forceHoverRowIndex)}
            name="primary-plus"
            hoverName="primary-plus-hover"
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
          />}
        {property.isUsedByTreeEditor &&
          <HoverIcon
            name="primary-minus"
            hoverName="primary-minus-hover"
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
          />}
        <span {...theme.propName}>
          {property.name}
        </span>
      </div>
    </div>
    <div {...theme.typeCell}>
      {property.type}
    </div>
    <div {...theme.defaultCell}>
      {property.default}
    </div>
    <div {...theme.descriptionCell}>
      {property.description}
    </div>
  </div>
)

const getDataAttributeForRow = (index, forceHoverRowIndex) => {
  if (index === forceHoverRowIndex) {
    return {
      'data-walkthrough-id': 'plus-icon',
    }
  } else {
    return {}
  }
}

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
  display: 'flex',
  paddingBottom: 20,
})

const selectedStyle = {
  backgroundColor: 'rgba(73,79,82, .2)',
}

const centerCell = {
  ...cellBorder,
  color: Colors.grey200,
  paddingLeft: Spacing.small,
  display: 'flex',
}

const defaultRowTheme = ({ property, isHovering }) => ({
  row: {
    borderBottom: `1px solid ${Colors.grey800}`,
    flexDirection: 'row',
    display: 'flex',
    flexGrow: 1,
  },
  propCell: {
    ...Object.assign({}, cellBorder, {
      paddingLeft: Spacing.small,
      // paddingRight: Spacing.large,
    }),
    color: !property.isUsedByTreeEditor ? 'white' : '#02c95d',
    flexBasis: propWidth,
    display: 'flex',
  },
  nameCellInner: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  propName: {
    // Sync with Component State Checkbox animation
    transform: isHovering || property.isUsedByTreeEditor
      ? `translate3d(28px, 0, 0)`
      : `translate3d(0, 0, 0)`,
    transition: '0.3s transform cubic-bezier(0.19, 1, 0.22, 1)',
  },
  typeCell: {
    ...centerCell,
    flexBasis: typeWidth,
  },
  defaultCell: {
    ...centerCell,
    flexBasis: defaultWidth,
  },
  descriptionCell: {
    ...cellBorder,
    display: 'flex',
    color: Colors.grey400,
    flexBasis: descriptionWidth,
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
  plus: {
    ...cellBorder,
  },
})

const middleCell = {
  paddingLeft: Spacing.small,
}

const ThemedRow = Theme('PropertiesRow', defaultRowTheme)(Row)

const defaultTheme = {
  properties: {
    ...Object.assign({}, Fonts.monospace, {
      fontSize: 14,
    }),
    width: '100%',
    maxWidth: '100%',
    borderCollapse: 'collapse',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  headerRow: {
    borderBottom: `1px solid ${Colors.grey800}`,
    flexDirection: 'row',
    display: 'flex',
    flexGrow: 1,
  },
  typeHeader: Object.assign({}, headerCellBase, middleCell, {
    flexBasis: typeWidth,
  }),
  defaultHeader: Object.assign({}, headerCellBase, middleCell, {
    flexBasis: defaultWidth,
  }),
  propHeader: Object.assign({}, headerCellBase, {
    paddingLeft: Spacing.small,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    flexBasis: propWidth,
  }),
  descriptionHeader: Object.assign({}, headerCellBase, {
    flexBasis: descriptionWidth,
    paddingLeft: Spacing.tiny,
    '@media (max-width: 800px)': {
      display: 'none',
    },
  }),
  body: {
    overflowY: 'scroll',
  },
}

const ThemedProperties = Theme('Properties', defaultTheme)(PropertiesContainer)
export default ThemedProperties
