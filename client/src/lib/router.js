import routerContext from './router-context';
import { getPathname, getQuery, pathValidation } from './utils';

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
    const currentPath = this.routerContext.state.pathname.slice(1).split('/');
    for (let i = 0; i < this.routes.length; i++) {
      const routePath = this.routes[i].path.slice(1).split('/');
      const params = pathValidation(currentPath, routePath);
      if (!params) continue;
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
      routerContext.setState({ path: getPathname(), query: getQuery() });
      this.route();
    });
  }

  addBackChangeHandler() {
    window.addEventListener('popstate', () => {
      routerContext.setState({ path: getPathname(), query: getQuery() });
      this.route();
    });
  }
}

export default Router;
