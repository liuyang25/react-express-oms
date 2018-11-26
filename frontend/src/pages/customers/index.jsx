import * as React from 'react'
import axios from '@/utils/axios'
import api from '@/api'
import { Table, Button, Form, Input, Pagination } from 'antd'
import './styles.less'

@Form.create()
class Customers extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      searchParam: '',
      curPage: 1,
      total: 0
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
          return (
            <Button onClick={()=>this.handleDetail()}>详情</Button>
          )
        }
      }
    ]
  }
  fetchData() {
    this.setState({
      loading: true
    })
    var reqParams = {
      search_param: this.state.searchParam,
      cur_page: this.state.curPage
    }
    axios.post(api.customer.list, reqParams).then(res => {
      if (res.data && res.data.code == 200) {
        this.setState({
          tableData: res.data.list,
          loading: false,
          // curPage: res.data.cur_page,
          total: res.data.total
        })
      }
    })
  }
  handleDetail(){
    this.props.history.push('/customr/detail')
  }
  handleSearch = v => {
    this.setState({
      searchParam: v
    })
    this.fetchData()
  }
  handleChangePage = p => {
    this.setState({
      curPage: p
    })
    this.fetchData()
  }
  componentDidMount() {
    this.fetchData()
  }
  render() {
    return (
      <div className="customers">
        <div className="search">
          <Input.Search
            placeholder="输入需要搜索的关键字"
            onSearch={value => this.handleSearch(value)}
            defaultValue={this.state.searchParam}
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            style={{ float: 'right' }}
            onClick={() => {
              this.props.history.push('/customer/add')
            }}
          >
            新增
          </Button>
        </div>
        <Table
          loading={this.state.loading}
          className="table"
          columns={this.tableColumns}
          dataSource={this.state.tableData}
          pagination={false}
        />
        <Pagination
          style={{ textAlign: 'right' }}
          onChange={this.handleChangePage}
          total={this.state.total}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          current={this.state.curPage}
        />
      </div>
    )
  }
}
export default Customers
