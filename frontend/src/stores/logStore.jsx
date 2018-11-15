import { observable, action, computed } from 'mobx';

export class LogStore {
  @observable logs: string[];

  constructor() {
    this.logs = [];
  }
  // 监视的
  @computed 
  get log() {
    if (this.logs && this.logs.length > 0) {
      return this.logs[this.logs.length - 1];
    } else {
      return '';
    }
  }
  set log(data: string) {
    this.logs.push(data);
  }

  // 获取最新的log
  lastLogs(count: number) {
    const res: string[] = [];
    for (let i = this.logs.length; i >= 0 && i >= this.logs.length - count; i -= 1) {
      res.push(this.logs[i]);
    }
    return res;
  }

  @action.bound
  clear() {
    this.logs = [];
  }
}

export default new LogStore();
