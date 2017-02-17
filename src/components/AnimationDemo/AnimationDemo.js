/* @flow */
import React from 'react'
import {
  Card,
  Icon,
  View,
} from '@workflo/components'
import {
  Colors,
  Corners,
  Fonts,
  Spacing,
  Shadows,
} from '@workflo/styles'
import Theme from 'js-theme'
import TweenMax from 'gsap'

type Props = {
  theme: Object,
}

const AnimationDemo = ({
  theme,
  ...props,
}: Props) => (
  <Card
    {...theme.card}
    size='medium'
  >
    <Icons theme={theme} />
  </Card>
)

type IconsPropsT = {
  theme: Object,
}

class Icons extends React.Component {
  componentDidMount (callback) {
    const elChild = this.icons.childNodes;
    TweenMax.staggerFromTo(elChild, 0.5, {
      x: 10, 
      opacity: 0
    }, {
      x: 0, 
      opacity: 1, 
      ease: Power2.easeOut,
      onComplete: callback}, 
      0.08);
  }

  render () {
    return (
     <div {...this.props.theme.icons}
      ref={c => this.icons = c}
     >
     <Icon
        name='alignment'
        size='large'
        stroke='black'
      />
      <Icon
        ref="icon2"
        name='theme'
        size='large'
        stroke='black'
      />
      <Icon
        ref="icon2"
        name='size'
        size='large'
        stroke='black'
      /> 
    </div>
    )
  }
}


const defaultTheme = {
  card: {
    color: 'black',
    alignItems: 'flex-end',
  },
  icons: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-end'
  },
}

const ThemedAnimationDemo = Theme('AnimationDemo', defaultTheme)(AnimationDemo)
export default ThemedAnimationDemo
