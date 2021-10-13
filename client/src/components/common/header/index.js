// import { Component } from 'ms-vanilla';
import Component from '../../lib/component';
import userStore from '../../../store/user-store';
import './style.css';

class Header extends Component {
  setup() {
    this.state = { user: undefined };
  }

  markup() {
    const { user } = this.state;
    return /* html */ `
    <header class="header">
      <div class="empty">empty</div>
      <h1>
        <a href="/">M's blog</a>
      </h1>
      ${user ? '<button>로그아웃</button>' : '<a href="/login">로그인</a>'}
    </header>
    `;
  }

  componentDidMount() {
    userStore.subscribe(() => this.setState({ user: userStore.state.user }));
  }
}

export default Header;
