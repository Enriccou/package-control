import { IsEmail, IsOptional, IsString, MinLength, MaxLength, IsDateString, Matches } from 'class-validator';

export class UpdateResidentDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{10,11}$/)
  phone?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{11}$/)
  cpf?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  address?: string;

  @IsOptional()
  @IsString()
  apartment?: string;

  @IsOptional()
  @IsString()
  propertyId?: string;

  @IsOptional()
  @IsDateString()
  moveInDate?: string;

  @IsOptional()
  @IsDateString()
  moveOutDate?: string;
}
