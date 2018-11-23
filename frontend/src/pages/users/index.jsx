import * as React from 'react'
import axios from '@/utils/axios'
import api from '@/api'
import { Table, Button } from 'antd'

class Users extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.tableColumns = [
      { dataIndex: 'user_name', title: '用户名' },
      { dataIndex: 'create_time', title: '添加日期' },
      { dataIndex: 'role', title: '权限' },
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
    axios.post(api.user.list, reqParams).then(res => {
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
          bordered
          columns={this.tableColumns}
          dataSource={this.state.tableData}
        />
      </div>
    )
  }
}
export default Users
