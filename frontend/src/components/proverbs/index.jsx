import * as React from 'react'
import config from './config'


class Proverb extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
    this.state = {
      index: Math.floor(Math.random() * config.length)
    }
    this.timer = null
  }
  componentDidMount() {
    const self = this
    setInterval(()=>{
      self.setState({
        index: Math.floor(Math.random() * config.length)
      })
    }, 10000)
  }
  componentWillUnMount(){
    if(this.timer!= null) {
      clearInterval(this.state.timer);
    }
  }

  render() {
    return (
      <span>{config[this.state.index]}</span>
    )
  }
}
export default Proverb
