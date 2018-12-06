import * as React from 'react'
import { mainPages, mainIndex } from '@/router/pages'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Layout, Breadcrumb, Card, Menu, Icon /*Input*/ } from 'antd'
import LoginInfo from '@/components/loginInfo'
import { LoginStore } from '@/stores/loginStore'
import './styles.less'
import Proverbs from '@/components/proverbs'

interface Props {
  loginStore: LoginStore;
}

const logo = require('@/assets/images/zjp.jpg')
const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

@inject('loginStore')
@observer
class Main extends React.Component<Props> {
  state = {
    collapsed: true,
    userNameInput: '',
    proverbIndex: 0
  }
  userNameInputNode: any
  onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }
  // 侧边列表
  renderMenu(page) {
    if (page.permission) {
      const role = this.props.loginStore.role
      if (role !== 0){
        return null
      }
    }
    if (!page.pages) {
      return (
        <Menu.Item key={page.path}>
          <Link to={page.path} className="menu-text">
            {page.icon && <Icon type={page.icon} />}
            <span className="menu-text">{page.name}</span>
          </Link>
        </Menu.Item>
      )
    } else {
      return (
        <SubMenu
          key={page.name}
          title={
            <span>
              {page.icon && <Icon type={page.icon} />}
              <span className="menu-text">{page.name}</span>
            </span>
          }
          icon={page.icon}
        >
          {page.pages.map(this.renderMenu)}
        </SubMenu>
      )
    }
  }

  renderBreadcrumb() {
    const path = this.props.location.pathname
    const breadcrumbs = []
    const findPath = route => {
      if (!route) {
        return breadcrumbs
      }
      for (let i = 0; i < route.length; ++i) {
        if (path.indexOf(route[i].path) > -1) {
          breadcrumbs.push(
            <Breadcrumb.Item key={route[i].path}>
              {route[i].icon && <Icon type={route[i].icon} />}
              {route[i].name}
            </Breadcrumb.Item>
          )
          findPath(route[i].pages)
          return breadcrumbs
        }
      }
    }
    return (
      <Card style={{ textAlign: 'left' }} bodyStyle={{ padding: '8px 20px' }}>
        <Breadcrumb>{findPath(mainPages)}</Breadcrumb>
      </Card>
    )
    // return <Card style={{textAlign:'left'}}>{findPath(mainPages)}</Card>
    /*<Breadcrumb>
      <Breadcrumb.Item href="">
        <Icon type="home" />
      </Breadcrumb.Item>
      */
  }

  render() {
    const menus = mainPages.map(this.renderMenu.bind(this))

    // 输入名字框
    const jumpLogin = () => {
      this.props.history.push('/login')
    }
    /*  const renderLogin = () => {
      const suffix = this.state.userNameInput 
        ? <Icon
            type="close-circle"
            onClick={() => {
              this.setState({ userNameInput : '' });
              this.userNameInputNode.focus();
            }}
        />
        : null;
      return (
        <div style={{ paddingTop: '10vh' }}>
          <Input
            placeholder="Enter your username"
            className="user-input"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            suffix={suffix}
            value={this.state.userNameInput}
            onChange={e => { this.setState({ userNameInput: e.target.value }); }}
            onPressEnter={() => { this.props.loginStore.userName = this.state.userNameInput; }}
            ref={node => this.userNameInputNode = node}
          />
        </div>
      );
    };
    */

    return (
      <Layout className="main" style={{ height: '100%' }}>
        <Sider collapsed={this.state.collapsed}>
          <div className="logo">
            <Link to="/home">
              <img src={logo} className="logo" alt="logo" />
            </Link>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            style={{ textAlign: 'left' }}
            inlineCollapsed={this.state.collapsed}
          >
            {menus}
          </Menu>
          <div className="menu-button" onClick={() => this.onCollapse()}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </div>
        </Sider>
        <div className="main-box">
          <Layout className="main-layout">
            <Header className="header">
              <Proverbs />
              <LoginInfo {...this.props} />
            </Header>
            <Content className="content">
              {this.renderBreadcrumb()}
              <Card>
                {/*mainIndex()*/}
                {this.props.loginStore.userName ? mainIndex() : jumpLogin()}
              </Card>
              <Footer style={{ textAlign: 'center' }} className="footer">
                mail:liuyang25@126.com
              </Footer>
            </Content>
          </Layout>
        </div>
      </Layout>
    )
  }
}
export default Main
