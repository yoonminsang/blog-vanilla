// import { Router } from 'ms-vanilla';
import Router from './lib/router';
import LoginPage from './pages/login-page';
import NotFoundPage from './pages/not-found-page';
import PostListPage from './pages/post-list-page';
import PostPage from './pages/post-page';
import PostWritePage from './pages/post-write-page';
import SignupPage from './pages/signup-page';
import userStore from './store/user-store';

class App {
  constructor(target) {
    this.target = target;
    this.routes = [
      { path: '/', component: PostListPage },
      { path: '/login', component: LoginPage },
      { path: '/signup', component: SignupPage },
      { path: '/write', component: PostWritePage },
      { path: '/post/:id', component: PostPage },
    ];
    this.NotFoundPage = NotFoundPage;
    this.render();
    this.init();
  }

  render() {
    new Router(this.target, this.routes, this.NotFoundPage);
  }

  init() {
    if (localStorage.getItem('user')) {
      userStore.autoLogin();
    }
  }
}

export default App;
