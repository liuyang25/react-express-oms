import * as React from 'react'
import axios from '@/utils/axios'
import api from '@/api'
import {
  Table,
  Modal,
  Button,
  Pagination,
  DatePicker,
  Input,
  Select
} from 'antd'
import OrderDetail from './detail'
import OrderAdd from './add'
import Logistics from '@/pages/logistics'
import { dateFormat } from '@/utils/common'
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
      modalAdd: false,
      modalLogistics: false,
      logisticsId: '',
      detailId: ''
    }
    this.data = {
      searchParams: {
        searchParam: '',
        selectLogisticsStatus: '',
        selectOrderStatus: '',
        orderDateStart: '',
        orderDateEnd: ''
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
      {
        key: 'id',
        title: '序号',
        fixed: 'left',
        render: (data, context, index) => {
          return (this.state.curPage - 1) * 10 + index + 1
        }
      },
      { dataIndex: 'order_code', title: '货物编号', width: 100, fixed: 'left' },
      { dataIndex: 'customer_id', title: '客户代码' },
      { dataIndex: 'customer_name', title: '客户名称' },
      { dataIndex: 'good_name', title: '货物名称' },
      { dataIndex: 'carriage', title: '运费' },
      { dataIndex: 'additional_fee', title: '附加费' },
      { dataIndex: 'recieved_fee', title: '已收费用' },
      { dataIndex: 'logistics_company', title: '物流公司' },
      { dataIndex: 'logistics_cost', title: '物流成本' },
      {
        key: 'receiving_time',
        title: '下单日期',
        className: 'minWidth',
        render: data =>
          data ? dateFormat(new Date(data.receiving_time), 'yyyy-MM-dd') : ''
      },
      {
        key: 'logistics_completed',
        title: '物流状态',
        render: data =>
          data ? ['途中', '已完成'][data.logistics_completed] || '' : ''
      },
      {
        // dataIndex: 'order_closed',
        key: 'order_closed',
        title: '订单状态',
        render: data =>
          data ? ['进行中', '已结束'][data.order_closed] || '' : ''
      },
      {
        key: 'operator',
        title: '操作',
        className: 'min-width',
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
                onClick={() => this.handleLogisticsButton(data)}
                type="primary"
                shape="circle"
                icon="car"
                title="物流信息"
              />
              <Button
                onClick={() => this.handleDeleteButton(data)}
                type="primary"
                shape="circle"
                icon="delete"
                title="删除"
              />
            </span>
          )
        }
      }
    ].map(item => {
      return { className: 'table-column', ...item }
    })
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
        tableData: res.data.list,
        loading: false
      })
    })
  }
  handleSearch(v) {
    this.data.searchParams.searchParam = v
    this.fetchData()
  }
  handleChangePage = p => {
    this.setState({
      curPage: p
    })
    this.fetchData()
  }
  handleOrderDateRange(date, dateString) {
    this.data.searchParams.orderDateStart = dateString[0]
    this.data.searchParams.orderDateEnd = dateString[1]
    this.fetchData()
  }
  handleDetailButton(data) {
    this.setState({
      modalDetail: true,
      detailId: data.order_code
    })
  }
  handleAddButton() {
    this.setState({
      modalAdd: true
    })
  }
  handleDetailOnSuccess() {
    this.setState({
      modalDetail: false
    })
  }
  handleDetailOnClose() {
    this.setState({
      modalDetail: false
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
  handleLogisticsButton(data) {
    this.setState({
      modalLogistics: true,
      logisticsId: data.order_code
    })
  }
  handleLogisticsOnClose() {
    this.setState({
      modalLogistics: false
    })
  }
  handleDeleteButton(data) {
    Modal.confirm({
      title: '确认删除？',
      onOk: () => {
        const reqParams = {
          order_code: data.order_code
        }
        axios.post(api.order.delete, reqParams).then(res => {
          if (res.data && res.data.code === 200) {
            this.fetchData()
          }
        })
      }
    })
  }

  componentDidMount() {
    this.fetchData()
  }
  render() {
    return (
      <div className="orders">
        <div className="search">
          <Input.Search
            placeholder="模糊搜索"
            onSearch={this.handleSearch.bind(this)}
            defaultValue={this.data.searchParams.searchParam}
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
          <DatePicker.RangePicker
            onChange={this.handleOrderDateRange.bind(this)}
          />
          <Button
            onClick={() => this.handleAddButton()}
            type="primary"
            style={{ float: 'right', marginRight: '20px' }}
          >
            新增
          </Button>
        </div>
        <Table
          loading={this.state.loading}
          className="orders-table"
          columns={this.tableColumns}
          dataSource={this.state.tableData}
          scroll={{ x: true }}
          rowKey="order_code"
          pagination={false}
        />
        <Pagination
          style={{ textAlign: 'right' }}
          onChange={this.handleChangePage}
          total={this.state.total}
          current={this.state.curPage}
        />
        <Modal
          visible={this.state.modalDetail}
          width={1100}
          footer={null}
          title="订单详情"
          maskClosable={false}
          onCancel={this.handleDetailOnClose.bind(this)}
        >
          <OrderDetail
            id={this.state.detailId}
            onClose={this.handleDetailOnClose.bind(this)}
          />
        </Modal>
        <Modal
          visible={this.state.modalAdd}
          width={1100}
          footer={null}
          title="订单新增"
          maskClosable={false}
          onCancel={this.handleAddOnCancel.bind(this)}
        >
          <OrderAdd
            onSuccess={this.handleAddOnSuccess.bind(this)}
            onClose={this.handleAddOnCancel.bind(this)}
          />
        </Modal>
        <Modal
          visible={this.state.modalLogistics}
          width={1000}
          footer={null}
          title="物流信息"
          maskClosable={true}
          onCancel={this.handleLogisticsOnClose.bind(this)}
        >
          <Logistics id={this.state.logisticsId} />
        </Modal>
      </div>
    )
  }
}
export default Orders
