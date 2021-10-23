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
    this.existPost = true;
    this.getDataForScroll = this.getDataForScroll.bind(this);
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
                <li class="post-list-item">
                  <a href="/post/${id}">
                    <div class="icon image-ready"></div>
                    <div class="title">${title}</div>
                    <div class="content">${content}</div>
                    <div class="flex">
                      <div class="time">${parseTime(createdAt)}</div>
                      <div class="nickname">${nickname}</div>
                    </div>
                  </a>
                </li>
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

  async componentDidMount() {
    userStore.subscribe(() => this.setState({ user: userStore.state.user }, true));
    await this.getPostList();
    this.infiniteScroll();
  }

  async getPostList() {
    try {
      const {
        data: { postList },
      } = await readPostListApi();
      this.setState({ postList }, true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // TODO: winston으로 기록?
        console.log(err);
      } else {
        console.log('내부 에러');
      }
    }
  }

  infiniteScroll() {
    let [$li, lastId] = this.getDataForScroll();

    const io = new IntersectionObserver(
      async entries => {
        if (entries[0].isIntersecting) {
          io.unobserve($li);
          await this.getPostListByLastId(lastId);
          [$li, lastId] = this.getDataForScroll();
          io.observe($li);

          if (!this.existPost) {
            io.disconnect();
          }
        }
      },
      {
        threshold: 0.5,
      },
    );

    io.observe($li);
  }

  async getPostListByLastId(lastId) {
    try {
      const {
        data: { postList: nextPostList },
      } = await readPostListByLastIdApi({ lastId });
      if (nextPostList.length === 0) {
        this.existPost = false;
      } else {
        this.setState({ postList: [...this.state.postList, ...nextPostList] });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // TODO: winston으로 기록?
        console.log(err);
      } else {
        console.log('내부 에러');
      }
    }
  }

  getDataForScroll() {
    const $li = this.target.querySelector('.post-list-item:last-child');
    const hrefSplit = $li.firstElementChild.href.split('/');
    const lastId = hrefSplit[hrefSplit.length - 1];
    return [$li, lastId];
  }
}

export default PostList;
