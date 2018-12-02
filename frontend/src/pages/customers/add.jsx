import * as React from 'react'
import { Form, Input, Button, message } from 'antd'
import axios from '@/utils/axios'
import api from '@/api'

const FormItem = Form.Item

export class CustomerAdd extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
    this.state = {}
  }
  formList = [
    { key: 'customer_id', label: '客户代码',
      rules: [{ required: true, message: '客户代码为必填项' }],
    },
    { key: 'componey_name', label: '公司名称' },
    { key: 'address', label: '地址' },
    { key: 'principal', label: '负责人' },
    { key: 'contact', label: '联系方式' },
    { key: 'main_business', label: '主要营业方向' },
    { key: 'comment', label: '备注' }
  ]

  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.error(err)
      }
      axios.post(api.customer.add, values).then(res => {
        if (res.data.code === 200) {
          this.props.form.resetFields()
          message.info('创建成功')
          this.props.onSuccess()
          this.props.form.resetFields()
        } else {
          message.error(res.data.msg)
        }
      })
    })
  }
  renderFormItem() {
    const { getFieldDecorator } = this.props.form

    const res = []
    this.formList.forEach(item => {
      res.push(
        <FormItem
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          label={item.label}
          key={item.key}
        >
          {getFieldDecorator(item.key, { rules: item.rules })(<Input disabled={item.disabled} />)}
        </FormItem>
      )
    })
    return res
  }

  componentDidMount() {}
  render() {
    // const { autoCompleteResult } = this.state

    return (
      <div className="customer-add">
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          {this.renderFormItem()}
          <FormItem wrapperCol={{ span: 14, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              // style={{ float: 'left' }}
            >
              提交
            </Button>
            <Button onClick={() => this.props.onCancel()}>取消</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
export default Form.create()(CustomerAdd)
