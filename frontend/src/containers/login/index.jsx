import * as React from 'react'
import { LoginStore } from '@/stores/loginStore'
import { inject, observer } from 'mobx-react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import Parallax from 'parallax-js'
import axios from '@/utils/axios'
import api from '@/api'
import './style.less'
const FormItem = Form.Item

interface Props {
  loginStore: LoginStore;
}

@Form.create()
@inject('loginStore')
@observer
class Login extends React.Component<Props> {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('Received values of form: ', values)
        return
      }
      axios.post(api.user.login, values).then(res => {
        if (res.data.code === 200) {
          this.props.loginStore.userName = res.data.user.user_name || '无名'
          this.props.loginStore.account = values.account
          this.props.loginStore.role = res.data.user.role
          this.props.history.push('/')
        } else {
          message.info(res.data.msg)
        }
      })
    })
  }
  componentDidMount(){
    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene);
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const bg = require('@/assets/images/bg.jpg')
    return (
      <div className="login">
        <ul id="scene">
          <li data-depth="0.2" data-limit-y="true" data-calibrate-y="true">
            <img className="bg" alt="bg" src={bg}/>
          </li>
        </ul>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('account', {
              rules: [
                { required: true, message: '输入账号呀!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="账号名"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '输入密码呀!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="/login">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="/login">register now!</a>
          </FormItem>
        </Form>
        <div className="foot">
          <a href="http://www.beian.miit.gov.cn/">粤ICP备19157918号</a>
        </div>
      </div>
    )
  }
}

export default Login
