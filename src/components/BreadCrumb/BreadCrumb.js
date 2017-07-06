import React from 'react'
import Theme from 'js-theme'

import { Colors, Fonts } from '@workflo/styles'
import { EditableText, View } from '@workflo/components'

export type BreadCrumbSegmentT =
  | {
      value: string,
      onClick: Function,
    }
  /** This type should only be used for the last element of the BreadCrumbSegmentT array */
  | {
      value: string,
      isEditing: boolean,
      editable: boolean,
      onChange: Function,
      onStartEdit: Function,
      onStopEdit: Function,
    }

type Props = {
  breadCrumbPath: Array<BreadCrumbSegmentT>,
  theme: Object,
}

const BreadCrumb = ({ breadCrumbPath = [], theme }: Props) => {
  return (
    <View {...theme.container} inline>
      {breadCrumbPath.map(
        (pathSegment, index) =>
          index < breadCrumbPath.length - 1
            ? <View {...theme.parentSegment} key={index} onClick={pathSegment.onClick}>
                <View {...theme.parentSegementText} inline>
                  {pathSegment.value || null}
                </View>
                {index < breadCrumbPath.length - 1 ? <span>&nbsp;/&nbsp;</span> : null}
              </View>
            : <EditableText
                isEditing={pathSegment.isEditing}
                key={index}
                onChange={pathSegment.onChange}
                onStartEdit={pathSegment.onStartEdit}
                onStopEdit={pathSegment.onStopEdit}
                readOnly={!pathSegment.editable}
                value={pathSegment.value}
              />
      )}
    </View>
  )
}

const defaultTheme = {
  container: {
    ...Fonts.base,
    display: 'flex',
    flexDirection: 'row',
  },
  parentSegment: {
    ':hover': {
      color: 'white',
    },
    color: Colors.grey200,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    fontWeight: 600,
  },
  parentSegementText: {
    ':hover': {
      textDecoration: 'underline',
    },
  },
}

export default Theme('BreadCrumb', defaultTheme)(BreadCrumb)
