import App from './app';
import logger from './config/logger';

try {
  const { app } = new App();
  const port = process.env.PORT;

  app.listen(port, () => {
    logger.info(`Server running on ${port}`);
  });
} catch (err) {
  logger.error(err);
}
