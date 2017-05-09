import React from 'react'
import Theme from 'js-theme'
import { Fonts } from '@workflo/styles'

import { BackIcon, DismissIcon, ForwardIcon } from '.'

type Props = {
  message: string,
  onBack?: Function,
  onDismiss?: Function,
  onForward?: Function,
  theme: Object,
  title: string,
}

const BasicStep = ({ message, onBack, onDismiss, onForward, theme, title }: Props) => (
  <div>
    <h1 {...theme.title}>{title}</h1>
    <p {...theme.content}>{message}</p>
    {onBack
      ? <button onClick={onBack} {...theme.button}>
          <BackIcon />
        </button>
      : null}
    {onDismiss
      ? <button onClick={onDismiss} {...theme.button}>
          <DismissIcon />
        </button>
      : null}
    {onForward
      ? <button onClick={onForward} {...theme.button}>
          <ForwardIcon />
        </button>
      : null}
  </div>
)

const defaultTheme = {
  container: {
    background: 'white',
    boxShadow: '2px 2px 7px 0 rgba(0,0,0,0.75)',
    color: '#000000',
    padding: 30,
    position: 'absolute',
    textAlign: 'center',
    width: 270,
  },
  button: {
    backgroundColor: 'transparent',
    border: 0,
    boxShadow: 'none',
    background: 'none',
    outline: 'none',
    verticalAlign: 'middle',
  },
  content: {
    ...Fonts.base,
    textAlign: 'left',
    paddingBottom: 20,
  },
  title: {
    ...Fonts.large,
  },
}

export default Theme('BasicStep', defaultTheme)(BasicStep)
