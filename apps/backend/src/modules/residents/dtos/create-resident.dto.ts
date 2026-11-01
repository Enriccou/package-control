import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsDateString, IsOptional, Matches } from 'class-validator';

export class CreateResidentDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString()
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @IsString()
  @Matches(/^\d{10,11}$/, { message: 'Telefone deve ter 10 ou 11 dígitos' })
  phone: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{11}$/, { message: 'CPF deve ter 11 dígitos' })
  cpf?: string;

  @IsNotEmpty({ message: 'Endereço é obrigatório' })
  @IsString()
  @MinLength(5)
  address: string;

  @IsOptional()
  @IsString()
  apartment?: string;

  @IsNotEmpty({ message: 'ID da propriedade é obrigatório' })
  @IsString()
  propertyId: string;

  @IsNotEmpty({ message: 'Data de mudança é obrigatória' })
  @IsDateString()
  moveInDate: string;

  @IsOptional()
  @IsDateString()
  moveOutDate?: string;
}
