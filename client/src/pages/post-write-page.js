// import { Component } from 'ms-vanilla';
import Header from '../components/common/header';
import PostWrite from '../components/post-write';
import Component from '../lib/component';

class PostWritePage extends Component {
  markup() {
    return /* html */ `
    <inside class="header-inside"></inside>
    <main class="content">
      <inside class="post-write-inside"></inside>
    </main>
    `;
  }

  appendComponent(target) {
    const $header = target.querySelector('.header-inside');
    const $postWrite = target.querySelector('.post-write-inside');
    new Header($header);
    new PostWrite($postWrite);
  }
}

export default PostWritePage;
