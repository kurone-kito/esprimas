import { RequestHandler, Router } from 'express';
import { Interface as UserInterface, Model as UserModel } from './model';
import { Controller as ControllerInterface } from '../app';
import validation from '../middlewares/validation';
import instantiate from '../utils/instantiate';

export default class Controller implements ControllerInterface {
  public static readonly singleton: ControllerInterface = new Controller();

  public readonly router = Router();

  private readonly path = '/user';

  private entities: UserInterface[] = [];

  private readonly getAll: RequestHandler = (__, res) =>
    res.send(this.entities);

  private readonly add: RequestHandler = (req, res) => {
    const { object } = instantiate({ type: UserModel, source: req.body });
    this.entities = [...this.entities, object as UserInterface];
    res.send(object);
  };

  private constructor() {
    this.router.get(this.path, this.getAll);
    this.router.put(this.path, validation({ type: UserModel }), this.add);
  }
}
