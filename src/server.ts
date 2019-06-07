import App from './app';
import RootController from './root/controller';
import UserController from './user/controller';

const app = new App({
  controllers: [RootController.singleton, UserController.singleton],
  port: 5000
});
app.listen();
