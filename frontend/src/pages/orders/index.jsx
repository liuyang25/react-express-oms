import * as React from 'react'
import axios from '@/utils/axios'
import api from '@/api'
import { Table, Modal, Button } from 'antd'
import OrderDetail from './detail'
import './style.less'

class Orders extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      curPage: 1,
      modalDetail: false,
      detailData: {}
    }
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
      { key: 'operator', title: '操作', render: (data)=>{
        return <span className="operators">
            <Button onClick={() => this.handleDetailButton(data)} type="primary" shape="circle" icon="ellipsis" title="订单详情" />
            <Button onClick={() => this.handleLogisticsButton()} type="primary" shape="circle" icon="car" title="物流信息" />
            <Button onClick={() => this.handleDeleteButton()} type="primary" shape="circle" icon="delete" title="删除" />
          </span>
      }}
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
  handleDetailButton(data){
    this.setState({
      modalDetail: true,
      detailData: data
    })
  }
  handleLogisticsButton(){

  }
  handleDeleteButton() {

  }

  componentDidMount() {
    this.fetchData()
  }
  render() {
    return (
      <div className="orders">
        <Table
          loading={this.state.loading}
          className="table"
          columns={this.tableColumns}
          dataSource={this.state.tableData}
          scroll={{ x: true }}
          rowKey="order_code"
        />
        <Modal visible={this.state.modalDetail}
          width="90vw">
          <OrderDetail data={this.state.detailData}/>
        </Modal>
      </div>
    )
  }
}
export default Orders
