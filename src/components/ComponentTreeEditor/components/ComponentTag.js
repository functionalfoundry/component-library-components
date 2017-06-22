import React from 'react'
const Immutable = require('immutable')
import Theme from 'js-theme'

import { Colors, Fonts, Spacing } from '@workflo/styles'
import { AlignedTrigger, HoverIcon, View } from '@workflo/components'

import { MarkRendererPropsT } from '../types'
import StaggerChildren from '../../StaggerChildren'
import { Component } from '../../../modules/ComponentTree'

/**
 * Component tag renderer
 */
class ComponentTagRenderer extends React.Component {
  props: MarkRendererPropsT

  render() {
    const { children, mark, marks, theme } = this.props
    const node = mark.getIn(['data', 'element', 'node'])
    const tree = mark.getIn(['data', 'tree'])
    const markNames = marks.reduce((out, mark) => out.add(mark.get('type')), Set())

    const isRoot = Immutable.is(tree.root, node)
    const showAddChild = markNames.contains('component-open-tag-end')
    const showAddSibling = !isRoot && markNames.contains('component-end')

    return (
      <AlignedTrigger
        position="Right"
        openTriggers={['Mouse enter']}
        closeTriggers={['Mouse leave']}
        portal={
          <View {...theme.componentTagActions}>
            <StaggerChildren direction="Right">
              {showAddChild &&
                <View {...theme.componentTagAction} onClick={this.handleAddChild}>
                  <HoverIcon
                    name="primary-plus"
                    hoverName="primary-plus-hover"
                    theme={{
                      svg: {
                        width: 22,
                        height: 22,
                      },
                    }}
                  />
                  <View {...theme.componentTagActionLabel}>
                    Child
                  </View>
                </View>}
              {showAddSibling &&
                <View {...theme.componentTagAction} onClick={this.handleAddSibling}>
                  <HoverIcon
                    name="primary-plus"
                    hoverName="primary-plus-hover"
                    theme={{
                      svg: {
                        width: 22,
                        height: 22,
                      },
                    }}
                  />
                  <View {...theme.componentTagActionLabel}>
                    Sibling
                  </View>
                </View>}
            </StaggerChildren>
          </View>
        }
      >
        <View {...theme.componentTagEnd} inline>
          <View inline>
            {children}
          </View>
        </View>
      </AlignedTrigger>
    )
  }

  handleAddChild = () => {
    const { options, mark } = this.props
    const { onInsertComponent } = options
    const component = mark.getIn(['data', 'element', 'node'])
    onInsertComponent && onInsertComponent(component.id, 0, Component({}))
  }

  handleSetText = () => {}

  handleAddSibling = () => {
    const { options, mark } = this.props
    const { onInsertComponent } = options
    const element = mark.getIn(['data', 'element'])
    const parent = element.getIn(['data', 'parent'])
    const index = element.getIn(['data', 'index'])
    onInsertComponent && onInsertComponent(parent.id, index + 1, Component({}))
  }
}

const defaultTheme = {
  componentTagEnd: {
    paddingRight: Spacing.tiny,
  },
  componentTagActions: {
    display: 'flex',
    flexDirection: 'row',
    ...Fonts.small,
  },
  componentTagAction: {
    cursor: 'pointer',
    backgroundColor: Colors.grey900,
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: Spacing.tiny / 2,
    marginRight: Spacing.tiny / 2,
    borderRadius: Spacing.tiny / 2,
  },
  componentTagActionLabel: {
    display: 'flex',
    flex: '1 1 auto',
    height: '16px',
  },
}

export default Theme('ComponentTagRenderer', defaultTheme)(ComponentTagRenderer)
