// import { Component } from 'ms-vanilla';
import Component from '../lib/component';
import Header from '../components/common/header';
import PostList from '../components/post-list';

class PostListPage extends Component {
  markup() {
    return /* html */ `
    <div class="wrapper">
      <inside class="header-inside"></inside>
      <div class="content-wrapper">
        <main class="content"></main>
      </div>
    </div>
    `;
  }

  appendComponent(target) {
    const $header = target.querySelector('.header-inside');
    const $content = target.querySelector('.content');
    new Header($header);
    new PostList($content);
  }
}

export default PostListPage;
