import React from 'react'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'
import { Icon, AlignedPointer } from '@workflo/components'

import OptionChooser from './OptionChooser'

type ContainerPropsT = {
  isFocused: boolean,
  isVisible: boolean,
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

  handleSelect = option => {
    this.blur()
  }

  storeContainer = ref => this.setState({ container: ref })

  render() {
    return (
      <span
        ref={this.storeContainer}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
      >
        <ThemedAddNodeButton
          containerRef={this.state.container}
          isFocused={this.state.isFocused}
          onSelect={this.handleSelect}
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
  theme: Object,
}
const AddNodeButton = ({ containerRef, isFocused, onSelect, theme }: Props) => (
  <span {...theme.container} tabIndex="0">
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
        return (
          <OptionChooser
            onSelect={onSelect}
            options={['Add Prop', 'Add Child Component', 'Add Sibling Component']}
            preventFocus
          />
        )
      }}
      position="Bottom"
      targetRef={containerRef}
      verticalOffset={2}
    />
  </span>
)

const defaultTheme = {
  container: {
    ':focus': {
      outline: 'none',
    },
  },
}

const ThemedAddNodeButton = Theme('AddNodeButton', defaultTheme)(AddNodeButton)

export default AddNodeButtonContainer
