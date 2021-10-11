import { Router } from 'ms-vanilla';
import LoginPage from './pages/login-page';
import MainPage from './pages/main-page';
import NotFoundPage from './pages/not-found-page';
import PostPage from './pages/post-page';
import SignupPage from './pages/signup-page';

class App {
  constructor(target) {
    this.target = target;
    this.routes = [
      { path: '/', component: MainPage },
      { path: '/login', component: LoginPage },
      { path: '/signup', component: SignupPage },
      { path: '/post/:id', component: PostPage },
    ];
    this.NotFoundPage = NotFoundPage;
    this.render();
  }

  render() {
    new Router(this.target, this.routes, this.NotFoundPage);
  }
}

export default App;
