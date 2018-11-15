import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Page404 extends React.PureComponent {
  render() {
    return (
      <div className="exception">
        <div className="imgBlock">
          <div
            className="imgEle"
          />
        </div>
        <div className="content">
          <h1>{404}</h1>
          <div className="desc">{'抱歉，你访问的页面不存在'}</div>
          <div className="actions">
            {
              React.createElement(
                Link,
                {
                  to: '/',
                  href: '/',
                },
                <button>返回首页</button>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}
