import { sanitize } from 'class-sanitizer';
import { plainToClass, classToPlain } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export interface Options<T> {
  source: object;
  type: ClassType<T>;
}

export default <T>({ source, type }: Options<T>) => {
  const instance = plainToClass(type, source, {
    excludeExtraneousValues: true
  });
  sanitize(instance);

  return { instance, object: classToPlain(instance) };
};
