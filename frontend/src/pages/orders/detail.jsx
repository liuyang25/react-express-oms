import * as React from 'react'
import {
  Col,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Form,
  message
} from 'antd'
import axios from '@/utils/axios'
import api from '@/api'
import moment from 'moment'
import './styles.less'

const FormItem = Form.Item
const Option = Select.Option
interface Props {
  id: '';
  onCommit: Function;
  onClose: Function;
}
export class OrderDetail extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      editing: false,
      customerOptions: [],
      receiptorOptions: [],
      orderStatusOptions: [
        { value: '0', order_closed: '否' },
        { value: '1', order_closed: '是' }
      ],
      logisticsStatusOptions: [
        { value: '0', logistics_completed: '否' },
        { value: '1', logistics_completed: '是' }
      ],
      detailData: {}
    }
  }

  displayRows = [
    { key: 'order_code', label: '货物编号（唯一）', disabled: true },
    {
      key: 'receiving_name',
      label: '收货方名称',
      type: 'select',
      onChange: this.handleReceiptorChange.bind(this),
      options: 'receiptorOptions',
      params: {
        showSearch: true,
        filterOption: true,
        clearable: true
      }
    },
    {
      key: 'customer_name',
      label: '客户名称',
      type: 'select',
      rules: [{ required: true, message: '请选择客户' }],
      onChange: this.handleCustomerChange.bind(this),
      options: 'customerOptions',
      disabled: true
    },
    {
      key: 'receiving_address',
      label: '收货方地址'
    },
    {
      key: 'customer_id',
      label: '客户代码',
      type: 'select',
      rules: [{ required: true, message: '请选择客户' }],
      onChange: this.handleCustomerChange.bind(this),
      options: 'customerOptions',
      disabled: true
    },
    {
      key: 'receiving_contact',
      label: '收货方联系方式'
    },
    { key: 'good_name', label: '货物名称' },
    {
      key: 'receiving_comment',
      label: '收货方备注信息'
    },
    { key: 'good_amount', label: '数量' },
    { key: 'carriage', label: '运费(元)' },
    { key: 'good_num', label: '件数', type: 'number' },
    { key: 'additional_fee', label: '附加费(元)', type: 'number' },
    { key: 'good_weight', label: '重量(kg)', type: 'number' },
    { key: 'recieved_fee', label: '已收费用(元)', type: 'number' },
    { key: 'good_volume', label: '体积' },
    { key: 'concerted_pay_date', label: '协议付款日期', type: 'date' },
    { key: 'good_volume_detail', label: '尺寸' },
    { key: 'reparations', label: '赔款(元)', type: 'number' },
    { key: 'good_type', label: '商品型号' },
    { key: 'logistics_company', label: '物流公司' },
    { key: 'good_attr', label: '商品属性' },
    { key: 'logistics_orderid', label: '物流单号' },
    { key: 'customs_code', label: '海关编码' },
    { key: 'logistics_cost', label: '物流成本' },
    { key: 'declared_value', label: '申报价值' },
    { key: 'logistics_reparations', label: '物流赔款(元)', type: 'number' },
    { key: 'receiving_time', label: '下单时间', type: 'date' },
    { key: 'comment', label: '备注' },
    {
      key: 'order_closed',
      label: '订单是否关闭',
      type: 'select',
      options: 'orderStatusOptions',
      map: (v) => v? '是': '否'
    },
    {
      key: 'logistics_completed',
      label: '物流是否完结',
      type: 'select',
      options: 'logisticsStatusOptions',
      map: (v) => v? '是': '否'
    }
  ]
  handleCancel() {
    this.setState({
      editing: false
    })
  }
  handleEdit() {
    this.setState({
      editing: true
    })
    this.fetchReceiptorOptions(this.state.detailData.customer_id)
  }
  mapReqData(data) {
    const f = (options, key, value) => {
      let option = this.state[options][data[key]]
      if (option) {
        data[key] = option[value]
      }
    }
    f('orderStatusOptions', 'order_closed', 'value')
    f('logisticsStatusOptions', 'logistics_completed', 'value')
    f('customerOptions', 'customer_id', 'customer_id')
    f('customerOptions', 'customer_name', 'customer_name')
    f('receiptorOptions', 'receiving_name', 'receiving_name')
  }
  handleConfirm() {
    if (this.state.editing) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          console.error(err)
          return
        }
        const reqData = JSON.parse(JSON.stringify(values))
        this.mapReqData(reqData)

        axios.post(api.order.update, reqData).then(res => {
          if (res.data.code === 200) {
            this.props.form.resetFields()
            message.info('更新成功')
            this.props.onCommit()
          } else {
            message.error(res.data.msg)
          }
        })
      })
    } else {
      this.props.onClose()
    }
  }
  handleCustomerChange(v, option) {
    this.props.form.setFieldsValue({
      ...option.props.data
    })
    this.fetchReceiptorOptions(option.props.data.customer_id)
  }
  handleReceiptorChange(v, option) {
    this.props.form.setFieldsValue({
      ...option.props.data
    })
  }
  fetchReceiptorOptions(id) {
    // 收货方信息
    axios
      .post(api.order.getReceiptorList, {
        customer_id: id 
      })
      .then(res => {
        if (res.data && res.data.code === 200) {
          const receiptorOptions = []
          res.data.list.forEach(item => {
            receiptorOptions.push({
              receiving_name: item.name,
              receiving_address: item.address,
              receiving_contact: item.contact,
              receiving_comment: item.comment
            })
          })
          this.setState({
            receiptorOptions
          })
        }
      })
  }
  fetchOptions() {
    // 客户信息
    axios.post(api.order.options).then(res => {
      if (res.data && res.data.code === 200) {
        const customerOptions = []
        res.data.list.forEach(item => {
          customerOptions.push({
            customer_id: item.customer_id,
            customer_name: item.componey_name
          })
        })
        this.setState({
          customerOptions
        })
      }
    })
  }
  fetchData(id) {
    this.setState({
      loading: true,
      editing: false
    })
    this.fetchOptions()
    axios
      .post(api.order.detail, { order_code: id || this.props.id })
      .then(res => {
        if (res.data && res.data.code === 200) {
          this.setState({
            loading: false
          })
          const fields = {}
          this.displayRows.forEach(item => {
            let v = res.data.details[item.key]
            if (item.type == 'date') {
              v = v ? moment(v) : undefined
            }
            fields[item.key] = v
          })
          this.setState({
            detailData: fields
          })
        }
      })
  }
  componentWillReceiveProps(newProps) {
    if (this.props.id !== newProps.id) {
      this.fetchData(newProps.id)
    }
  }
  componentDidUpdate(preProps, preState) {
    if (!preState.editing && this.state.editing) {
      this.props.form.setFieldsValue(this.state.detailData)
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  renderInput(conf) {
    switch (conf.type) {
      case 'number':
        return <InputNumber disabled={conf.disabled} />
      case 'select':
        const options = this.state[conf.options]
        return (
          <Select
            disabled={conf.disabled}
            onChange={conf.onChange}
            {...conf.params}
          >
            {options.map((option, index) => {
              return (
                <Option key={index} data={option} value={index}>
                  {option[conf.key]}
                </Option>
              )
            })}
          </Select>
        )
      case 'date':
        return <DatePicker disabled={conf.disabled} />
      default:
        return <Input disabled={conf.disabled} />
    }
  }
  renderDetailItem(conf) {
    const v = this.state.detailData[conf.key]
    switch (conf.type) {
      case 'select':
        return conf.map ? conf.map(v) : v
      case 'date':
        return v ? moment(v).format('YYYY-MM-DD') : ''
      default:
        return v
    }
  }
  renderFooter() {
    return this.state.editing ? (
      <div className="order-detail-footer">
        <Button type="primary" onClick={() => this.handleConfirm()}>
          提交
        </Button>
        <Button onClick={() => this.handleCancel()}>取消</Button>
      </div>
    ) : (
      <div className="order-detail-footer">
        <Button type="primary" onClick={() => this.handleConfirm()}>
          关闭
        </Button>
        <Button onClick={() => this.handleEdit()}>编辑</Button>
      </div>
    )
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="order-detail">
        <Form className="order-detail-content">
          {this.displayRows.map((item, index) => {
            return (
              <Col span={12} key={index}>
                <FormItem
                  labelCol={{ offset: 1, span: 6 }}
                  wrapperCol={{ span: 11 }}
                  label={item.label}
                  key={item.key}
                >
                  {' '}
                  {this.state.editing
                    ? getFieldDecorator(item.key, { rules: item.rules })(
                        this.renderInput(item)
                      )
                    : this.renderDetailItem(item)}
                </FormItem>
              </Col>
            )
          })}
        </Form>
        {this.renderFooter()}
      </div>
    )
  }
}
export default Form.create()(OrderDetail)
