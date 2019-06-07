import bodyParser from 'body-parser';
import express, { RequestHandler } from 'express';
import httpErrorMiddleware from './middlewares/httpError';

export interface Controller {
  readonly router: RequestHandler;
}

export interface AppOptions {
  controllers: Controller[];
  port?: number;
}

export default class App {
  private readonly app = express();

  private readonly port: number;

  private readonly preProcesses = [
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json()
  ];

  private readonly postProcesses = [httpErrorMiddleware];

  public constructor({ controllers, port = 3000 }: AppOptions) {
    this.port = port;
    this.app.use(...this.preProcesses);
    controllers.forEach(({ router }) => this.app.use('/', router));
    this.app.use(...this.postProcesses);
  }

  public listen() {
    this.app.listen(this.port, () =>
      console.log(`The app listening on port ${this.port}!`)
    );
  }
}
