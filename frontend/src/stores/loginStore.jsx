import { observable, autorun } from 'mobx';

export class LoginStore {
  @observable userName: string;
  @observable account: string;
  @observable role: string;

  constructor() {
    this.userName = sessionStorage.getItem('login.userName') || '';
    this.account = sessionStorage.getItem('login.account') || '';
    this.role = sessionStorage.getItem('login.role') || '';

    autorun(() => {
      sessionStorage.setItem('login.userName', this.userName);
      sessionStorage.setItem('login.account', this.account);
      sessionStorage.setItem('login.role', this.role);
    });
  }
}

export default new LoginStore();
