export class ResidentResponseDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf?: string;
  address: string;
  apartment?: string;
  propertyId: string;
  moveInDate: Date;
  moveOutDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
