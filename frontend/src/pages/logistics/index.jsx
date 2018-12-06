import * as React from 'react'
import axios from '@/utils/axios'
import api from '@/api'
import { message, Table, Form, Button, DatePicker, Input } from 'antd'
import moment from 'moment'
import './styles.less'

interface Props {
  id: String;
}
@Form.create()
class Logistics extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      editingIndex: -1,
      tableData: []
    }
    this.data = {
      tableData: []
    }
    this.tableColumns = [
      {
        key: 'no',
        title: '序号',
        width: 100,
        render: (text, record, index) => index + 1
      },
      { dataIndex: 'time', title: '日期', width: 200, 
        render: (text, record, index) => {
          return this.state.editingIndex === index
            ? this.props.form.getFieldDecorator('time')(<DatePicker showTime format="YYYY-MM-DD hh:mm:ss"/>)
            : moment(record.time).format('YYYY-MM-DD hh:mm:ss')
        }
      },
      {
        dataIndex: 'information',
        title: '信息描述',
        width: 300,
        render: (text, record, index) => {
          return this.state.editingIndex === index
            ? this.props.form.getFieldDecorator('information')(<Input.TextArea autosize />)
            : record.information
        }
      },
      { dataIndex: 'information_en', title: '英文信息',
        width: 300,
        render: (text, record, index) => {
          return this.state.editingIndex === index
            ? this.props.form.getFieldDecorator('information_en')(<Input.TextArea autosize />)
            : record.information_en
        }
      },
      {
        key: 'operation',
        title: '操作',
        width: 200,
        render: (text, record, index) => {
          return this.state.editingIndex === index ? (
            <span>
              <Button type="primary" onClick={() => this.save(index)}>保存</Button>
              <Button onClick={() => this.cancel()}>取消</Button>
            </span>
          ) : (
            <span>
              <Button type="primary" onClick={() => this.edit(index)}>编辑</Button>
              <Button type="danger" onClick={() => this.delete(index)}>删除</Button>
            </span>
          )
        }
      }
    ]
  }
  syncData(notify){
    const params = {
      order_code: this.props.id,
      logistics_msg:this.state.tableData
    }
    axios.post(api.order.updateLogistics, params).then(res => {
      if (res.data && res.data.code === 200) {
        if (notify) {
          // message.info('保存成功')
        }
      } else {
        message.error(res.data.msg)
        this.fetchData()
      }
    })
  }
  save(index, nonotice) {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.error(err)
        return
      }
      this.setState({
        tableData: this.state.tableData.map((item,index)=>{
          if (index === this.state.editingIndex) {
            return values
          }
          return item
        }), // 使用本地数据或后端返回数据
        editingIndex: -1
      })
      this.syncData(true)
    })
  }
  delete(index) {
    this.cancel()

    this.setState({
      editingIndex: -1,
      tableData: this.state.tableData.filter((_, i) => index != i)
    }, ()=>this.syncData())
  }
  cancel() {
    this.props.form.resetFields()
    this.setState({
      editingIndex: -1
    }) 
  }
  edit(index) {
    this.cancel()
    this.setState({
      editingIndex: index
    },()=>{this.props.form.setFieldsValue({
      ...this.state.tableData[index]
    })})
  }
  componentDidUpdate(preProps, preState) {
    if (this.state.editingIndex !== -1 && preState.editingIndex === -1) {
      const fields = {}
      const keys = Object.keys(this.state.tableData[this.state.editingIndex])
      keys.forEach(key => {
        fields[key] = {
          value: ''
        }
      })

      this.props.form.setFields(fields)
    }
  }
  add() {
    this.cancel()
    const len = this.state.tableData.length
    
    this.setState({
      editingIndex: len,
      tableData: [
        ...this.state.tableData,
        {
          no: len,
          time: moment(Date.now())
        }
      ]
    }, ()=>{
      this.syncData()
      this.props.form.setFieldsValue({
        ...this.state.tableData[len]
      })
    })
  }
  fetchData(id) {
    this.setState({
      loading: true
    })
    var reqParams = {
      order_code: id || this.props.id
    }
    axios.post(api.order.getLogistics, reqParams).then(res => {
      if (res.data && res.data.code === 200) {
        const tableData = res.data.list.map((item, index) => {
          item.no = index 
          item.time = moment(item.time)
          return item
        })
        this.setState({
          tableData,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }

  componentWillReceiveProps(newProps) {
    if (this.props.id !== newProps.id) {
      this.fetchData(newProps.id)
      this.setState({
        editingIndex: -1
      })
      this.props.form.resetFields()
    }
  }
  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <div className="logistics">
        <Table
          loading={this.state.loading}
          rowKey="no"
          columns={this.tableColumns}
          dataSource={this.state.tableData}
          pagination={null}
          footer={()=><Button type="primary" block onClick={()=>this.add()}>添加</Button>}
        />
      </div>
    )
  }
}
export default Logistics
