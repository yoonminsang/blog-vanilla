class RouterContext {
  constructor() {
    this.state = { pathname: this.pathname(), query: this.searchToQuery(), params: {} };
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
  }

  pathname() {
    return window.location.pathname;
  }

  searchToQuery() {
    const { search } = window.location;
    const queries = new URLSearchParams(search);
    const params = {};
    queries.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }
}

export default new RouterContext();
