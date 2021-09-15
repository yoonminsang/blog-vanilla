import express, { Application } from 'express';
import loaders from './loaders';
import router from './routes';

const startServer = async () => {
  const app: Application = express();
  await loaders(app);

  const port = process.env.PORT;

  app.use('/api', router);

  app.all('*', (req, res) => {
    res.status(404).send('404');
  });

  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
};

startServer();
