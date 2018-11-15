import * as React from 'react'
import { LoginStore } from '@/stores/loginStore'
import { inject, observer } from 'mobx-react'

interface Props {
  loginStore: LoginStore;
}
const imgStyle = {
  height: '50px'
}
const homeStyle = {
  textAlign: 'left',
  paddingLeft: '50px',
  paddingTop: '50px'
}

@inject('loginStore')
@observer
class Home extends React.Component<Props> {
  render() {
    const heheImg = require('@/assets/images/mobx.png')
    return (
      <div style={homeStyle}>
        <img style={imgStyle} src={heheImg} alt="hehe" />
        <span style={{ fontSize: '30px' }}>
          Hello {this.props.loginStore.userName}
        </span>
      </div>
    )
  }
}
export default Home
