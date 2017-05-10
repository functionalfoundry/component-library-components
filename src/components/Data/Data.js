/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import TextEditor from '@workflo/components/lib/TextEditor'
import JSEditorPlugin from '../../utils/EditorPlugins/JSEditorPlugin'
import { trimStart } from 'lodash'

import SplitText from '../../../vendor/greensock/commonjs-flat/SplitText'
import TimelineMax from '../../../vendor/greensock/commonjs-flat/TimelineMax'
import {
  // Circ,
  Power4,
} from '../../../vendor/greensock/commonjs-flat/EasePack'

type Props = {
  shouldAnimate: boolean,
  state?: any,
  text: string,
  onChange: Function,
  onChangeState: Function,
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

  _editorRef: any
  _isAnimating: boolean

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
          const trimmedInnerHTML = trimStart(innerHTML)
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
       * For some reason greensock SplitText on the groups above produces mounted as well
       * as unmonunted nodes. We filter out the unmounted nodes by checking for a parentNode
       * so that our staggered animation timings are not messed up.
       */
      const mountedChars = chars.filter(char => char.firstChild.nodeType === 3)

      // mountedChars.forEach(char => console.log(char.innerHTML))

      const tl = new TimelineMax()

      // tl.fromTo(
      //   '.target',
      //   0.1,
      //   {
      //     opacity: 0,
      //     scale: 0.5,
      //   },
      //   {
      //     opacity: 0.2,
      //     scale: 2.5,
      //     transformOrigin: '50% 50%',
      //     ease: Power4.easeOut,
      //   }
      // )
      // tl.to('.target', 0.05, {
      //   opacity: 0,
      //   ease: Circ.easein,
      // })
      // tl.fromTo(
      //   '.cursor',
      //   0.22,
      //   {
      //     opacity: 0,
      //   },
      //   {
      //     opacity: 1,
      //     yoyo: true,
      //     repeat: 3,
      //     delay: 0.1,
      //     repeatDelay: 0.1,
      //     ease: Circ.easeInOut,
      //   }
      // )
      // this.chars = chars
      // chars.forEach(char => {
      //   char.style.opacity = 0
      // })
      tl.staggerFromTo(
        mountedChars,
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
  saveEditorRef = (ref: any) => {
    this._editorRef = ref
  }
  render() {
    const { state, text, onChange, onChangeState } = this.props
    const { shouldAnimate } = this.state
    /** We disable the editor while animation is happening */
    return (
      <TextEditor
        onChange={onChange}
        onChangeState={onChangeState}
        plugins={[JSEditorPlugin({})]}
        readOnly={shouldAnimate}
        ref={this.saveEditorRef}
        state={state}
        text={text}
      />
    )
  }
}

export default Data
