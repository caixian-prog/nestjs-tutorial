import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateItemDto {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(1)
  qty: number;
}
