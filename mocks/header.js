/** @flow */
import { action } from '@kadira/storybook'
export const breadCrumbPath = [
  {
    onClick: () => action('Navigate to ButtonGroup')(),
    value: 'ButtonGroup',
  },
  {
    onChange: (...args: Array<any>) => action('Changed Example Name:')(...args),
    onStartEdit: () => action('Started Editing')(),
    onStopEdit: () => action('Stopped Editing')(),
    editable: true,
    value: 'With Two Buttons',
  },
]

export const branches = [
  {
    id: 1,
    name: 'master',
    status: 'Failed',
    onStatusIconClick: () => action('onStatusIconClick')(),
    error: 'Showing an error',
  },
  {
    id: 2,
    name: 'develop',
    status: 'Success',
    onStatusIconClick: () => action('onStatusIconClick')(),
  },
  {
    id: 3,
    name: 'refs/zerim/ant-design',
    status: 'Success',
    onStatusIconClick: () => action('onStatusIconClick')(),
  },
]

export const repos = [
  {
    id: 1,
    name: 'components-library-components',
    url: 'https://github.com/workfloapp/component-library-components',
    status: 'Healthy',
  },
  {
    id: 2,
    name: 'components',
    url: 'https://github.com/workfloapp/components',
    status: 'Healthy',
  },
  {
    id: 3,
    name: 'example-library',
    url: 'https://github.com/workfloapp/example-library',
    status: 'Healthy',
  },
]
