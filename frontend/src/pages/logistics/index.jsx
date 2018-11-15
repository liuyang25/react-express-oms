import * as React from 'react'
import axios from '@/utils/axios'
import api from '@/api'
import { Table } from 'antd'

class Logistics extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      curPage: 1
    }
    this.tableColumns = [
      { dataIndex: 'goods_code', title: '商品代码', width: 100, fixed: 'left', },
      { dataIndex: 'time', title: '时间', width: 100, fixed: 'left' },
      { dataIndex: 'infomation', title: '信息描述' },
      { dataIndex: 'comment', title: '备注' },
      { dataIndex: 'creator', title: '创建人' }
    ]
  }
  fetchData() {
    this.setState({
      loading: true
    })
    var reqParams = {
      // other params
      cur_page: this.state.curPage
    }
    axios.post(api.logistics.list, reqParams).then(res => {
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
      <div class="logistics">
        <Table
          loading={this.state.loading}
          className="table"
          columns={this.tableColumns}
          dataSource={this.state.tableData}
          scroll={{ x: true }}
        />
      </div>
    )
  }
}
export default Logistics
