/* @flow */
import React from 'react'
import TextEditor from '@workflo/components/lib/TextEditor'
import JSEditorPlugin from '../../utils/EditorPlugins/JSEditorPlugin'

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
    plugins={[
      JSEditorPlugin({}),
    ]}
    onChange={onChange}
  />
)
Data.defaultProps = defaultProps

export default Data
