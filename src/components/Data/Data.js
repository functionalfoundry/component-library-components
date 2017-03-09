/* @flow */
import React from 'react'
import TextEditor from '@workflo/components/lib/TextEditor'
import JSEditorPlugin from '../../utils/EditorPlugins/JSEditorPlugin'

type PropsT = {
  state?: any,
  text: string,
  onChange: Function,
  onChangeState: Function,
}

const defaultProps = {
  onChange: () => {},
}

const Data = ({
  state,
  text,
  onChange,
  onChangeState,
}: PropsT) => (
  <TextEditor
    state={state}
    text={text}
    plugins={[
      JSEditorPlugin({}),
    ]}
    onChange={onChange}
    onChangeState={onChangeState}
  />
)
Data.defaultProps = defaultProps

export default Data
