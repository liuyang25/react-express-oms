import * as React from 'react'
import { Form, Input, InputNumber, Select, DatePicker, Button, message, Row, Col } from 'antd'
import axios from '@/utils/axios'
import api from '@/api'
import './styles.less'

const FormItem = Form.Item
const Option = Select.Option

@Form.create()
class OrderAdd extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      customerNameOptions: [],
      customerIdOptions: []
    }
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
          this.props.onSuccess()
        } else {
          message.error(res.data.msg)
        }
      })
    })
  }
  renderFormItem() {
    const { getFieldDecorator } = this.props.form
    // type: 0 input 1 numberinput 2 select 3 date
    const self = this
    const formList = [
      { key: 'order_code', label: '货物编号（唯一）' },
      { key: 'receiving_name', label: '收货方名称' },
      {
        key: 'customer_name',
        label: '客户名称',
        rules: [{ required: true, message: '请选择客户' }],
        options: self.state.customerNameOptions
      },
      { key: 'receiving_address', label: '收货方地址' },
      {
        key: 'customer_id',
        label: '客户代码',
        rules: [{ required: true, message: '请选择客户' }],
        options: self.state.customerIdOptions
      },
      { key: 'receiving_contact', label: '收货方联系方式' },
      { key: 'good_name', label: '货物名称' },
      { key: 'receiving_comment', label: '收货方备注信息' },
      { key: 'good_amount', label: '数量' },
      { key: 'carriage', label: '运费(元)' },
      { key: 'good_num', label: '件数', type:1},
      { key: 'additional_fee', label: '附加费(元)', type: 1 },
      { key: 'good_weight', label: '重量(kg)', type: 1 },
      { key: 'recieved_fee', label: '已收费用(元)', type:1 },
      { key: 'good_volume', label: '体积' },
      { key: 'concerted_pay_date', label: '协议付款日期', type:3 },
      { key: 'good_volume_detail', label: '尺寸' },
      { key: 'reparations', label: '赔款(元)', type:1 },
      { key: 'good_type', label: '商品型号' },
      { key: 'logistics_company', label: '物流公司' },
      { key: 'good_attr', label: '商品属性' },
      { key: 'logistics_orderid', label: '物流单号' },
      { key: 'customs_code', label: '海关编码' },
      { key: 'logistics_cost', label: '物流成本' },
      { key: 'declared_value', label: '申报价值' },
      { key: 'logistics_reparations', label: '物流赔款(元)', type:1 },
      { key: 'receiving_time', label: '下单时间', type: 3 },
      { key: 'comment', label: '备注' },
      { key: 'order_closed', label: '订单是否关闭', type:2, options:[
        {value: '1', label: '是'},
        {value: '0', label: '否'},
      ] },
      { key: 'logistics_completed', label: '物流是否完结', type: 2, options: [
        {value: '1', label: '是'},
        {value: '0', label: '否'},
      ] }
    ]
    const renderInput = conf => {
      switch(conf.type) {
        case 1:
          return <InputNumber/>
        case 2:
          return (
            <Select>
              {conf.options.map(option=>{
                return (
                  <Option key={option.value} value={option.value}>{option.label}</Option>
                )
              })}
            </Select>
          )
        case 3:
          return <DatePicker/>
        default: 
          return <Input/>
      }
    }

    const res = []
    const l = formList.length
    for (let i = 0; i < Math.floor(l / 2); i++) {
      const i2 = 2 * i
      const item1 = formList[i2]
      const item2 = formList[i2 + 1]
      res.push(
        <Row className="form-row" key={i}>
          <Col span={12}>
            <FormItem
              labelCol={{ offset: 1, span: 5 }}
              wrapperCol={{ span: 16 }}
              label={item1.label}
              key={item1.key}
            >
              {getFieldDecorator(item1.key, { rules: item1.rules })(renderInput(item1))}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              labelCol={{ offset: 2, span: 5 }}
              wrapperCol={{ span: 16 }}
              label={item2.label}
              key={item2.key}
            >
              {getFieldDecorator(item2.key, { rules: item2.rules })(renderInput(item2))}
            </FormItem>
          </Col>
        </Row>
      )
    }
    return res
  }

  componentDidMount() {}
  render() {
    return (
      <div className="order-add">
        <Form onSubmit={this.handleSubmit} style={{ textAlign: 'left' }}>
          {this.renderFormItem()}
          <Row className="form-footer">
            <FormItem style={{ float: 'right' }}>
              <Button type="primary" htmlType="submit">
                {' '}
                提交{' '}
              </Button>
            </FormItem>
            <Button onClick={() => this.props.onCancel()}>取消</Button>
          </Row>
        </Form>
      </div>
    )
  }
}
export default OrderAdd
