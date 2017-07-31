import React from 'react'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'
import { Icon, AlignedPointer } from '@workflo/components'

import { options, ADD_SIBLING } from '../constants/addPropNode'
import OptionChooser from './OptionChooser'

type ContainerPropsT = {
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

  blur = () => this.setState({ isFocused: false })

  focus = () => this.setState({ isFocused: true })

  handleBlur = () => this.setState({ isFocused: false })

  handleClick = () => this.focus()

  handleFocus = () => this.focus()

  handleSelect = index => {
    const { nodeId, onInsertNode } = this.props
    // TODO: Put these in a constants file
    onInsertNode(nodeId, this.getOptions()[index].type)
    this.blur()
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
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
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
