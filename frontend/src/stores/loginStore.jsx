import { observable, autorun } from 'mobx';

export class LoginStore {
  @observable userName: string;

  constructor() {
    this.userName = sessionStorage.getItem('login.userName') || '';

    autorun(() => {
      sessionStorage.setItem('login.userName', this.userName);
    });
  }
}

export default new LoginStore();
