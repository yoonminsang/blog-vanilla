import express, { Application } from 'express';
import errorMiddleware from 'middlewares/errorMiddleware';
import jwtMiddleware from 'middlewares/jwtMiddleware';
import loaders from './loaders';
import router from './routes';

const startServer = async () => {
  const app: Application = express();
  await loaders(app);

  const port = process.env.PORT;

  app.use('/api', jwtMiddleware, router);

  app.use(errorMiddleware);

  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
};

startServer();
