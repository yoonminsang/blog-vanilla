// import { Component } from 'ms-vanilla';
import axios from 'axios';
import Component from '../../../lib/component';
import userStore from '../../../store/user-store';
import './style.css';
import { logoutApi } from '../../../utils/api/auth';

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
      ${user ? '<button class="logout">로그아웃</button>' : '<a href="/login">로그인</a>'}
    </header>
    `;
  }

  componentDidMount() {
    userStore.subscribe(() => this.setState({ user: userStore.state.user }));
  }

  setEvent() {
    this.addEvent('click', '.logout', () => {
      this.logout();
    });
  }

  async logout() {
    try {
      await logoutApi();
      localStorage.removeItem('user');
      userStore.logout();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { errorMessage } = err.response?.data;
        if (errorMessage) {
          this.setState({ errorMessage });
        } else {
          console.log(err);
        }
      } else {
        console.log('내부 에러');
      }
    }
  }
}

export default Header;
