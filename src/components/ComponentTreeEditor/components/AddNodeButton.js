import React from 'react'
import Theme from 'js-theme'
import { is } from 'immutable'

import { Colors } from '@workflo/styles'
import { Icon, AlignedPointer } from '@workflo/components'

import { Path } from '../../../modules/ComponentTree'
import type { InteractionStateT } from '../types'
import {
  ADD_PROP,
  ADD_SIBLING,
  ADD_CHILD,
} from '../../../modules/ComponentTree/constants'
import OptionChooser from './OptionChooser'

const options = [
  {
    type: ADD_PROP,
    label: 'Add Prop',
  },
  {
    type: ADD_SIBLING,
    label: 'Add Sibling',
  },
  {
    type: ADD_CHILD,
    label: 'Add Child',
  },
]

type ContainerPropsT = {
  interactionState: InteractionStateT,
  isFocused: boolean,
  /**
   * Indicates whether the 'Add Sibling' option should be available.
   */
  isRootComponent: boolean,
  /**
   * Indicates whether the button should be visible. If the button is currently
   * in focus, it will be visible regardless of what this prop is set to.
   */
  isVisible: boolean,
  nodeId: string,
  onInsertNode: Function,
  path: Path,
  theme: Object,
}

type ContainerStateT = {
  container: any,
}

class AddNodeButtonContainer extends React.Component {
  props: ContainerPropsT
  state: ContainerStateT

  static defaultProps: ContainerPropsT = {
    isFocused: false,
    isVisible: true,
  }

  constructor(props: ContainerPropsT) {
    super(props)
    this.state = {
      container: null,
    }
  }

  componentWillReceiveProps(nextProps: ContainerPropsT) {
    if (
      this.props.interactionState.focusedNodePath !==
      nextProps.interactionState.focusedNodePath
    ) {
      if (this.computeIsFocused(nextProps)) {
        this.focus()
      } else {
        this.setState({ isFocused: false })
      }
    }
  }

  blur = () => this.setState({ isFocused: false })

  computeIsFocused = ({ interactionState, path }: Props) =>
    is(interactionState.focusedNodePath, path)

  focus = () => {
    this.setState({ isFocused: true }, () => {
      this.state.container && this.state.container.focus()
    })
  }

  handleClick = () => this.focus()

  handleSelect = index => {
    const { path, onInsertNode } = this.props
    // TODO: Put these in a constants file
    onInsertNode(path, this.getOptions()[index].type)
    this.blur()
  }

  handleKeyDown = (event: SyntheticKeyboardEvent) => {
    const { onFocusNext, onFocusPrevious, path } = this.props
    if (event.keyCode === 46 || event.keyCode === 8) {
      /** This allows the user to repeatedly hit delete to clear fields */
      onFocusPrevious(path)
      event.preventDefault()
    }

    if (event.keyCode === 9 && !event.shiftKey) {
      onFocusNext(path)
      event.preventDefault()
    }

    if (event.keyCode === 9 && event.shiftKey) {
      onFocusPrevious(path)
      event.preventDefault()
    }
  }

  getOptions = () => {
    const { isRootComponent } = this.props
    return isRootComponent
      ? options.filter(option => option.type !== ADD_SIBLING)
      : options
  }

  storeContainer = ref => this.setState({ container: ref })

  render() {
    const { isVisible, theme } = this.props
    return (
      <span
        {...theme.container}
        ref={this.storeContainer}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        tabIndex="0"
      >
        <ThemedAddNodeButton
          containerRef={this.state.container}
          isFocused={this.state.isFocused}
          isVisible={this.state.isFocused || isVisible}
          onSelect={this.handleSelect}
          options={this.getOptions().map(option => option.label)}
        />
      </span>
    )
  }
}

type Props = {
  storeContainer: Function,
  containerRef: any,
  isFocused: boolean,
  onSelect: Function,
  options: Array<string>,
  theme: Object,
}
const AddNodeButton = ({ containerRef, isFocused, onSelect, options, theme }: Props) => (
  <span {...theme.container}>
    <Icon
      name="add-example"
      size="base"
      stroke={Colors.grey200}
      theme={{
        icon: {
          display: 'inline',
          paddingLeft: 2,
        },
        svg: {
          marginBottom: '-2px',
          verticalAlign: 'text-bottom',
        },
      }}
    />
    <AlignedPointer
      forceOpen={isFocused}
      gravity="Bottom Right"
      portal={({ close }) => {
        return <OptionChooser onSelect={onSelect} options={options} preventFocus />
      }}
      position="Bottom"
      targetRef={containerRef}
      verticalOffset={2}
    />
  </span>
)

const defaultTheme = ({ isVisible }) => ({
  container: {
    visibility: isVisible ? 'visible' : 'hidden',
  },
})

const containerDefaultTheme = ({ isVisible }) => ({
  container: {
    ':focus': {
      outline: 'none',
    },
  },
})

const ThemedAddNodeButton = Theme('AddNodeButton', defaultTheme)(AddNodeButton)

export default Theme('AddNodeButtonContainer', containerDefaultTheme)(
  AddNodeButtonContainer
)
