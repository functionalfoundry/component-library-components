import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ComponentsLeftNav from './ComponentsLeftNav'
import { branches, repos } from '../../../mocks/header'

const items = [
  {
    id: 1,
    label: 'Animation',
  },
  {
    id: 2,
    label: 'Button',
  },
  {
    id: 3,
    label: 'Card',
  },
]

storiesOf('ComponentsLeftNav', module).add('Regular', () => (
  <div style={{ height: 800, width: 250 }}>
    <Container />
  </div>
))

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterValue: '',
      selectedId: null,
    }
  }
  handleChangeFilter = value => {
    this.setState({ filterValue: value })
  }
  handleSelect = id => {
    this.setState({ selectedId: id })
  }
  filterItems = items => {
    return items.filter(item => item.label.indexOf(this.state.filterValue) !== -1)
  }
  render() {
    console.log('branches: ', branches)
    return (
      <ComponentsLeftNav
        filterValue={this.state.filterValue}
        items={this.filterItems(items)}
        onChangeFilter={this.handleChangeFilter}
        onSelect={this.handleSelect}
        selectedId={this.state.selectedId}
        repos={repos}
        branches={branches}
        selectedRepoId={repos[0].id}
        selectedBranchId={branches[0].id}
        onClickRepoGithub={action('clickRepoGithub')}
        onSelectRepo={action('onSelectRepo')}
        buildStatus="Success"
      />
    )
  }
}
