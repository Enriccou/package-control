import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsEnum } from 'class-validator';

export enum ManagerRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

export class CreateManagerDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString()
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsString()
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Senha deve conter maiúscula, minúscula e número',
  })
  password: string;

  @IsEnum(ManagerRole, { message: 'Role deve ser ADMIN ou MANAGER' })
  role: ManagerRole = ManagerRole.MANAGER;
}
