// import { Component } from 'ms-vanilla';
import axios from 'axios';
import Component from '../../lib/component';
import { useHistory } from '../../lib/routerHooks';
import { createPostApi } from '../../utils/api/post';
import Button from '../common/button';
import Input from '../common/input';
import TextArea from '../common/textarea';
import './style.css';

class PostWrite extends Component {
  setup() {
    this.state = {
      title: '',
      content: '',
    };
    this.history = useHistory();
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
    });
    new TextArea($postContent, {
      class: 'post-content full-width',
      type: 'text',
      value: content,
      placeholder: '내용',
    });
    new Button($btnCreate, {
      class: 'right',
      type: 'submit',
      text: '저장',
    });
  }

  setEvent() {
    this.addEvent('submit', '.post-create-template', async e => {
      e.preventDefault();
      const { title, content } = this.state;
      this.create({ title, content });
    });
    this.addEvent('input', '.post-title', ({ target }) => {
      this.setState({ title: target.value });
    });
    this.addEvent('input', '.post-content', ({ target }) => {
      this.setState({ content: target.value });
    });
  }

  async create({ title, content }) {
    try {
      const {
        data: { postId },
      } = await createPostApi({ title, content });
      this.history.push(`/post/${postId}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // TODO: winston으로 기록?
        console.log(err);
      } else {
        console.log('내부 에러');
      }
    }
  }
}

export default PostWrite;
