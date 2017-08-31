import React from 'react'
import Theme from 'js-theme'
import { is } from 'immutable'

import { Colors } from '@workflo/styles'
import { Icon, AlignedPointer, Trigger } from '@workflo/components'

import {
  Component,
  Path,
  Prop,
  RenderCallback,
  TextNode,
} from '../../../modules/ComponentTree'
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
    emptyNode: Prop(),
  },
  {
    type: ADD_SIBLING,
    label: 'Add Sibling Component',
    emptyNode: Component(),
  },
  {
    type: ADD_SIBLING,
    label: 'Add Sibling Render Callback',
    emptyNode: RenderCallback(),
  },
  {
    type: ADD_SIBLING,
    label: 'Add Sibling Text',
    emptyNode: TextNode(),
  },
  {
    type: ADD_CHILD,
    label: 'Add Child Component',
    emptyNode: Component(),
  },
  {
    type: ADD_CHILD,
    label: 'Add Child Render Callback',
    emptyNode: RenderCallback(),
  },
  {
    type: ADD_CHILD,
    label: 'Add Child Text',
    emptyNode: TextNode(),
  },
]

const accessOption = option => option.label

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

  handleSelect = option => {
    const { path, onInsertNode } = this.props
    onInsertNode(path, option.type, option.emptyNode)
    this.blur()
  }

  handleClickOutsideDropdown = () => this.blur()

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
        {...theme.addNodeButtonContainer}
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
          onClose={this.handleClickOutsideDropdown}
          options={this.getOptions()}
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
  onClose: Function,
  options: Array<string>,
  theme: Object,
}
const AddNodeButton = ({
  containerRef,
  isFocused,
  onSelect,
  options,
  onClose,
  theme,
}: Props) =>
  <span {...theme.addNodeButton}>
    <Icon
      name="add-example"
      size="base"
      stroke={Colors.grey200}
      theme={{
        icon: {
          display: 'inline',
          paddingLeft: 2,
          ':hover': {
            stroke: 'white',
          },
          ':active': {
            stroke: Colors.grey400,
          },
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
        return (
          <Trigger triggerOn={['Click outside']} onTrigger={onClose}>
            <OptionChooser
              accessOption={accessOption}
              disableFreeform
              disableFilter
              onSelect={onSelect}
              options={options}
              preventFocus
            />
          </Trigger>
        )
      }}
      position="Bottom"
      targetRef={containerRef}
      padding={0}
      verticalOffset={2}
    />
  </span>

const defaultTheme = ({ isVisible }) => ({
  addNodeButton: {
    visibility: isVisible ? 'visible' : 'hidden',
    cursor: 'pointer',
  },
})

const containerDefaultTheme = ({ isVisible }) => ({
  addNodeButtonContainer: {
    ':focus': {
      outline: 'none',
    },
  },
})

const ThemedAddNodeButton = Theme('AddNodeButton', defaultTheme)(AddNodeButton)

export default Theme('AddNodeButtonContainer', containerDefaultTheme)(
  AddNodeButtonContainer
)
