/** @flow */
import React from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import { getDisplayName } from 'recompose'

const withTransitionGroup = (InnerComponent: any) =>
  class extends React.Component {
    displayName = `withTransitionGroup(${getDisplayName(InnerComponent)})`
    render() {
      return (
        <TransitionGroup>
          <InnerComponent {...this.props} />
        </TransitionGroup>
      )
    }
  }

export default withTransitionGroup
