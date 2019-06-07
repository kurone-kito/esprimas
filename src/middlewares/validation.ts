import { ClassType } from 'class-transformer/ClassTransformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpError } from './httpError';
import instantiate from '../utils/instantiate';

const createError = (errors: ValidationError[]) => {
  if (!errors.length) {
    return undefined;
  }

  const message = errors
    .map(({ constraints }) => Object.values(constraints))
    .join(', ');

  return new HttpError(422, message);
};

export interface Options<T> {
  type: ClassType<T>;
  /** Whether the input validate as `Partial<T>` */
  skipMissingProperties?: boolean;
}

export default <T>({
  type,
  skipMissingProperties = false
}: Options<T>): RequestHandler => async ({ body }, __, next) => {
  const { instance } = instantiate({ source: body, type });
  next(createError(await validate(instance, { skipMissingProperties })));
};
