import * as React from 'react'
import { OrderDetail } from './detail'
import { Form, message } from 'antd'
import axios from '@/utils/axios'
import api from '@/api'
import './styles.less'


class OrderAdd extends OrderDetail{
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
        axios.post(api.order.add, values).then(res => {
          if (res.data.code === 200) {
            this.props.form.resetFields()
            message.info('创建成功')
            this.props.onClose()
          } else {
            message.error(res.data.msg)
          }
        })
      })
    } else {
      this.props.onClose()
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
