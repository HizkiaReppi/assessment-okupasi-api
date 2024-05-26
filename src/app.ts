import {initServer} from './infrastructure/http/server';

(async () => {
  const app = initServer();

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
  });
})();
