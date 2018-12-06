import * as React from 'react'
import axios from '@/utils/axios'
import api from '@/api'
import { inject, observer } from 'mobx-react'
import { message, Table, Button, Form, Input, Modal } from 'antd'
import './styles.less'

const FormItem = Form.Item

@Form.create()
@inject('loginStore')
@observer
class Users extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      modalAdd: false,
      modalEdit: false,
      tableData: []
    }
    this.tableColumns = [
      { dataIndex: 'account', title: '账号名' },
      { dataIndex: 'user_name', title: '昵称' },
      { dataIndex: 'create_time', title: '添加日期' },
      { dataIndex: 'password', title: '密码' },
      { dataIndex: 'role', title: '权限' },
      {
        key: 'operate',
        title: '操作',
        render: (text, record, index) => {
          const { account } = this.props.loginStore
          return (
            <span className="btns">
              <Button type="primary" onClick={() => this.handleEdit(record)}>
                编辑
              </Button>
              {account !== record.user_name && (
                <Button type="danger" onClick={() => this.handleDelete(record)}>
                  删除
                </Button>
              )}
            </span>
          )
        }
      }
    ]
    this.formRows = [
      {
        key: 'account',
        label: '账号名',
        rules: [
          {
            required: true,
            message: '请输入账号名!'
          }
        ]
      },
      {
        key: 'user_name',
        label: '昵称',
        rules: [
          {
            required: true,
            message: '请输入昵称!'
          }
        ]
      },
      {
        key: 'password',
        label: '密码',
        rules: [
          {
            required: true,
            message: '请输入密码!'
          },
          {
            validator: this.validateToNextPassword
          }
        ],
        options: {
          type: 'password'
        }
      },
      {
        key: 'confirm',
        label: '确认密码',
        rules: [
          {
            required: true,
            message: '请确认密码!'
          },
          {
            validator: this.compareToFirstPassword
          }
        ],
        options: {
          type: 'password'
        }
      }
    ]
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不相同!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
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
  handleModalOk() {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        message.error(err)
        return
      }
      let confirm_api = api.user.add
      if (this.state.modalEdit) {
        confirm_api = api.user.update
      }
      axios.post(confirm_api, values).then(res => {
        if (res.data.code === 200) {
          this.setState(
            {
              modalAdd: false,
              modalEdit: false
            },
            () => {
              message.info('操作成功')
              this.fetchData()
            }
          )
        } else {
          message.error(res.data.msg)
        }
      })
    })
  }
  handleModalCancel() {
    this.setState({
      modalAdd: false,
      modalEdit: false
    })
  }
  handleAdd() {
    this.setState(
      {
        modalAdd: true
      },
      () => this.props.form.resetFields()
    )
  }
  handleEdit(record) {
    this.setState(
      {
        modalEdit: true
      },
      this.props.form.setFieldsValue({
        account: record.account,
        user_name: record.user_name
      })
    )
  }
  handleDelete(record) {
    Modal.confirm({
      title: '确认删除?',
      onOk: () => {
        axios.post(api.user.delete, { account: record.account }).then(res => {
          if (res.data && res.data.code === 200) {
            message.info('删除成功')
            this.fetchData()
          } else {
            message.error(res.data.msg)
          }
        })
      }
    })
  }
  componentDidMount() {
    this.fetchData()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { account } = this.props.loginStore
    const userName = this.props.form.getFieldValue('account')
    return (
      <div className="users">
        <div className="tabbar">
          <Button type="primary" onClick={() => this.handleAdd()}>
            新增
          </Button>
        </div>
        <Table
          loading={this.state.loading}
          className="table"
          rowClassName={(record, index) => {
            return record.user_name === account ? 'highlight-row' : ''
          }}
          bordered
          columns={this.tableColumns}
          dataSource={this.state.tableData}
          pagination={null}
        />
        <Modal
          visible={this.state.modalAdd || this.state.modalEdit}
          title={this.state.modalAdd ? '添加用户' : '编辑用户'}
          maskClosable={false}
          onCancel={this.handleModalCancel.bind(this)}
          onOk={this.handleModalOk.bind(this)}
        >
          <Form>
            {this.formRows.map(item => (
              <FormItem
                labelCol={{ offset: 1, span: 6 }}
                wrapperCol={{ span: 11 }}
                label={item.label}
                key={item.key}
              >
                {getFieldDecorator(item.key, { rules: item.rules })(
                  <Input
                    disabled={item.key === 'account' && account === userName}
                    {...item.options}
                  />
                )}
              </FormItem>
            ))}
          </Form>
        </Modal>
      </div>
    )
  }
}
export default Users
