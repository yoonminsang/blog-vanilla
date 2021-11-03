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
    this.state = {
      user: undefined,
      commentList: undefined,
      lastPageId: undefined,
      pageId: undefined,
      count: undefined,
      content: '',
    };
    this.history = useHistory();
    this.postId = this.history.params.postId;
  }

  markup() {
    const { commentList, lastPageId, count, pageId } = this.state;
    return /* html */ `
    <div class="comment">
      <div class="comment-title">댓글 ${count || ''}</div>
      <ul class="comment-list">
      ${
        commentList
          ? commentList
              .map(({ id, content, createdAt, isUpdated, user: { nickname } }) => {
                return /* html */ `
                <li class="comment-list-item" data-id="${id}">
                  <div class="flex">
                    <div class="nickname">${nickname}</div>
                    <div class="time">${parseTime(createdAt)}</div>
                    ${isUpdated ? /* html */ `<div class="update">(수정됨)</div>` : ''}
                  </div>
                <div class="content">${content}</div>
                </li>
                `;
              })
              .join('')
          : ''
      }
      </ul>
      <div class="comment-paging">
        ${
          lastPageId
            ? Array(lastPageId)
                .fill()
                .map((_, index) => {
                  const classList = index + 1 === pageId ? 'class="selected"' : '';
                  return `<button ${classList}>${index + 1}</button>`;
                })
                .join('')
            : ''
        }
      </div>
      <form class="comment-create-template">
        <inside class="comment-content-inside"></inside>
        <inside class="btn-create-comment-inside"></inside>
      </form>
    </div>
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

  componentDidUpdate(prevState, nextState) {
    if (prevState.pageId && prevState.pageId !== nextState.pageId) {
      this.getCommentList(nextState.pageId);
    }
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
    this.addEvent('click', '.comment-paging', ({ target }) => {
      if (target.nodeName === 'BUTTON') {
        // TODO: textContent 효율성, + pareint 생각
        const pageId = +target.textContent;
        this.setState({ pageId });
      }
    });
  }

  async getLastCommentList() {
    try {
      const {
        data: { commentList, lastPageId, count },
      } = await readLastCommentListApi({ postId: this.postId });
      this.setState({ commentList, lastPageId, count, pageId: lastPageId });
    } catch (err) {
      if (axios.isAxiosError(err)) {
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
        data: { commentList, lastPageId, count },
      } = await readCommentListApi({ postId: this.postId, pageId });
      this.setState({ commentList, lastPageId, count }, () => this.target.scrollIntoView({ behavior: 'smooth' }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
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
      this.setState({ content: '' });
      this.getLastCommentList();
    } catch (err) {
      if (axios.isAxiosError(err)) {
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
