import { Component } from 'ms-vanilla';
import Header from '../components/common/header';

class PostListPage extends Component {
  setup() {
    this.state = { user: undefined };
  }

  markup() {
    return /* html */ `
      <inside class="header"/></inside>
    `;
  }

  appendComponent(target) {
    const $header = target.querySelector('.header');
    new Header($header, { user: this.state.user });
  }
}

export default PostListPage;
