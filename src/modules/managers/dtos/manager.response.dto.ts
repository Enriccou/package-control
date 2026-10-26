import { Exclude } from 'class-transformer';

export class ManagerResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  @Exclude()
  deletedAt: Date | null;
}
