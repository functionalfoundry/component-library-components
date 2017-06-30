import React from 'react'
import Theme from 'js-theme'

type PropsT = {}

const InfoTableRow = ({  }: PropsT) => <div />

const defaultTheme = {}

const ThemedInfoTableRow = Theme('InfoTableRow', defaultTheme)(InfoTableRow)
export default ThemedInfoTableRow
