// import { Component, useParams } from 'ms-vanilla';
import Header from '../components/common/header';
import PostDetail from '../components/post-detail';
import Component from '../lib/component';

class PostPage extends Component {
  markup() {
    return /* html */ `
    <div class="wrapper">
      <inside class="header-inside"></inside>
      <div class="content-wrapper">
        <main class="content">
          <inside class="post-detail-inside"></inside>
        </main>
      </div>
    </div>
    `;
  }

  appendComponent(target) {
    const $header = target.querySelector('.header-inside');
    const $postDetail = target.querySelector('.post-detail-inside');
    new Header($header);
    new PostDetail($postDetail);
  }
}

export default PostPage;
