import React from 'react'
import Theme from 'js-theme'
import { Tab, TabList, TabPanel, Tabs, View } from '@workflo/components'
import { Card } from '@workflo/components/lib/Accordion'
import { Colors, Spacing, Fonts } from '@workflo/styles'
import Slate from 'slate'
import CopyToClipboard from 'react-copy-to-clipboard'
import ComponentTreeEditor from '../ComponentTreeEditor'
import {
  generateTreeLayout,
  generateTreeLayoutMarkup,
} from '../ComponentTreeEditor/utils/ComponentTreeLayout'
import Data from '../Data'
import type { CompletionDataT } from '../../utils/CompositeComponents/Completion'

import { Helpers as TreeHelpers } from '../../modules/ComponentTree'

type DataT = {
  /* Passed in on initial load to seed the editor state */
  text: string,
  state?: ?Slate.State,
}

type PropsT = {
  actions: DataT,
  completionData?: CompletionDataT,
  componentTree: Object,
  data: DataT,
  nodeIdGenerator: Function,
  onChangeActions: Function,
  onChangeComponentName?: Function,
  onChangeComponentTree?: Function,
  onChangeData: Function,
  onChangePropName?: Function,
  onChangePropValue?: Function,
  onInsertComponent?: Function,
  onRemoveComponent?: Function,
  onRemoveProp?: Function,
  onSelectComponent?: Function,
  /**
   * Index of the selected tab.
   */
  selectedTabIndex?: ?number,
  /**
   * If set to true the contents of the Data editor will animate onto the screen
   * as if typed.
   */
  shouldAnimateDataEditor: boolean,
  theme: any,
}

const defaultProps = {
  onChangeData: () => {},
  onChangeActions: () => {},
  data: {
    text: '',
  },
  actions: {
    text: '',
  },
}

type StateT = {
  selectedIndex: number,
  markup: string,
}

class LiveEditor extends React.Component {
  props: PropsT
  state: StateT

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: props.selectedTabIndex !== undefined &&
        props.selectedTabIndex !== null
        ? props.selectedTabIndex
        : 0,
      copied: false,
      markup: '',
    }
  }

  handleSelect = index => this.setState({ selectedIndex: index })

  handleTreeChange = tree => {
    const { onChangeComponentTree } = this.props
    const rawTreeData = TreeHelpers.getRawTreeData(tree)
    onChangeComponentTree && onChangeComponentTree(rawTreeData)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTabIndex !== undefined && nextProps.selectedTabIndex !== null) {
      this.setState({ selectedIndex: nextProps.selectedTabIndex })
    }
  }

  render() {
    const {
      actions,
      completionData,
      componentTree,
      data,
      nodeIdGenerator,
      onChangeActions,
      onChangeComponentName,
      onChangeComponentTree, // eslint-disable-line no-unused-vars
      onChangeData,
      onChangePropName,
      onChangePropValue,
      onInsertComponent,
      onRemoveComponent,
      onRemoveProp,
      onSelectComponent,
      selectedTabIndex, // eslint-disable-line no-unused-vars
      shouldAnimateDataEditor,
      theme,
    } = this.props

    const properTree = TreeHelpers.createTree(componentTree)
    const treeLayout = generateTreeLayout(properTree)
    const treeMarkup = generateTreeLayoutMarkup(treeLayout)

    return (
      <View {...theme.liveEditor} data-walkthrough-id="live-editor">
        <Card title="Handlers" theme={cardTheme}>
          <div {...theme.cardContent}>
            <Data state={actions.state} text={actions.text} onChange={onChangeActions} />
          </div>
        </Card>
        <Card title="Mock Data" theme={cardTheme}>
          <div {...theme.cardContent}>
            <Data
              state={data.state}
              text={data.text}
              onChange={onChangeData}
              shouldAnimate={shouldAnimateDataEditor}
            />
          </div>
        </Card>
        <Card title="Markup" isInitiallyExpanded theme={cardTheme}>
          <div {...theme.cardContent}>
            <ComponentTreeEditor
              tree={properTree}
              layout={treeLayout}
              markup={treeMarkup}
              completionData={completionData}
              nodeIdGenerator={nodeIdGenerator}
              onChange={this.handleTreeChange}
              onChangeComponentName={onChangeComponentName}
              onChangePropName={onChangePropName}
              onChangePropValue={onChangePropValue}
              onInsertComponent={onInsertComponent}
              onRemoveProp={onRemoveProp}
              onRemoveComponent={onRemoveComponent}
              onSelectComponent={onSelectComponent}
            />
          </div>
        </Card>
      </View>
    )
  }
}

const cardTheme = {
  card: { marginBottom: Spacing.micro },
  cardTitle: { ...Fonts.base },
}

const defaultTheme = {
  cardContent: {
    paddingLeft: 22,
  },
  liveEditor: {
    padding: Spacing.small,
    paddingTop: Spacing.base + Spacing.tiny,
    backgroundColor: Colors.grey900,
    color: Colors.grey300,
    overflowY: 'scroll',
    flex: '1 1 auto',
    position: 'relative',
  },
  liveEditorTabs: {},
}

export default Theme('LiveEditor', defaultTheme)(LiveEditor)
