/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import Slate from 'slate'
import Theme from 'js-theme'
import TextEditor from '@workflo/components/lib/TextEditor'
import JSEditorPlugin from '../../utils/EditorPlugins/JSEditorPlugin'

import SplitText from '../../../vendor/greensock/commonjs-flat/SplitText'
import TimelineMax from '../../../vendor/greensock/commonjs-flat/TimelineMax'
import { Circ, Power4 } from '../../../vendor/greensock/commonjs-flat/EasePack'
import trimLeft from '../../utils/String/trimLeft'

type Props = {
  onChange: Function,
  shouldAnimate: boolean,
  state?: ?Slate.State,
  text: string,
  theme: Object,
}

type State = {
  shouldAnimate: boolean,
}

const defaultProps = {
  onChange: () => {},
  shouldAnimate: false,
}

class Data extends React.Component {
  props: Props
  state: State

  _cursorRef: any
  _editorRef: any
  _targetRef: any

  static defaultProps = defaultProps

  constructor(props: Props) {
    const { shouldAnimate } = props
    super(props)
    this.state = {
      shouldAnimate,
    }
  }

  componentDidMount() {
    if (this.state.shouldAnimate) {
      this.animateLines()
    }
  }

  animateLines() {
    if (!this._editorRef) {
      return
    }

    const editorNode = ReactDOM.findDOMNode(this._editorRef)

    /** Greensock doesn't do well w/ deep nesting so we traverse children */
    const textNodes = editorNode &&
      editorNode.firstChild &&
      editorNode.firstChild.firstChild &&
      editorNode.firstChild.firstChild.firstChild
      ? editorNode.firstChild.firstChild.firstChild.childNodes
      : null

    if (textNodes) {
      const splitWords = new SplitText(textNodes, {
        charsClass: 'char',
        /** Undocumented greensock API we use to avoid messing up editor indentation */
        reduceWhiteSpace: false,
        type: 'chars,words',
        wordsClass: 'word',
      }).words

      /**
       * When greensock splits characters/words into their own divs, it converts
       * them to inline block elements, which are white-space sensitive. In order
       * to keep the indentation of the output HTML from being read as whitespace,
       * we have to manually trim the innerHTML of the word divs parent container
       * after the initial transformation.
       */
      const groups = Array.from(splitWords).map(word => word.parentElement)
      groups.forEach(group => {
        if (group) {
          const innerHTML = group.innerHTML
          const trimmedInnerHTML = trimLeft(innerHTML)
          group.innerHTML = trimmedInnerHTML
        }
      })

      /**
       * Need to split a second time because resetting the inerHTML up above unmounts the divs
       * that the split chars previously pointed to.
       */
      const chars = new SplitText(groups, {
        type: 'chars,words',
      }).chars

      /**
       * For some reason greensock SplitText on the groups above produces duplicate
       * nodes at varying levels of nesting for each character. By filtering on the nodes
       * whose immediate child are text nodes (nodeType === 3) we prevent duplication which
       * would otherwise throw of the timing of the animation.
       */
      const dedupedChars = chars.filter(char => char.firstChild.nodeType === 3)

      const tl = new TimelineMax()

      const cursor = ReactDOM.findDOMNode(this._cursorRef)
      const target = ReactDOM.findDOMNode(this._targetRef)

      tl.fromTo(
        target,
        0.1,
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 0.2,
          scale: 2.5,
          transformOrigin: '50% 50%',
          ease: Power4.easeOut,
        }
      )
      tl.to(target, 0.05, {
        opacity: 0,
        ease: Circ.easein,
      })
      tl.fromTo(
        cursor,
        0.22,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          yoyo: true,
          repeat: 3,
          delay: 0.1,
          repeatDelay: 0.1,
          ease: Circ.easeInOut,
        }
      )
      tl.staggerFromTo(
        dedupedChars,
        0.22,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: Power4.easeOut,
        },
        0.04,
        '+-0',
        () => {
          this.setState(() => ({ shouldAnimate: false }))
        }
      )
    }
  }

  saveCursorRef = (ref: any) => {
    this._cursorRef = ref
  }

  saveEditorRef = (ref: any) => {
    this._editorRef = ref
  }

  saveTargetRef = (ref: any) => {
    this._targetRef = ref
  }

  render() {
    const { onChange, state, text, theme } = this.props
    const { shouldAnimate } = this.state
    /** We disable the editor while animation is happening */
    return (
      <div {...theme.container}>
        <TextEditor
          onChange={onChange}
          plugins={[JSEditorPlugin({ shouldAnimate })]}
          readOnly={shouldAnimate}
          ref={this.saveEditorRef}
          state={state}
          text={text}
        />
        {shouldAnimate ? <div {...theme.cursor} ref={this.saveCursorRef}>|</div> : null}
        {shouldAnimate ? <div {...theme.target} ref={this.saveTargetRef} /> : null}
      </div>
    )
  }
}
const positioning = {
  top: 3,
  left: -3,
}

const defaultTheme = {
  container: {
    position: 'relative',
  },
  cursor: {
    ...positioning,
    position: 'absolute',
    fontSize: '20px',
    color: '#555',
  },
  target: {
    ...positioning,
    position: 'absolute',
    background: '#999',
    opacity: '0.2',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
  },
}

export default Theme('Data', defaultTheme)(Data)
