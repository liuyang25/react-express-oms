import * as React from 'react'
import axios from '@/utils/axios'
import api from '@/api'
import { Table, Modal, Button, Pagination, DatePicker, Input, Select } from 'antd'
import OrderDetail from './detail'
import './styles.less'

const Option = Select.Option

class Orders extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      curPage: 1,
      total: 0,
      modalDetail: false,
      detailData: {}
    }
    this.data = {
      searchParams: {
        searchParam: '',
        selectLogisticsStatus: '',
        selectOrderStatus: '',
        orderDateStart: '',
        orderDateEnd: '',
      }
    }
    this.searchSelectColumns = [
      {
        title: '物流状态',
        options: [
          { value: '', label: '全部' },
          { value: 0, label: '途中' },
          { value: 1, label: '已到达' }
        ],
        handle: v => {
          this.data.searchParams.selectLogisticsStatus = v
          this.fetchData()
        }
      },
      {
        title: '订单状态',
        options: [
          { value: '', label: '全部' },
          { value: 0, label: '进行中' },
          { value: 1, label: '已结束' }
        ],
        handle: v => {
          this.data.searchParams.selectOrderStatus = v
          this.fetchData()
        }
      }
    ]
    /*货物编号 客户代码 客户名称 货物名称 运费 附加费 已收费用 物流成本 物流公司 下单日期 物流状态 订单状态*/
    this.tableColumns = [
      { dataIndex: 'order_code', title: '货物编号', width: 100, fixed: 'left' },
      { dataIndex: 'custtttomer_id', title: '客户代码' },
      { dataIndex: 'good_name', title: '货物名称' },
      { dataIndex: 'carriage', title: '运费' },
      { dataIndex: 'additional_fee', title: '附加费' },
      { dataIndex: 'recieved_fee', title: '已收费用' },
      { dataIndex: 'logistics_company', title: '物流公司' },
      { dataIndex: 'logistics_cost', title: '物流成本' },
      { dataIndex: 'logistics_completed', title: '物流是否完结' },
      { dataIndex: 'order_closed', title: '订单是否关闭' },
      {
        key: 'operator',
        title: '操作',
        render: data => {
          return (
            <span className="operators">
              <Button
                onClick={() => this.handleDetailButton(data)}
                type="primary"
                shape="circle"
                icon="ellipsis"
                title="订单详情"
              />
              <Button
                onClick={() => this.handleLogisticsButton()}
                type="primary"
                shape="circle"
                icon="car"
                title="物流信息"
              />
              <Button
                onClick={() => this.handleDeleteButton()}
                type="primary"
                shape="circle"
                icon="delete"
                title="删除"
              />
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
      cur_page: this.state.curPage,
      ...this.data.searchParams
    }
    axios.post(api.order.list, reqParams).then(res => {
      this.setState({
        tableData: res.data.resultList,
        loading: false
      })
    })
  }
  handleSearch(v) {
    this.fetchData()
  }
  handleChangePage = p => {
    this.setState({
      curPage: p
    })
    this.fetchData()
  }
  handleOrderDateRange(date, dateString) {
    this.date.searchParams.orderDateStart = dateString[0]
    this.date.searchParams.orderDateEnd = dateString[1]
    this.fetchData()
  }
  handleDetailButton(data) {
    this.setState({
      modalDetail: true,
      detailData: data
    })
  }
  handleLogisticsButton() {}
  handleDeleteButton() {}

  componentDidMount() {
    this.fetchData()
  }
  render() {
    return (
      <div className="orders">
        <div className="search">
          <Input.Search
            placeholder="模糊搜索"
            onSearch={this.handleSearch}
            defaultValue={this.state.searchParam}
            style={{ width: 200 }}
          />
          {this.searchSelectColumns.map(item => {
            return (
              <div style={{ display: 'inline-block' }} key={item.title}>
                <label>{item.title}</label>
                <Select style={{ width: 120 }} onChange={item.handle}>
                  {item.options.map(op => {
                    return (
                      <Option key={op.value} value={op.value}>
                        {op.label}
                      </Option>
                    )
                  })}
                </Select>
              </div>
            )
          })}
          <label>下单日期</label>
          <DatePicker.RangePicker onChange={this.handleOrderDateRange}/>
        </div>
        <Table
          loading={this.state.loading}
          className="table"
          columns={this.tableColumns}
          dataSource={this.state.tableData}
          scroll={{ x: true }}
          rowKey="order_code"
          pagination={false}
        />
        <Pagination style={{textAlign: 'right'}} onChange={this.handleChangePage} total={this.state.total} current={this.state.curPage}/>
        <Modal visible={this.state.modalDetail} width="90vw">
          <OrderDetail data={this.state.detailData} />
        </Modal>
      </div>
    )
  }
}
export default Orders
