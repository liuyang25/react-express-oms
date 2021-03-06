import * as React from 'react'
import { ReceiverAdd } from './add'
import { message, Form } from 'antd'
import axios from '@/utils/axios'
import api from '@/api'
import './styles.less'


interface Props {
  ids: Object
}

@Form.create({
  mapPropsToFields(props) {
    const keys = Object.keys(props.data)
    const res = {}
    keys.forEach(key => 
      res[key]= Form.createFormField({
        value:props.data[key],
      }))
    return res
  },
})
class ReceiverEdit extends ReceiverAdd{
  constructor(props) {
    super(props)
    this.state = {}
  }
  formList = [
    { key: 'customer_id', label: '客户代码',
      disabled: true,
      rules: [{ required: true, message: '请输入收货方客户代码' }],
    },
    { key: 'componey_name', label: '公司名称' },
    { key: 'address', label: '地址' },
    { key: 'principal', label: '负责人' },
    { key: 'contact', label: '联系方式' },
    { key: 'main_business', label: '主要营业方向' },
    { key: 'comment', label: '备注' }
  ]

  componentDidMount() {}
  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.error(err)
      }
      axios.post(api.receiptor.update, {...values, ...this.props.ids}).then(res => {
        if (res.data.code === 200) {
          this.props.form.resetFields()
          message.info('修改成功')
          this.props.onSuccess()
        } else {
          message.error(res.data.msg)
        }
      })
    })
  }
}
export default ReceiverEdit
