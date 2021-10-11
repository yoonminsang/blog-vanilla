import { Component } from 'ms-vanilla';
import './style.css';

class Header extends Component {
  markup() {
    const { user } = this.props;
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
}

export default Header;
