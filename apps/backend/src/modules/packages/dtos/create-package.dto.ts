import { IsMongoId, IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty({ message: 'ID do morador é obrigatório' })
  @IsMongoId({ message: 'ID do morador deve ser um MongoDB ID válido' })
  residentId: string;

  @IsNotEmpty({ message: 'Transportadora é obrigatória' })
  @IsString()
  carrier: string;

  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
