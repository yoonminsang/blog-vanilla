// import { Component } from 'ms-vanilla';
import axios from 'axios';
import Component from '../../lib/component';
import { useHistory } from '../../lib/routerHooks';
import userStore from '../../store/user-store';
import { parseTime } from '../../utils';
import { deletePostApi, readPostApi } from '../../utils/api/post';
import Modal from '../common/modal';
import './style.css';

class PostDetail extends Component {
  setup() {
    this.state = { user: undefined, post: undefined, errorMessage: undefined, modalVisible: false };
    this.history = useHistory();
    this.id = this.history.params.id;
  }

  markup() {
    const { user, post, errorMessage } = this.state;
    let inner = '';
    if (errorMessage) {
      inner = /* html */ `
      <div class="error-message">${errorMessage}</div>`;
    } else if (post) {
      const {
        title,
        content,
        createdAt,
        isUpdated,
        user: { nickname },
      } = post;
      const updateTag = isUpdated ? /* html */ `<div class="txt-bar"></div><div class="update">수정됨</div>` : '';
      const editTag =
        user?.nickname === nickname
          ? /* html */ `<div class="txt-bar"></div><a href="/modify/${this.id}">수정</a><div class="txt-bar"></div><button class="post-remove">삭제</button>`
          : '';
      inner = /* html */ `
      <div class="title">${title}</div>
      <div class="flex">
        <div class="nickname">${nickname}</div>
        <div class="txt-bar"></div>
        <div class="time">${parseTime(createdAt)}</div>
        ${updateTag}
        ${editTag}
      </div>
      <div class="content">${content}</div>
      `;
    }
    return /* html */ `
    <div class="post-detail">${inner}</div>
    <inside class="modal-inside"></inside>
    `;
  }

  appendComponent(target) {
    const $modal = target.querySelector('.modal-inside');

    new Modal($modal, {
      img: 'delete',
      visible: this.state.modalVisible,
      body: '글을 삭제하시겠습니까?',
      confirm: true,
      setVisible: tf => this.setState({ modalVisible: tf }),
      onConfirm: () => this.removePost(),
    });
  }

  componentDidMount() {
    userStore.subscribe(() => this.setState({ user: userStore.state.user }));
    this.getPost();
  }

  setEvent() {
    this.addEvent('click', '.post-remove', () => {
      this.setState({ modalVisible: true });
    });
  }

  async getPost() {
    try {
      const {
        data: { post },
      } = await readPostApi({ id: this.id });
      this.setState({ post });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // TODO: winston
        const { errorMessage } = err.response?.data;
        if (errorMessage) {
          this.setState({ errorMessage });
        } else {
          console.log(err);
        }
      } else {
        console.log('내부 에러');
      }
    }
  }

  async removePost() {
    try {
      await deletePostApi({ id: this.id });
      this.history.goBack();
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

export default PostDetail;
