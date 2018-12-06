import * as React from 'react'
import * as ReactDOM from 'react-dom'
import createRouter from './router/router'
import { Provider } from 'mobx-react'
// 国际化
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'

import stores from './stores'
import * as serviceWorker from './serviceWorker'
import './index.less'
import './common.less'

ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <Provider {...stores}>{createRouter()}</Provider>
  </LocaleProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
