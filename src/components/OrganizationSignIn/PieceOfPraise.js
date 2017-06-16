import React from 'react'
import Theme from 'js-theme'
import { Fonts, Spacing } from '@workflo/styles'
import { Icon, Image } from '@workflo/components'

type PraiseSourceT = 'Twitter'

type PropsT = {
  /* A URL for a profile photo for the praiser */
  photo: string,
  /* What the praiser had to say about us */
  description: string,
  /* Where this praise came from. Controls the icon we display */
  source: PraiseSourceT,
  /* The praiser's first and last name */
  name: string,
  /* The praiser's social media username or handle */
  username: string,
  /* JS Theme */
  theme: Object,
}

const PieceOfPraise = ({
  organizationName,
  description,
  name,
  username,
  theme,
  photo,
}: PropsT) => (
  <div {...theme.pieceOfPraise}>
    <div {...theme.photo}>
      <Image width="40" src={photo} />
    </div>
    <div {...theme.description}>
      {description}
    </div>
    <div {...theme.icon}>
      <Icon name="twitter" fill="#0084b4" />
    </div>
    <div {...theme.name}>
      {name}
      {` ${username}`}
    </div>
  </div>
)

const defaultTheme = {
  pieceOfPraise: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 300,
    margin: Spacing.small,
  },
  photo: {
    marginBottom: Spacing.small,
  },
  description: {
    ...Fonts.base,
  },
  icon: {
    margin: Spacing.tiny,
  },
  name: {
    ...Fonts.base,
  },
}

export default Theme('PieceOfPraise', defaultTheme)(PieceOfPraise)
