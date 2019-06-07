import { ToInt, Trim } from 'class-sanitizer';
import { Expose } from 'class-transformer';
import { IsString, IsInt, Min, MinLength } from 'class-validator';

export interface Interface {
  name: string;
  age: number;
}

export class Model implements Interface {
  @Expose()
  @IsString()
  @Trim()
  @MinLength(1)
  public name: string = '';

  @Expose()
  @ToInt()
  @IsInt()
  @Min(18) // ADULTS ONLY
  public age: number = Number.NaN;
}
