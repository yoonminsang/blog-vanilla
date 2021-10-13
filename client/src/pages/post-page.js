// import { Component, useParams } from 'ms-vanilla';
import Component from '../components/lib/component';
import { useParams } from '../components/lib/routerHooks';

const Post = (title, content) => /* html */ `
  <div>제목 ${title}</div>
  <div>내용 ${content}</div>
`;

const Comment = (id, content, nickname) => /* html */ `
  <div class="comment" data-comment-id=${id}>
    <div>${content}</div>
    <div>${nickname}</div>
  </div>
`;

class PostPage extends Component {
  setup() {
    const { id } = useParams();
    this.state = { id, post: undefined, comment: undefined };
  }

  markup() {
    return /* html */ `
      <div>포스트 ${this.state.id}페이지</div>
      ${this.state.post && Post(this.state.post.title, this.state.post.content)}
      ${
        this.state.comment &&
        this.state.comment.map(({ id, content, nickname }) => Comment(id, content, nickname)).join('')
      }
    `;
  }

  componentDidMount() {
    if (this.state.id < 10) {
      this.setState({
        post: { title: this.state.id, content: '아이디가 10보다 작아요' },
        comment: [
          { id: 1, content: '댓글1', nickname: '홍길동' },
          { id: 2, content: '댓글2', nickname: '홍길동2' },
        ],
      });
    } else {
      this.setState({
        post: { title: this.state.id, content: '아이디가 10이상이에요' },
        comment: [
          { id: 3, content: '댓글3', nickname: '홍길동3' },
          { id: 4, content: '댓글4', nickname: '홍길동4' },
        ],
      });
    }
  }
}

export default PostPage;
