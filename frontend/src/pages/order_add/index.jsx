import * as React from 'react'
import { Form, Input, Button, message } from 'antd'
import axios from '@/utils/axios'
import api from '@/api'

const FormItem = Form.Item

@Form.create()
class OrderAdd extends React.Component<Props> {
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
      axios.post(api.order.add, values).then(res => {
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
      { key: 'order_code', label: '货物编号（唯一）' },
      { key: 'receiving_name', label: '收货方名称' },
      { key: 'customer_name', label: '客户名称',
        rules: [
          { required: true, message: '请选择客户'}
        ]
       },
      { key: 'receiving_address', label: '收货方地址' },
      { key: 'customer_id', label: '客户代码',
        rules: [
          { required: true, message: '请选择客户'}
        ]
       },
      { key: 'receiving_contact', label: '收货方联系方式' },
      { key: 'good_name', label: '货物名称' },
      { key: 'receiving_comment', label: '收货方备注信息' },
      { key: 'good_amount', label: '数量' },
      { key: 'carriage', label: '运费' },
      { key: 'good_num', label: '件数' },
      { key: 'additional_fee', label: '附加费' },
      { key: 'good_weight', label: '重量' },
      { key: 'recieved_fee', label: '已收费用' },
      { key: 'good_volume', label: '体积' },
      { key: 'concerted_pay_date', label: '协议付款日期' },
      { key: 'good_volume_detail', label: '尺寸' },
      { key: 'reparations', label: '赔款' },
      { key: 'good_type', label: '商品型号' },
      { key: 'logistics_company', label: '物流公司' },
      { key: 'good_attr', label: '商品属性' },
      { key: 'logistics_orderid', label: '物流单号' },
      { key: 'customs_code', label: '海关编码' },
      { key: 'logistics_cost', label: '物流成本' },
      { key: 'declared_value', label: '申报价值' },
      { key: 'logistics_reparations', label: '物流赔款' },
      { key: 'receiving_time', label: '下单时间' },
      { key: 'comment', label: '备注' },
      { key: 'order_closed', label: '订单是否关闭' },
      { key: 'logistics_completed', label: '物流是否完结' }
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
          {getFieldDecorator(item.key, { rules: item.rules })(<Input />)}
        </FormItem>
      )
    })
    return res
  }

  componentDidMount() {}
  render() {
    return (
      <Form onSubmit={this.handleSubmit} style={{textAlign:'left'}}>
        {this.renderFormItem()}
        <FormItem wrapperCol={{ span: 14, offset: 4 }}>
          <Button type="primary" htmlType="submit" style={{ float: 'left' }}>
            提交
          </Button>
        </FormItem>
      </Form
  }
}
export default OrderAdd
