import * as React from 'react'
import config from './config'
import './styles.less'


class Proverb extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
    this.state = {
      text: config[Math.floor(Math.random() * config.length)],
    }
    this.timer = null
    this.chars = '!<>-_\\/[]{}&(@%$—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.state.text
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = []
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output.push(to)
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output.push(<span key={i} className="dud">{char}</span>)
      } else {
        output.push(<span key={i}>{from}</span>)
      }
    }
    this.setState({
      text: output
    })
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }  
  componentDidMount() {
    const self = this
    self.timer = setInterval(()=>{
      this.setText(config[Math.floor(Math.random()* config.length)])
    }, 5000)
  }
  componentWillUnmount(){
    if(this.timer!= null) {
      clearInterval(this.state.timer);
    }
  }

  render() {
    return (
      <span>{this.state.text}</span>
    )
  }
}
export default Proverb
