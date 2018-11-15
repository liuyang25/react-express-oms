import React from 'react';
import { LoginStore } from '@/stores/loginStore';
import { observer } from 'mobx-react';
import { Menu, Dropdown, Button } from 'antd';

export interface Props {
  loginStore: LoginStore;
}

// @inject('loginStore')  // 不是通过router挂载的组件，参数通过props传递，不需要注入
@observer
class LoginInfo extends React.Component<Props> {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <span 
            onClick={() => {
              this.props.loginStore.userName = '';
            }}
          >退出
          </span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div style={{ float: 'right', color: 'white' }}>
        {this.props.loginStore.userName &&
          <p> Hi {this.props.loginStore.userName}
            <span style={{ marginLeft: '10px' }}>
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button icon="user" shape="circle" />
              </Dropdown>
            </span>
          </p>
        }
      </div>
    );
  }
}

export default LoginInfo;
