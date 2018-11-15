import * as React from 'react'
import { Form, Input, Button, message, DatePicker } from 'antd'
import axios from '@/utils/axios'
import api from '@/api'

const FormItem = Form.Item

@Form.create()
class LogisticsAdd extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.error(err)
      }
      axios.post(api.logistics.add, values).then(res => {
        if (res.data.code == 200) {
          this.props.form.resetFields()
          message.info('创建成功')
        } else {
          message.error(res.data.msg)
        }
      })
    })
  }
  renderFormItem() {
    const { getFieldDecorator } = this.props.form
    const formList = [
      {
        key: 'goods_code',
        label: '商品代码',
        rules: [
          {
            required: true,
            message: '必须输入商品代码!'
          }
        ]
      },
      { key: 'time', label: '时间', render:(<DatePicker/>) },
      { key: 'information', label: '信息描述' },
      { key: 'comment', label: '备注' }
    ]

    const res = []
    formList.forEach(item => {
      res.push(
        <FormItem
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          label={item.label}
          key={item.key}
        >
          {getFieldDecorator(item.key, { rules: item.rules })(item.render?item.render:<Input />)}
        </FormItem>
      )
    })
    return res
  }

  componentDidMount() {}
  render() {
    // const { autoCompleteResult } = this.state

    return (
      <Form onSubmit={this.handleSubmit} style={{textAlign:'left'}}>
        {this.renderFormItem()}
        <FormItem wrapperCol={{ span: 14, offset: 4 }}>
          <Button type="primary" htmlType="submit" style={{ float: 'left' }}>
            提交
          </Button>
        </FormItem>
      </Form>
    )
  }
}
export default LogisticsAdd
