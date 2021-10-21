// import { Component } from 'ms-vanilla';
import axios from 'axios';
import Component from '../../lib/component';
import userStore from '../../store/user-store';
import { parseTime } from '../../utils';
import { readPostListApi, readPostListByLastIdApi } from '../../utils/api/post';
import Button from '../common/button';
import './style.css';

class PostList extends Component {
  setup() {
    this.state = { user: undefined, postList: undefined };
  }

  markup() {
    const { user, postList } = this.state;
    return /* html */ `
    ${user ? '<inside class="btn-wrtie-inline"></inside>' : ''}
    <ul class="post-list">
      ${
        postList
          ? postList
              .map(({ id, title, content, createdAt, user: { nickname } }) => {
                return /* html */ `
              <div class="post-list-item">
                <a href="/post/${id}">
                  <div class="icon image-ready"></div>
                  <div class="title">${title}</div>
                  <div class="content">${content}</div>
                  <div class="flex">
                    <div class="time">${parseTime(createdAt)}</div>
                    <div class="nickname">${nickname}</div>
                  </div>
                </a>
              </div>
              `;
              })
              .join('')
          : ''
      }
    </ul>
    `;
  }

  appendComponent(target) {
    const $btnWrite = target.querySelector('.btn-wrtie-inline');
    if (this.state.user) {
      new Button($btnWrite, { class: 'small right', href: '/write', text: '글쓰기' });
    }
  }

  componentDidMount() {
    console.log('didmount', this.state);
    this.getPostList();
    userStore.subscribe(() => this.setState({ user: userStore.state.user }));
  }

  async getPostList() {
    try {
      const {
        data: { postList },
      } = await readPostListApi();
      console.log('getPostList', postList);
      this.setState({ postList });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // TODO: winston으로 기록?
        console.log(err);
      } else {
        console.log('내부 에러');
      }
    }
  }

  async getPostListByLastId(lastId) {
    try {
      const {
        data: { postList: nextPostList },
      } = await readPostListByLastIdApi({ lastId });
      this.setState({ postList: [...this.state.postList, nextPostList] });
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

export default PostList;
