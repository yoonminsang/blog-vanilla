import { Component } from 'ms-vanilla';
import Auth from '../components/auth';
import Header from '../components/common/header';
import './login-page.css';

class LoginPage extends Component {
  setup() {
    this.state = { user: undefined };
  }

  markup() {
    return /* html */ `
      <inside class="header"></inside>
      <main class="login"></main>
    `;
  }

  appendComponent(target) {
    const $header = target.querySelector('.header');
    const $login = target.querySelector('.login');
    new Header($header, { user: this.state.user });
    new Auth($login, { login: true });
  }
}

export default LoginPage;
