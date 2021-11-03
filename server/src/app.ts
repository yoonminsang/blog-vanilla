import express, { Application } from 'express';
import errorMiddleware from '@/middlewares/error-middleware';
import jwtMiddleware from '@/middlewares/jwtMiddleware';
import loaders from './loaders';
import router from './routes';

class App {
  app: Application;

  constructor() {
    this.app = express();
    this.setLoaders();
    this.setRouter();
    this.setErrorMiddleware();
  }

  async setLoaders() {
    await loaders(this.app);
  }

  setRouter() {
    this.app.use('/api', jwtMiddleware, router);
  }

  setErrorMiddleware() {
    this.app.use(errorMiddleware);
  }
}

export default App;
