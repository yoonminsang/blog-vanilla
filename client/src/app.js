import Component from './lib/component.js';
import userStore from './store/user-store.js';

const IncreaseBtn = () => `<button class="increase">증가</button>`;
const DecreaseBtn = () => `<button class="decrease">감소</button>`;
const Output = count => `<h1 class="output">${count}</h1>`;
const Text = text => `<input type="text" class="text" value="${text}"/>`;
const LoginBtn = () => `<button class="login">로그인</button>`;
const LogoutBtn = () => `<button class="logout">로그아웃</button>`;
const UserText = user => `<div>${user}</div>`;

class App extends Component {
  setup() {
    this.state = {
      count: 0,
      text: '',
      user: undefined,
    };
  }

  markup() {
    return `
      ${IncreaseBtn()}
      ${DecreaseBtn()}
      ${Output(this.state.count)}
      ${Text(this.state.text)}
      ${LoginBtn()}
      ${LogoutBtn()}
      ${UserText(this.state.user)}
    `;
  }

  componentDidMount() {
    userStore.subscribe(() => this.setState({ user: userStore.state.user }));
  }

  setEvent() {
    this.addEvent('click', '.increase', () => {
      this.setState({ count: this.state.count + 1 });
    });
    this.addEvent('click', '.decrease', () => {
      this.setState({ count: this.state.count - 1 });
    });
    this.addEvent('input', '.text', ({ target }) => {
      this.setState({ text: target.value });
    });
    this.addEvent('click', '.login', () => {
      userStore.login('minsang');
    });
    this.addEvent('click', '.logout', () => {
      userStore.logout();
    });
  }
}
export default App;
