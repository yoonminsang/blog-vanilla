// import { Observable } from 'ms-vanilla';
import axios from 'axios';
import Observable from '../components/lib/basic-observable';
import { checkAuthApi } from '../utils/api/auth';

class UserStore extends Observable {
  constructor() {
    super();
    this.state = { user: null };
  }

  async autoLogin() {
    try {
      const {
        data: { user },
      } = await checkAuthApi();
      this.login(user);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { errorMessage } = err.response.data;
        this.setState({ errorMessage });
      } else {
        console.log('내부 에러');
      }
    }
  }

  async login(user) {
    this.setState({ user });
  }

  async logout() {
    this.setState({ user: null });
  }
}

export default new UserStore();
