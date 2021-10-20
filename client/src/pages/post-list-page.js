// import { Component } from 'ms-vanilla';
import Component from '../lib/component';
import Header from '../components/common/header';
import PostList from '../components/post-list';
import userStore from '../store/user-store';
import Button from '../components/common/button';

class PostListPage extends Component {
  setup() {
    this.state = { user: undefined };
  }

  markup() {
    const { user } = this.state;
    return /* html */ `
      <inside class="header-inside"></inside>
      <main class="content">
        ${user ? '<inside class="btn-wrtie-inline"></inside>' : ''}
        <inside class="post-list-inside"></inside>
      </main>
    `;
  }

  appendComponent(target) {
    const $header = target.querySelector('.header-inside');
    const $btnWrite = target.querySelector('.btn-wrtie-inline');
    const $postList = target.querySelector('.post-list-inside');
    new Header($header);
    new PostList($postList);
    if (this.state.user) {
      new Button($btnWrite, { class: 'small right', href: '/write', text: '글쓰기' });
    }
  }

  componentDidMount() {
    userStore.subscribe(() => this.setState({ user: userStore.state.user }));
  }
}

export default PostListPage;
