import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  public description: string;

  @IsNumber()
  public price: number;

  @IsString()
  public category: string;

  @IsNumber()
  quantity: number;
}

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  public description: string;

  @IsNumber()
  public price: number;

  @IsString()
  public category: string;

  @IsNumber()
  quantity: number;
}
