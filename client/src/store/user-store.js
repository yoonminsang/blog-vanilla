import Observable from '../lib/basic-observable.js';

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
