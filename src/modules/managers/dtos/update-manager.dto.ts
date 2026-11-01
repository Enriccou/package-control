import { IsEmail, IsOptional, IsString, MinLength, MaxLength, Matches, IsEnum } from 'class-validator';
import { ManagerRole } from './create-manager.dto.js';

export class UpdateManagerDto {
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
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message: 'Senha deve conter maiúscula, minúscula, número e caractere especial (!@#$%^&*)',
  })
  password?: string;

  @IsOptional()
  @IsEnum(ManagerRole)
  role?: ManagerRole;
}
