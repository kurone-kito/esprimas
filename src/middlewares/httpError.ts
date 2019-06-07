import { ErrorRequestHandler } from 'express';

export class HttpError extends Error {
  public readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// ⬇︎ Because `ErrorRequestHandler` dependents on `Function.prototype.length` value.
// eslint-disable-next-line no-unused-vars
const handler: ErrorRequestHandler = (error: HttpError, __, res, next) => {
  const { message = 'Failed', status = 500 } = error;
  res.status(status).send({ status, message });
};

export default handler;
