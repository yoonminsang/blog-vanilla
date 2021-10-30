// import { Component } from 'ms-vanilla';
import Header from '../components/common/header';
import PostWrite from '../components/post-write';
import Component from '../lib/component';

class PostWritePage extends Component {
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
    const $postWrite = target.querySelector('.content');
    new Header($header);
    new PostWrite($postWrite);
  }
}

export default PostWritePage;
