import pug from 'pug';
import { RequestHandler, Router } from 'express';
import { Controller as ControllerInterface } from '../app';

export default class Controller implements ControllerInterface {
  public static readonly singleton: ControllerInterface = new Controller();

  public readonly router = Router();

  private readonly path = '/';
  private readonly getIndex: RequestHandler = (__, res) =>
    res.send(pug.compileFile('pug/index.pug')());

  private constructor() {
    this.router.get(this.path, this.getIndex);
  }
}
