import * as React from 'react'
import { LoginStore } from '@/stores/loginStore'
import { inject, observer } from 'mobx-react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
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
          this.props.loginStore.userName = res.data.name || '无名'
          this.props.history.push('/')
        } else {
          alert('登录失败')
        }
      })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
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
      </div>
    )
  }
}

export default Login
