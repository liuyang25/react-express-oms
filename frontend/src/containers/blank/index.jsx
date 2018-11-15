import * as React from 'react';
import { blankIndex } from '@/router/pages';
import '../normalize.css';

export default class BlankLayout extends React.PureComponent {
  render() {
    return (
      <div>
        {blankIndex()}
      </div>
    );
  }
}