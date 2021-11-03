import App from './app';

const { app } = new App();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
