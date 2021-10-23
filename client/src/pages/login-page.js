// import { Component } from 'ms-vanilla';
import Component from '../lib/component';
import Auth from '../components/auth';
import Header from '../components/common/header';

class LoginPage extends Component {
  setup() {
    this.state = { user: undefined };
  }

  markup() {
    return /* html */ `
    <div class="wrapper">
      <inside class="header-inside"></inside>
      <inside class="login-inside"></inside>
    </div>
    `;
  }

  appendComponent(target) {
    const $header = target.querySelector('.header-inside');
    const $login = target.querySelector('.login-inside');
    new Header($header);
    new Auth($login, { login: true });
  }
}

export default LoginPage;
