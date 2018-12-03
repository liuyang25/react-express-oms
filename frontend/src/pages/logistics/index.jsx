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
        fixed: 'left',
        render: (text, record, index) => index + 1
      },
      { dataIndex: 'time', title: '日期', width: 250, fixed: 'left',
        render: (text, record, index) => {
          return this.state.editingIndex === index
            ? this.props.form.getFieldDecorator('time')(<DatePicker />)
            : moment(record.time).format('YYYY-MM-DD hh:mm:ss')
        }
      },
      {
        dataIndex: 'information',
        title: '信息描述',
        render: (text, record, index) => {
          return this.state.editingIndex === index
            ? this.props.form.getFieldDecorator('information')(<Input />)
            : record.information
        }
      },
      { dataIndex: 'information_en', title: '英文信息',
        render: (text, record, index) => {
          return this.state.editingIndex === index
            ? this.props.form.getFieldDecorator('information_en')(<Input />)
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
              <Button onClick={() => this.save(index)}>保存</Button>
              <Button onClick={() => this.cancel()}>取消</Button>
            </span>
          ) : (
            <span>
              <Button onClick={() => this.edit(index)}>编辑</Button>
            </span>
          )
        }
      }
    ]
  }
  save(index) {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.error(err)
        return
      }
      const tableData = JSON.parse(JSON.stringify(this.state.tableData))
      tableData[this.state.editingIndex] = values
      const params = {
        tableData
      }
      axios.post(api.order.updateLogistics, params).then(res => {
        if (res.data && res.data.code === 200) {
          message.info('保存成功')
          this.setState({
            tableData, // 使用本地数据或后端返回数据
            editingIndex: -1
          })
        } else {
          message.error(res.data.msg)
        }
      }) 
    })
  }
  cancel() {
    this.props.form.resetFields()
    this.setState({
      editingIndex: -1
    })
  }
  edit(index) {
    this.setState({
      editingIndex: index
    })
  }
  componentDidUpdate(preProps, preState) {
    if (this.state.editingIndex !== -1 && preState.editingIndex === -1) {
      this.props.form.setFieldsValue({
        ...this.state.tableData[this.state.editingIndex]
      })
    }
  }
  add() {
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
    })
  }
  fetchData(id) {
    this.setState({
      loading: true
    })
    var reqParams = {
      order_code: id || this.props.id
    }
    axios.post(api.logistics.list, reqParams).then(res => {
      if (res.data && res.data.code === 200) {
        const tableData = res.data.resultList.map((item, index) => {
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
          className="table"
          rowKey="no"
          columns={this.tableColumns}
          dataSource={this.state.tableData}
          scroll={{ x: true }}
          footer={()=><Button type="primary" block onClick={()=>this.add()}>添加</Button>}
        />
      </div>
    )
  }
}
export default Logistics
