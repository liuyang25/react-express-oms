import * as React from 'react'
import axios from '@/utils/axios'
import api from '@/api'
import { Table } from 'antd'
import './style.less'

class Orders extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      curPage: 1
    }
    this.tableColumns = [
      { dataIndex: 'id', title: '序号', width: 100, fixed: 'left' },
      { dataIndex: 'order_code', title: '货物编号', width: 100, fixed: 'left' },
      { dataIndex: 'good_name', title: '货物名称' },
      { dataIndex: 'custtttomer_id', title: '客户代码' },
      { dataIndex: 'good_num', title: '数量' },
      { dataIndex: 'good_weight', title: '重量' },
      { dataIndex: 'good_volume', title: '体积' },
      { dataIndex: 'good_volume_detail', title: '尺寸详情' },
      { dataIndex: 'good_type', title: '商品型号' },
      { dataIndex: 'good_attr', title: '商品属性' },
      { dataIndex: 'customs_code', title: '海关代码' },
      { dataIndex: 'declared_value', title: '申报价值' },
      { dataIndex: 'receiving_time', title: '收货日期  ' },
      { dataIndex: 'receiving_name', title: '收货方名称' },
      { dataIndex: 'receiving_address', title: '收货方地址' },
      { dataIndex: 'receiving_company', title: '收货方公司' },
      { dataIndex: 'receiving_comment', title: '收货方备注信息' },
      { dataIndex: 'carriage', title: '运费' },
      { dataIndex: 'additional_fee', title: '附加费' },
      { dataIndex: 'recieved_fee', title: '已收费用' },
      { dataIndex: 'concerted_pay_date', title: '协议付款日期' },
      { dataIndex: 'reparations', title: '赔款' },
      { dataIndex: 'logistics_company', title: '物流公司' },
      { dataIndex: 'logistics_orderid', title: '物流单号' },
      { dataIndex: 'logistics_cost', title: '物流成本' },
      { dataIndex: 'logistics_reparations', title: '物流赔款' },
      { dataIndex: 'comment', title: '备注' },
      { dataIndex: 'logistics_completed', title: '物流是否完结' },
      { dataIndex: 'order_closed', title: '订单是否关闭' },
      { dataIndex: 'creator', title: '创建人' },
      { dataIndex: 'create_time', title: '创建时间' },
      { dataIndex: 'update_time', title: '更新时间' }
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
    axios.post(api.order.list, reqParams).then(res => {
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
      <div class="orders">
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
export default Orders
