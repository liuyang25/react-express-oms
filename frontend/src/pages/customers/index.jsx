import * as React from 'react'
import axios from '@/utils/axios'
import api from '@/api'
import { Table, Button } from 'antd'

class Customers extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.tableColumns = [
      { dataIndex: 'customer_id', title: '客户代码' },
      { dataIndex: 'componey_name', title: '公司名称' },
      { dataIndex: 'address', title: '地址' },
      { dataIndex: 'principal', title: '负责人' },
      { dataIndex: 'contact', title: '联系方式' },
      { dataIndex: 'main_business', title: '主要营业方向' },
      { dataIndex: 'comment', title: '备注' },
      {
        key: 'operate',
        title: '操作',
        render: (text, record, index) => {
          return <Button>呵呵</Button>
        }
      }
    ]
  }
  fetchData() {
    this.setState({
      loading: true
    })
    var reqParams = {
      // other params
      // cur_page: this.state.curPage
    }
    axios.post(api.customer.list, reqParams).then(res => {
      this.setState({
        tableData: res.data.resultList,
        loading: false
      })
    })
  }
  componentDidMount() {
    this.fetchData()
  }
  render() {
    return (
      <div className="users">
        <Table
          loading={this.state.loading}
          className="table"
          columns={this.tableColumns}
          dataSource={this.state.tableData}
        />
      </div>
    )
  }
}
export default Customers
