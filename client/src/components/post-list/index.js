// import { Component } from 'ms-vanilla';
import axios from 'axios';
import Component from '../../lib/component';
import './style.css';

class PostList extends Component {
  setup() {
    this.state = { user: undefined };
  }

  markup() {
    return /* html */ `
    <ul class="post-list">
      포스트리스트
    </ul>
    `;
  }

  appendComponent(target) {}
}

export default PostList;
