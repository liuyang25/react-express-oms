import * as React from 'react'
import { Form, Input, Button, message } from 'antd'
import axios from '@/utils/axios'
import api from '@/api'

const FormItem = Form.Item

@Form.create()
class CustomerDetail extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      detailData: {},
    }
  }
  fetchData(){
    const customerCode = this.props.location.query.customerCode;
    axios.post(api.customer.detail, customerCode).then(res)
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.error(err)
      }
      axios.post(api.customer.add, values).then(res => {
        if (res.data.code === 200) {
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
      { key: 'customer_id', label: '客户代码' },
      { key: 'componey_name', label: '公司名称' },
      { key: 'address', label: '地址' },
      { key: 'principal', label: '负责人' },
      { key: 'contact', label: '联系方式' },
      { key: 'main_business', label: '主要营业方向' },
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
          {this.state.editing ? getFieldDecorator(item.key, {rules: item.rules })(<Input />):
            <span>{this.state.detailData[item.key]}</span>
          }
        </FormItem>
      )
    })
    return res
  }

  componentDidMount() {
    this.fetchData()
  }
  render() {
    // const { autoCompleteResult } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
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
export default CustomerDetail
