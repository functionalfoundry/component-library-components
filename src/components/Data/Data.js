/* @flow */
import React from 'react'
import TextEditor from '@workflo/components/lib/TextEditor'

import DataDecorator from '../../utils/DataDecorator'

type PropsT = {
  text: string,
  onChange: Function,
}

const defaultProps = {
  onChange: () => {},
}

const Data = ({
  text,
  onChange,
}: PropsT) => (
  <TextEditor
    text={text}
    decorator={DataDecorator}
    onChange={onChange}
  />
)
Data.defaultProps = defaultProps

export default Data
