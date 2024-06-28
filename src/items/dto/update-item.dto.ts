import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateItemDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  qty?: number;
}
