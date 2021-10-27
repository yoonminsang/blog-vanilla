// import { Component, useParams } from 'ms-vanilla';
import Header from '../components/common/header';
import PostComment from '../components/post/post-comment';
import PostDetail from '../components/post/post-detail';
import Component from '../lib/component';

class PostPage extends Component {
  markup() {
    return /* html */ `
    <div class="wrapper">
      <inside class="header-inside"></inside>
      <div class="content-wrapper">
        <main class="content">
          <inside class="post-detail-inside"></inside>
          <inside class="comment-list-inside"></inside>
        </main>
      </div>
    </div>
    `;
  }

  appendComponent(target) {
    const $header = target.querySelector('.header-inside');
    const $postDetail = target.querySelector('.post-detail-inside');
    const $commentList = target.querySelector('.comment-list-inside');
    new Header($header);
    new PostDetail($postDetail);
    new PostComment($commentList);
  }
}

export default PostPage;
