// import { Component } from 'ms-vanilla';
import axios from 'axios';
import Component from '../../lib/component';
import { useHistory } from '../../lib/routerHooks';
import userStore from '../../store/user-store';
import { createPostApi, readPostApi, updatePostApi } from '../../utils/api/post';
import Button from '../common/button';
import Input from '../common/input';
import TextArea from '../common/textarea';
import './style.css';

class PostWrite extends Component {
  setup() {
    this.state = this.props.modify
      ? {
          user: undefined,
          title: '',
          content: '',
          nickname: undefined,
        }
      : {
          user: undefined,
          title: '',
          content: '',
        };
    this.history = useHistory();
    this.postId = this.history.params.postId;
  }

  markup() {
    return /* html */ `
    <form class="post-create-template">
      <inside class="post-title-inside"></inside>
      <inside class="post-content-inside"></inside>
      <inside class="btn-create-inside"></inside>
    </form>
    `;
  }

  appendComponent(target) {
    const { title, content } = this.state;
    const $postTitle = target.querySelector('.post-title-inside');
    const $postContent = target.querySelector('.post-content-inside');
    const $btnCreate = target.querySelector('.btn-create-inside');
    new Input($postTitle, {
      class: 'post-title full-width',
      type: 'text',
      value: title,
      placeholder: '제목',
      maxlength: 40,
      required: true,
    });
    new TextArea($postContent, {
      class: 'post-content full-width',
      value: content,
      placeholder: '내용',
      required: true,
    });
    new Button($btnCreate, {
      class: 'right',
      type: 'submit',
      text: '저장',
    });
  }

  async componentDidMount() {
    if (this.props.modify) {
      await this.getPost();
    }
    userStore.subscribe(() =>
      this.setState({ user: userStore.state.user }, () => {
        if (!this.state.user || (this.props.modify && this.state.user.nickname !== this.state.nickname)) {
          this.history.goBack();
        }
      }),
    );
  }

  async getPost() {
    try {
      const {
        data: {
          post: {
            title,
            content,
            user: { nickname },
          },
        },
      } = await readPostApi({ id: this.postId });
      this.setState({ title, content, nickname });
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

  setEvent() {
    this.addEvent('submit', '.post-create-template', async e => {
      e.preventDefault();
      const { title, content } = this.state;
      if (this.props.modify) {
        this.updatePost(title, content);
      } else {
        this.createPost(title, content);
      }
    });
    this.addEvent('input', '.post-title', ({ target }) => {
      this.setState({ title: target.value });
    });
    this.addEvent('input', '.post-content', ({ target }) => {
      this.setState({ content: target.value });
    });
  }

  async updatePost(title, content) {
    try {
      const {
        data: { postId },
      } = await updatePostApi({ id: this.postId, title, content });
      this.history.push(`/post/${postId}`);
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

  async createPost(title, content) {
    try {
      const {
        data: { postId },
      } = await createPostApi({ title, content });
      this.history.push(`/post/${postId}`);
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

export default PostWrite;
