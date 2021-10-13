// import { Observable } from 'ms-vanilla';
import Observable from '../components/lib/basic-observable';

class UserStore extends Observable {
  constructor() {
    super();
    this.state = { user: null };
  }

  async login(user) {
    this.setState({ user });
  }

  async logout() {
    this.setState({ user: null });
  }
}

export default new UserStore();
