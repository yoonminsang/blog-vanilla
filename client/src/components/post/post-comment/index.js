// import { Component } from 'ms-vanilla';
import axios from 'axios';
import Component from '../../../lib/component';
import { useHistory } from '../../../lib/routerHooks';
import userStore from '../../../store/user-store';
import { parseTime } from '../../../utils';
import { createCommentApi, readCommentListApi, readLastCommentListApi } from '../../../utils/api/comment';
import Button from '../../common/button';
import TextArea from '../../common/textarea';
import './style.css';

class PostComment extends Component {
  setup() {
    this.state = { user: undefined, commentList: undefined, lastPageId: undefined, content: '' };
    this.history = useHistory();
    this.postId = this.history.params.postId;
  }

  markup() {
    return /* html */ `
    <div class="comment">
      <ul class="comment-list">
        
      </ul>
      <ul class="comment-paging">

      </ul>
      <form class="comment-create-template">
        <inside class="comment-content-inside"></inside>
        <inside class="btn-create-comment-inside"></inside>
      </form>
    `;
  }

  appendComponent(target) {
    const { content } = this.state;
    const $commentContent = target.querySelector('.comment-content-inside');
    const $btnCreateComment = target.querySelector('.btn-create-comment-inside');
    new TextArea($commentContent, {
      class: 'comment-content full-width',
      value: content,
      placeholder: '댓글을 입력하세요',
      maxlength: 45,
    });
    new Button($btnCreateComment, {
      class: 'btn-margin right',
      type: 'submit',
      text: '등록',
    });
  }

  componentDidMount() {
    userStore.subscribe(() => this.setState({ user: userStore.state.user }));
    this.getLastCommentList();
  }

  setEvent() {
    this.addEvent('input', '.comment-content', ({ target }) => {
      this.setState({ content: target.value });
    });
    this.addEvent('submit', '.comment-create-template', e => {
      e.preventDefault();
      const { content } = this.state;
      this.createComment(content);
    });
  }

  async getLastCommentList() {
    try {
      const {
        data: { commentList, lastPageId },
      } = await readLastCommentListApi({ postId: this.postId });
      this.setState({ commentList, lastPageId });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // TODO: winston
        const { errorMessage } = err.response?.data;
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(err);
        }
      } else {
        console.log('내부 에러');
      }
    }
  }

  async getCommentList(pageId) {
    try {
      const {
        data: { commentList, lastPageId },
      } = await readCommentListApi({ postId: this.postId, pageId });
      this.setState({ commentList, lastPageId });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // TODO: winston
        const { errorMessage } = err.response?.data;
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(err);
        }
      } else {
        console.log('내부 에러');
      }
    }
  }

  async createComment(content) {
    try {
      await createCommentApi({ content, postId: this.postId });
      this.getLastCommentList();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // TODO: winston
        const { errorMessage } = err.response?.data;
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(err);
        }
      } else {
        console.log('내부 에러');
      }
    }
  }
}

export default PostComment;
