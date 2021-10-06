import routerContext from './router-context';

class Router {
  constructor(target, routes, NotFoundPage) {
    this.target = target;
    this.routes = routes;
    this.NotFoundPage = NotFoundPage;
    this.routerContext = routerContext;
    this.route();
    this.addLinkChangeHandler();
    this.addBackChangeHandler();
  }

  route() {
    const currentPathSplit = this.routerContext.state.pathname.slice(1).split('/');
    for (let i = 0; i < this.routes.length; i++) {
      const routePath = this.routes[i].path.slice(1).split('/');
      if (currentPathSplit.length !== routePath.length) continue;
      const params = {};
      for (let j = 0; j < currentPathSplit.length; j++) {
        if (/^:/.test(routePath[j])) {
          params[routePath[j].slice(1)] = currentPathSplit[j];
          continue;
        }
        if (currentPathSplit[j] !== routePath[j]) {
          return;
        }
      }
      routerContext.setState({ params });
      const Page = this.routes[i].component;
      new Page(this.target);
      return;
    }
    new this.NotFoundPage(this.target);
  }

  addLinkChangeHandler() {
    this.target.addEventListener('click', e => {
      const { target } = e;
      const closest = target.closest('a');
      if (!closest || closest.getAttribute('target')) return;
      e.preventDefault();
      const path = closest.getAttribute('href');
      window.history.pushState(null, '', path);
      routerContext.setState({ path: this.pathname(), query: this.searchToQuery() });
      this.route();
    });
  }

  addBackChangeHandler() {
    window.addEventListener('popstate', () => {
      routerContext.setState({ path: this.pathname(), query: this.searchToQuery() });
      this.route();
    });
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

export default Router;
