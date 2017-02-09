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
    const elChild = [this.icon1, this.icon2, this.icon3];
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
     <div {...this.props.theme.icons}>
      <div ref={c => this.icon1 = c}>
        <Icon
          name='alignment'
          size='large'
          stroke='black'
        />
      </div>
      <div ref={c => this.icon2 = c}>
        <Icon
          ref="icon2"
          name='theme'
          size='large'
          stroke='black'
        />
      </div>
      <div ref={c => this.icon3 = c}>
        <Icon
          ref="icon2"
          name='size'
          size='large'
          stroke='black'
        />
      </div>
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
