import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Home from '@/pages/home'
import Users from '@/pages/users'
import Page404 from '@/pages/404'
import OrderList from '@/pages/orders'
import Customers from '@/pages/customers'
import CustomerAdd from '@/pages/customer_add'
import Logistics from '@/pages/logistics'
import LogisticsAdd from '@/pages/logistics_add'

export const mainPages: Page[] = [
  {
    component: Home,
    name: '首页',
    path: '/home',
    icon: 'home'
  },
  {
    component: Users,
    name: '用户',
    path: '/users',
    icon: 'user'
  },
  {
    name: '物流',
    icon: 'car',
    path: '/logistics',
    pages: [
      {
        component: Logistics,
        name: '物流列表',
        path: '/logistics/list'
      },
      {
        component: LogisticsAdd,
        name: '物流新增',
        path: '/logistics/add'
      }
    ]
  },
  {
    name: '客户',
    icon: 'smile',
    path: '/customer',
    pages: [
      {
        component: Customers,
        name: '客户列表',
        path: '/customer/list'
      },
      {
        component: CustomerAdd,
        name: '客户新增',
        path: '/customer/add'
      }
    ]
  },
  {
    name: '订单',
    icon: 'file-text',
    path: '/order',
    pages: [
      {
        component: OrderList,
        name: '订单列表',
        path: '/order/list'
      }
    ]
  }
  /*{
    name: 'submenuDemo',
    icon: 'team',
    pages: [
      {
        component: Demo1,
        name: 'subDemo1',
        path: '/demo1',
      },
      {
        component: Demo2,
        name: 'subDemo2',
        path: '/demo2',
        icon: 'desktop',
      },
    ]
  },*/
]

export const blankPages = [
  {
    component: Page404,
    name: '404',
    path: '/404'
  }
]

function renderPages(pages: Page[], defaultPage?: string) {
  const pagesNode = [] //Array<JSX.Element>(); tsx语法
  const renderPage = page => {
    if (!page.pages) {
      pagesNode.push(
        <Route
          key={page.path}
          exact={page.exact}
          path={page.path}
          component={page.component}
        />
      )
    } else {
      page.pages.forEach(renderPage)
    }
  }
  pages.forEach(renderPage)

  return (
    <Switch>
      {pagesNode}
      {defaultPage && <Redirect to={defaultPage} />}
    </Switch>
  )
}
export function mainIndex() {
  return renderPages(mainPages, '/home')
}

export function blankIndex() {
  return renderPages(blankPages, '/404')
}
