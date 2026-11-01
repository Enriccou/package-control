import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PackageStatus } from '../schemas/package.schema.js';

export class UpdatePackageDto {
  @IsOptional()
  @IsString()
  carrier?: string;

  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(PackageStatus)
  status?: PackageStatus;
}
