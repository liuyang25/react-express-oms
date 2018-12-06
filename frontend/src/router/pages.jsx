import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Home from '@/pages/home'
import Users from '@/pages/users'
import Page404 from '@/pages/404'
import OrderList from '@/pages/orders'
import Customers from '@/pages/customers'

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
    icon: 'user',
    permission: 'role',
  },
  {
    name: '客户',
    icon: 'smile',
    path: '/customer',
    component: Customers,
  },
  {
    name: '订单',
    icon: 'file-text',
    path: '/order',
    component: OrderList,
  },
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
