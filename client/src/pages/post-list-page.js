// import { Component } from 'ms-vanilla';
import Component from '../components/lib/component';
import Header from '../components/common/header';

class PostListPage extends Component {
  setup() {
    this.state = { user: undefined };
  }

  markup() {
    return /* html */ `
      <inside class="header-inside"></inside>
    `;
  }

  appendComponent(target) {
    const $header = target.querySelector('.header-inside');
    new Header($header);
  }
}

export default PostListPage;
