// import { Component } from 'ms-vanilla';
import axios from 'axios';
import { loginApi, signupApi } from '../../utils/api/auth';
import Component from '../../lib/component';
import Button from '../common/button';
import Input from '../common/input';
import './style.css';
import userStore from '../../store/user-store';
import { useHistory } from '../../lib/routerHooks';
import { loginValidation, signupValidation } from '../../utils/validation/auth-validation';
import Modal from '../common/modal';

class Auth extends Component {
  setup() {
    this.state = this.props.login
      ? { user: undefined, email: '', password: '', errorMessage: '' }
      : {
          user: undefined,
          email: '',
          password: '',
          passwordConfirm: '',
          nickname: '',
          errorMessage: '',
          modalBody: '',
          modalVisible: false,
        };
    this.history = useHistory();
  }

  markup() {
    const { login } = this.props;
    const authTitle = login ? '로그인' : '회원가입';
    const { errorMessage } = this.state;
    return /* html */ `
    <main class="login">
      <form class="auth-template">
        <h2>${authTitle}</h2>
        <inside class="email-inside"></inside>
        <inside class="password-inside"></inside>
        ${login ? '' : '<inside class="password-confirm-inside"></inside><inside class="nickname-inside"></inside>'}
        <div class="error-message">${errorMessage}</div>
        ${
          login
            ? '<inside class="btn-login-inline">로그인</inside><inside class="go-signup-inline">회원가입</inside>'
            : '<inside class="btn-signup-inline">회원가입</inside><inside class="go-login-inline">로그인</inside>'
        }
      </form>
      ${login ? '' : '<inside class="modal-inside"></inside>'}
    </main>
    `;
  }

  appendComponent(target) {
    const { email, password, passwordConfirm, nickname } = this.state;
    const $email = target.querySelector('.email-inside');
    const $password = target.querySelector('.password-inside');
    const $btnLogin = target.querySelector('.btn-login-inline');
    const $goSignup = target.querySelector('.go-signup-inline');
    const $passwordConfirm = target.querySelector('.password-confirm-inside');
    const $nickname = target.querySelector('.nickname-inside');
    const $btnSignup = target.querySelector('.btn-signup-inline');
    const $goLogin = target.querySelector('.go-login-inline');
    const $modal = target.querySelector('.modal-inside');

    new Input($email, { class: 'email', type: 'text', value: email, placeholder: '이메일', maxlength: 45 });
    new Input($password, {
      class: 'password',
      type: 'password',
      value: password,
      placeholder: '비밀번호',
      maxlength: 20,
    });

    if (this.props.login) {
      new Button($btnLogin, { class: 'full-width', type: 'submit', text: '로그인' });
      new Button($goSignup, { class: 'full-width', href: '/signup', text: '회원가입 하러 가기' });
    } else {
      new Button($btnSignup, { class: 'full-width', type: 'submit', text: '회원가입' });
      new Button($goLogin, { class: 'full-width', href: '/login', text: '로그인 하러 가기' });
      new Input($passwordConfirm, {
        class: 'password-confirm',
        type: 'password',
        value: passwordConfirm,
        placeholder: '비밀번호 확인',
        maxlength: 20,
      });
      new Input($nickname, { class: 'nickname', type: 'text', value: nickname, placeholder: '닉네임', maxlength: 15 });
      new Modal($modal, {
        img: 'congratulations',
        visible: this.state.modalVisible,
        body: this.state.modalBody,
      });
    }
  }

  componentDidMount() {
    userStore.subscribe(() => this.setState({ user: userStore.state.user }));
  }

  componentDidUpdate(prevState, nextState) {
    if (nextState.user) {
      this.history.push('/');
    }
  }

  setEvent() {
    this.addEvent('input', '.email', ({ target }) => {
      this.setState({ email: target.value });
    });
    this.addEvent('input', '.password', ({ target }) => {
      this.setState({ password: target.value });
    });
    if (!this.props.login) {
      this.addEvent('input', '.password-confirm', ({ target }) => {
        this.setState({ passwordConfirm: target.value });
      });
      this.addEvent('input', '.nickname', ({ target }) => {
        this.setState({ nickname: target.value });
      });
    }

    if (this.props.login) {
      this.addEvent('submit', '.auth-template', async e => {
        e.preventDefault();
        const { email, password } = this.state;
        const validation = loginValidation({ email, password });
        if (validation !== true) {
          this.setState({ errorMessage: validation });
        } else {
          this.login({ email, password });
        }
      });
    } else {
      this.addEvent('submit', '.auth-template', async e => {
        e.preventDefault();
        const { email, password, passwordConfirm, nickname } = this.state;
        const validation = signupValidation({ email, password, passwordConfirm, nickname });
        if (validation !== true) {
          this.setState({ errorMessage: validation });
        } else {
          this.signup({ email, password, nickname });
        }
      });
    }
  }

  async login({ email, password }) {
    try {
      const {
        data: { accessToken },
      } = await loginApi({ email, password });
      localStorage.setItem('user', accessToken);
      window.location.href = '/';
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.errorMessage;
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

  async signup({ email, password, nickname }) {
    try {
      const {
        data: { accessToken },
      } = await signupApi({ email, password, nickname });
      localStorage.setItem('user', accessToken);
      this.setState({ modalVisible: true, modalBody: `${nickname}님 환영합니다` });
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.errorMessage;
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
}

export default Auth;
