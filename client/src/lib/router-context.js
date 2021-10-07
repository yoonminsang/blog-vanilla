import { getPathname, getQuery } from './utils';

class RouterContext {
  constructor() {
    this.state = { pathname: getPathname(), query: getQuery(), params: {} };
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
  }
}

export default new RouterContext();
