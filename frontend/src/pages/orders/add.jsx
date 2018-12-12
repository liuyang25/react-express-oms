import * as React from 'react'
import { OrderDetail } from './detail'
import { Form, message, Select, Input, InputNumber, DatePicker } from 'antd'
import axios from '@/utils/axios'
import api from '@/api'
import './styles.less'

const Option = Select.Option
interface Props{
  onClose: Function,
  onSuccess: Function
}

class OrderAdd extends OrderDetail<Props> {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      loading: false,
      editing: true
    }
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
        
        axios.post(api.order.add, reqData).then(res => {
          if (res.data.code === 200) {
            this.props.form.resetFields()
            message.info('创建成功')
            this.props.onSuccess(true)
          } else {
            message.error(res.data.msg)
          }
        })
      })
    } else {
      this.props.onClose()
    }
  }
  // 想用继承写法，报错了
  renderInput(conf) {
    switch (conf.type) {
      case 'number':
        return <InputNumber />
      case 'select':
        const options = this.state[conf.options]
        return (
          <Select onChange={conf.onChange} {...conf.params}>
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
        return <DatePicker />
      default:
        return <Input />
    }
  }
  handleCancel() {
    this.props.onClose()
  }
  componentWillReceiveProps(newProps) {}
  componentDidMount() {
    this.fetchOptions()
  }
}
export default Form.create()(OrderAdd)
