import * as React from 'react'
import axios from '@/utils/axios'
import api from '@/api'
import { Table, Button, Form, Input, Pagination, Modal } from 'antd'
import CustomerAdd from './add'
import CustomerEdit from './edit'
import './styles.less'
import Receviers from './receivers';

@Form.create()
class Customers extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      modalAdd: false,
      modalEdit: false,
      modalReceivers: false,
      searchParam: '',
      curPage: 1,
      total: 0,
      currentEditData: {}
    }
    this.tableColumns = [
      { key: 'no', title: '序号', render:(data, context, index) => {
        return (this.state.curPage-1)*10 + index+1
      }},
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
            <span>
              <Button onClick={() => this.handleCheckReceview(record.customer_id)}>
                查看收货方
              </Button>
              <Button type="primary" onClick={() => this.handleEditButton(record)}>
                编辑
              </Button>
            </span>
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
  handleCheckReceview(id) {
    this.setState({
      modalReceivers: true,
      customer_id: id
    })
  }
  handleAddOnSuccess() {
    this.setState({
      modalAdd: false
    })
    this.fetchData()
  }
  handleAddOnCancel() {
    this.setState({
      modalAdd: false
    })
  }
  handleEditButton(record) {
    this.setState({
      modalEdit: true,
      currentEditData: record
    })
  }
  handleEditSuccsess() {
    this.setState({
      modalEdit: false
    })
    this.fetchData()
  }
  handleEditOnCancel() {
    this.setState({
      modalEdit: false
    })
  }

  handleSearch = v => {
    this.setState({
      searchParam: v
    }, this.fetchData)
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
  componentWillReceiveProps(props) {}
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
            style={{ float: 'right', marginRight: '20px' }}
            onClick={() => {
              this.setState({
                modalAdd: true
              })
            }}
          >
            新增
          </Button>
        </div>
        <Table
          loading={this.state.loading}
          className="customers-table"
          columns={this.tableColumns}
          dataSource={this.state.tableData}
          rowKey="customer_id"
          pagination={false}
        />
        <Pagination
          style={{ textAlign: 'right' }}
          onChange={this.handleChangePage}
          total={this.state.total}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          current={this.state.curPage}
        />
        <Modal
          visible={this.state.modalAdd}
          width={800}
          footer={null}
          title="客户新增"
          maskClosable={false}
          onCancel={this.handleAddOnCancel.bind(this)}
        >
          <CustomerAdd
            onSuccess={this.handleAddOnSuccess.bind(this)}
            onCancel={this.handleAddOnCancel.bind(this)}
          />
        </Modal>
        <Modal
          visible={this.state.modalEdit}
          width={800}
          footer={null}
          title="客户信息编辑"
          onCancel={this.handleEditOnCancel.bind(this)}
        >
          <CustomerEdit
            // wrappedComponentRef={form => (this.editForm = form)}
            data={this.state.currentEditData}
            onSuccess={this.handleEditSuccsess.bind(this)}
            onCancel={this.handleEditOnCancel.bind(this)}
          />
        </Modal>
        <Modal
          visible={this.state.modalReceivers}
          width={1100}
          footer={null}
          title="收货方列表"
          maskClosable={false}
          onCancel={()=>this.setState({modalReceivers: false})}
        >
          <Receviers id={this.state.customer_id}/>
        </Modal>
      </div>
    )
  }
}
export default Customers
