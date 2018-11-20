import * as React from 'react'
import { Row, Col } from 'antd';
import './style.less'

interface Props {
  data: {} 
}
class OrderDetail extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
    this.state = {}
    this.displayRows = [
      { dataIndex: 'order_code', title: '货物编号'},
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
  componentDidMount() {}
  render() {
    const rows = [];
    const l = this.displayRows.length
    for (let i = 0; i < Math.floor(this.displayRows.length / 3); i++){
      const i3 = 3 * i
      rows.push(<Row type="flex" justify="center" key={i}>
          <Col span={2}>{this.displayRows[i3].title}</Col>
          <Col span={4}>
            {this.props.data[this.displayRows[i3].dataIndex]}
          </Col>
          {i3 + 1 < l && <Col span={2}>
              {this.displayRows[i3 + 1].title}
            </Col>}
          {i3 + 1 < l && <Col span={4}>
              {this.props.data[this.displayRows[i3 + 1].dataIndex]}
            </Col>}
          {i3 + 2 < l && <Col span={2}>
              {this.displayRows[3 * i + 2].title}
            </Col>}
          {i3 + 2 < l && <Col span={4}>
              {this.props.data[this.displayRows[i3 + 2].dataIndex]}
            </Col>}
        </Row>)
    }
    return (
      <div className="order-detail">
        {rows}
      </div>
    )
  }
}
export default OrderDetail
